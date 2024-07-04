'use client';

import { ReactElement, useEffect, useState } from 'react';
import React from 'react';

import { Drawer, DrawerProps } from '../../../../../library/components/Drawer';
import {
    AdmissionCategory,
    AdmissionPrice,
    Asset,
    DirectionType,
    Facility,
    NameType,
    ReferencedFacilities,
    ReferencedFacility,
} from '../../../../../library/types/national-trust';
import { PlaceViewProps } from './Place.definition';

import { Form, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { isAsset, isReferencedFacility } from '../../../../../library/guards';
import {
    SavedPlace,
    Ticket,
    Visit,
} from '../../../../../library/types/internal';
import {
    Button,
    Card,
    CheckboxGroup,
    Icon,
    InputGroup,
    SelectGroup,
} from '../../../../../library/components';
import { resolveIcon } from '../../../../../library/helpers';
import { ToastProps } from '../../../../../library/components/Toast/Toast.component';
import { useToast } from '../../../../../library/context/Toast.context';
import { useVisits } from '../../../../../library/context/Visits.context';

import { usePlaces } from '../../../../../library/context/Places.context';

// MARK: Types

interface DrawerAddVisitProps extends Pick<DrawerProps, 'onClose' | 'isOpen'> {
    place: Pick<
        PlaceViewProps,
        | 'place'
        | 'opening'
        | 'facilities'
        | 'admissionPrices'
        | 'directions'
        | 'accessTags'
    >;
}

type Form = {
    admissionCategory: string;
    assetsUsed: string[];
    date: string;
    facilitiesUsed: string[];
    people: { name: string }[];
    tickets: { name: NameType; qty: number }[];
    travel: DirectionType[];
};

type ResponseAndMessage = Response & { message: 'Success' | 'Error' };

// MARK: Component

export const DrawerAddVisit = ({
    isOpen,
    onClose,
    place,
}: DrawerAddVisitProps): ReactElement<DrawerAddVisitProps> => {
    const toast = useToast();
    const { onCreateVisit } = useVisits();
    const { onUpdatePlace } = usePlaces();

    // MARK: State
    const [admissionCategory, setAdmissionCategory] = useState<string>('');
    const [availableFacilities, setAvailableFacilities] = useState<
        ReferencedFacility[]
    >([]);
    const [assets, setAssets] = useState<Asset[]>([]);

    // MARK: Form
    const {
        control,
        formState: { errors, isDirty, isValid },
        getValues,
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
    } = useForm<Form>({
        mode: 'onChange',
        defaultValues: { people: [{ name: '' }] },
    });

    const { fields, append, remove } = useFieldArray<Form>({
        control,
        name: 'people',
    });

    // MARK: Variables

    const checkBoxGroupStyle =
        'flex flex-col flex-wrap sm:flex-row gap-16 sm:gap-24 ';

    // MARK: Handlers

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleToast = ({
        title,
        description,
        status,
    }: Omit<ToastProps, 'onClose' | 'id'>) => {
        toast({
            title,
            description,
            status,
            // duration: 5000,
            // isClosable: true,
            position: 'top',
        });
    };

    // MARK: On Submit

    const onSubmit: SubmitHandler<Form> = async (data: Form) => {
        const assetsUsed = data.assetsUsed
            ? ([...data.assetsUsed]
                  .map((asset) =>
                      place.opening?.days[data.date]?.assets.find(
                          (a) => a.name === asset
                      )
                  )
                  .filter((asset) => isAsset(asset)) as Asset[])
            : [];

        const facilitiesUsed = data.facilitiesUsed
            ? (data.facilitiesUsed
                  .map((facility) =>
                      place.facilities?.facilities.find(
                          (f) => f.name === facility
                      )
                  )
                  .filter((facility) =>
                      isReferencedFacility(facility)
                  ) as ReferencedFacility[])
            : [];

        const tickets = data.tickets.flatMap((ticket) => {
            if (ticket.name) {
                const standardAmount = place
                    .admissionPrices!.categories.find(
                        (category: AdmissionCategory) => {
                            return category.name === admissionCategory;
                        }
                    )!
                    .admissionPrices.find((price: AdmissionPrice) => {
                        return price.name === ticket.name;
                    })!.standardAmount;

                return { ...ticket, standardAmount };
            }

            return [];
        });

        const people = data.people
            ? data.people.map((person) => ({
                  ...person,
                  name: person.name.toCapitalisedCase(),
              }))
            : [];

        const totalPrice = calculateTotalPrice(tickets);

        const visit: Visit = {
            assetsUsed,
            date: data.date,
            facilitiesUsed,
            people,
            place: {
                featureCategories: place.place.featureCategories,
                images: place.place.images,
                location: place.place.location,
                name: place.place.name,
                placeId: place.place.placeId,
                websiteUrl: place.place.websiteUrl,
            },
            totalPrice,
            tickets,
            travel: data.travel,
        };

        if (isDirty && isValid) {
            const res = await onCreateVisit(visit);

            if (res.message === 'Success') {
                handleToast({
                    title: 'Visit Logged',
                    description: 'Your Visit has been saved successfully',
                    status: 'success',
                });
            }

            if (res.message === 'Error') {
                handleToast({
                    title: 'Error',
                    description: res.error,
                    status: 'error',
                });
            }
        }

        let facilities: ReferencedFacilities | undefined = place.facilities
            ? {
                  ...place.facilities,
                  facilities: place.facilities?.facilities.filter(
                      (facility) => !!facility.reference
                  ) as ReferencedFacility[],
              }
            : undefined;

        const compiledPlace: SavedPlace = {
            accessTags: place.accessTags,
            description: place.place.description,
            directions: place.directions,
            facilities: facilities,
            featureCategories: place.place.featureCategories,
            images: place.place.images,
            location: place.place.location,
            name: place.place.name,
            opening: place.opening,
            placeId: place.place.placeId,
            websiteUrl: place.place.websiteUrl,
        };

        const put = await onUpdatePlace(compiledPlace);

        if (put.message === 'Success') {
            handleToast({
                title: 'Place updated',
                description: 'The Place notes have been updated',
                status: 'success',
            });
        }

        if (put.message === 'Error') {
            handleToast({
                title: 'Error',
                description: put.error,
                status: 'error',
            });
        }

        handleClose();
    };

    // MARK: Effects

    useEffect(() => {
        const admissionCategory = watch('admissionCategory');
        setAdmissionCategory(admissionCategory);
    }, [watch('admissionCategory')]);

    useEffect(() => {
        if (place.facilities) {
            const facilities = place.facilities.facilities.flatMap(
                (facility: Facility): ReferencedFacility | [] => {
                    if (facility.available && facility.reference) {
                        return facility as ReferencedFacility;
                    }
                    return [];
                }
            );

            setAvailableFacilities(facilities);
        }
    }, [place.facilities]);

    useEffect(() => {
        const date = watch('date');
        if (date && place.opening) {
            const assets = place.opening.days[date]?.assets || [
                {
                    name: 'Not Available',
                    description:
                        'No data is available for the date you have chosen',
                    opensAt: 'Closed',
                    closesAt: 'Closed',
                },
            ];
            setAssets(assets);
        }

        if (!date) {
            setAssets([]);
        }
    }, [place.opening, watch('date')]);

    // MARK: Return

    return (
        <Drawer
            divergent='closed'
            isOpen={isOpen}
            onClose={handleClose}
            confirmCTA={{
                children: 'Log Visit',
                type: 'submit',
                form: 'drawer-add-visit-form',
                colorScheme: 'green',
                isDisabled: !isDirty && !isValid,
            }}
            heading='Log a Visit'
            declineCTA={{
                onClick: () => handleClose(),
                colorScheme: 'red',
            }}
            size='md'
        >
            <form
                id='drawer-add-visit-form'
                className='flex flex-col gap-16 w-full'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='p-16'>
                    <InputGroup<Form>
                        name='date'
                        formRegister={{
                            register,
                            options: {
                                required: true,
                                validate: {
                                    isOpen: (v) => {
                                        return (
                                            place.opening?.days[
                                                v as string
                                            ]?.assets.some(
                                                (asset: Asset) =>
                                                    asset.description !==
                                                    'Closed'
                                            ) ||
                                            'The Property was fully closed on this Date'
                                        );
                                    },
                                },
                            },
                        }}
                        errors={errors}
                        type='date'
                        labelConfig={{}}
                        label='Date of Visit'
                    />
                </div>

                {/* MARK: Admissions
                 */}

                {place.admissionPrices && (
                    <Card
                        colorScheme='gray'
                        divergent='outline'
                        className='w-full'
                        heading='Admission'
                    >
                        <p className='text-14'>
                            Please select the admissions category to be able to
                            select which tickets were used with the membership.
                        </p>
                        <SelectGroup<Form, string>
                            name='admissionCategory'
                            formRegister={{
                                register,
                                options: { required: true },
                            }}
                            errors={errors}
                            label='Admissions Category'
                            options={place.admissionPrices.categories.map(
                                (category: AdmissionCategory) => {
                                    return category.name;
                                }
                            )}
                        />

                        {admissionCategory && (
                            <div className='flex flex-col sm:flex-row gap-8 flex-wrap'>
                                {place.admissionPrices.categories
                                    .find(
                                        (category: AdmissionCategory) =>
                                            category.name === admissionCategory
                                    )!
                                    .admissionPrices.map(
                                        (price: AdmissionPrice): Ticket => ({
                                            ...price,
                                            qty: 0,
                                        })
                                    )
                                    .map((price, index) => {
                                        return (
                                            <InputGroup<Form>
                                                key={price.name}
                                                name={`tickets.${index}.qty`}
                                                formRegister={{
                                                    register,
                                                    options: {
                                                        value: 0,
                                                    },
                                                }}
                                                errors={errors}
                                                type='number'
                                                element={{
                                                    left: {
                                                        children: (
                                                            <Button
                                                                icon={{
                                                                    icon: 'remove',
                                                                    ariaLabel:
                                                                        'minus',
                                                                }}
                                                                divergent='ghost'
                                                                size='sm'
                                                                isDisabled={
                                                                    getValues(
                                                                        `tickets.${index}.qty`
                                                                    ) <= 0
                                                                }
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    const value =
                                                                        getValues(
                                                                            `tickets.${index}.qty`
                                                                        );

                                                                    setValue(
                                                                        `tickets.${index}.qty`,

                                                                        value -
                                                                            1,
                                                                        {
                                                                            shouldValidate:
                                                                                true,
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                        ),
                                                    },
                                                    right: {
                                                        children: (
                                                            <Button
                                                                icon={{
                                                                    icon: 'plus',
                                                                    ariaLabel:
                                                                        'plus',
                                                                }}
                                                                divergent='ghost'
                                                                size='sm'
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    const value =
                                                                        getValues(
                                                                            `tickets.${index}.qty`
                                                                        );

                                                                    setValue(
                                                                        `tickets.${index}.name`,
                                                                        // @ts-ignore
                                                                        price.name,
                                                                        {
                                                                            shouldValidate:
                                                                                true,
                                                                        }
                                                                    );

                                                                    setValue(
                                                                        `tickets.${index}.qty`,

                                                                        value +
                                                                            1,
                                                                        {
                                                                            shouldValidate:
                                                                                true,
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                        ),
                                                    },
                                                }}
                                                label={price.name}
                                                labelConfig={{
                                                    hideBadge: true,
                                                }}
                                            />
                                        );
                                    })}
                            </div>
                        )}
                    </Card>
                )}

                {/* MARK: Visitors
                 */}

                <Card
                    divergent='ghost'
                    className='w-full py-0'
                    heading='Visitors'
                >
                    <div className='flex flex-col sm:flex-row flex-wrap items-start justify-start gap-16'>
                        {fields.map((field, index) => {
                            return (
                                <InputGroup<Form>
                                    key={field.id}
                                    name={`people.${index}.name`}
                                    formRegister={{
                                        register,
                                    }}
                                    element={{
                                        right: {
                                            children: (
                                                <Button
                                                    size='sm'
                                                    divergent='soft'
                                                    colorScheme='red'
                                                    isDisabled={
                                                        fields.length <= 1
                                                    }
                                                    icon={{
                                                        icon: 'remove',
                                                        ariaLabel: 'remove',
                                                    }}
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                />
                                            ),
                                        },
                                    }}
                                    errors={errors}
                                    label='Visitor'
                                />
                            );
                        })}
                    </div>

                    <Button
                        colorScheme='forest'
                        onClick={() =>
                            append({
                                name: '',
                            })
                        }
                    >
                        Add Another visitor
                    </Button>
                </Card>

                {/* MARK: Assets
                 */}

                {assets.length > 0 && (
                    <Card
                        divergent='outline'
                        heading='Assets'
                        className='w-full'
                    >
                        <p className='text-14'>
                            Which parts of the property did you use on this
                            visit?
                        </p>

                        <div className={checkBoxGroupStyle}>
                            {assets.map((asset: Asset) => {
                                return (
                                    <CheckboxGroup<Form>
                                        key={asset.name}
                                        name='assetsUsed'
                                        formRegister={{
                                            register,
                                        }}
                                        errors={errors}
                                        isDisabled={
                                            asset.description === 'Closed'
                                        }
                                        checkboxes={[
                                            {
                                                label: asset.name,
                                                labelConfig: {
                                                    hideBadge: true,
                                                },
                                            },
                                        ]}
                                    />
                                );
                            })}
                        </div>
                    </Card>
                )}

                {/* MARK: Facilities
                 */}

                {availableFacilities.length > 0 && (
                    <Card
                        divergent='outline'
                        heading='Facilities'
                        className='w-full'
                    >
                        <p className='text-14'>
                            Which facilities did you use on this visit?
                        </p>

                        <div className={checkBoxGroupStyle}>
                            {availableFacilities.map((facility) => {
                                const icon = resolveIcon(facility.reference);
                                return (
                                    <div
                                        className='flex flex-row gap-8 items-center'
                                        key={facility.reference}
                                    >
                                        {icon && <Icon {...icon} />}
                                        <CheckboxGroup<Form>
                                            name='facilitiesUsed'
                                            formRegister={{
                                                register,
                                            }}
                                            errors={errors}
                                            checkboxes={[
                                                {
                                                    label: facility.name,
                                                    labelConfig: {
                                                        hideBadge: true,
                                                    },
                                                },
                                            ]}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                )}

                {/* MARK: Travel
                 */}

                {place.directions && (
                    <Card
                        divergent='outline'
                        heading='Travel'
                        className='w-full'
                    >
                        <p className='text-14'>
                            How did you travel to the National Trust Property?
                        </p>

                        <div className={checkBoxGroupStyle}>
                            {Object.keys(place.directions.directions).map(
                                (key) => {
                                    const icon = resolveIcon(key);
                                    return (
                                        <div
                                            className='flex flex-row items-center gap-8'
                                            key={key}
                                        >
                                            {icon && <Icon {...icon} />}
                                            <CheckboxGroup<Form>
                                                name='travel'
                                                formRegister={{
                                                    register,
                                                }}
                                                errors={errors}
                                                checkboxes={[
                                                    {
                                                        label: key.toCapitalisedCase(),
                                                        labelConfig: {
                                                            hideBadge: true,
                                                        },
                                                    },
                                                ]}
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </Card>
                )}
            </form>
        </Drawer>
    );
};

const calculateTotalPrice = (tickets: Ticket[]): number => {
    return tickets.reduce((total, ticket: Ticket) => {
        const cost = ticket.qty * ticket.standardAmount.amount;
        return total + cost;
    }, 0);
};
