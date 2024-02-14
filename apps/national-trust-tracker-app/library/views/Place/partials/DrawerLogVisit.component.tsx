import { ReactElement, useEffect, useState } from 'react';
import { Form, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { revalidatePath } from 'next/cache';

import {
    Button,
    Card,
    CheckboxGroup,
    Drawer,
    DrawerProps,
    Heading,
    Icon,
    InputGroup,
    SelectGroup,
} from '@sam/library';

import { Ticket, Visit, CompiledPlace } from '../../../types/internal';
import {
    AdmissionCategory,
    AdmissionPrice,
    Asset,
    DirectionType,
    Facility,
    ReferencedFacility,
    Link,
    NameType,
    ReferencedFacilities,
} from '../../../types/national-trust';
import { resolveIcon } from '../../../helpers';
import { isAsset, isReferencedFacility } from '../../../guards';

import { PlaceViewProps } from '../Place.definition';

import * as Chakra from '@chakra-ui/react';

interface DrawerLogVisitProps extends Pick<DrawerProps, 'onClose' | 'isOpen'> {
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

export const DrawerLogVisit = ({
    isOpen,
    onClose,
    place,
}: DrawerLogVisitProps): ReactElement<DrawerLogVisitProps> => {
    const toast = Chakra.useToast();

    const [admissionCategory, setAdmissionCategory] = useState<string>('');
    const [availableFacilities, setAvailableFacilities] = useState<
        ReferencedFacility[]
    >([]);
    const [assets, setAssets] = useState<Asset[]>([]);

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

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleToast = ({
        title,
        description,
        status,
    }: {
        title: string;
        description: string;
        status: Chakra.UseToastOptions['status'];
    }) => {
        toast({
            title,
            description,
            status,
            duration: 5000,
            isClosable: true,
            position: 'top',
        });
    };

    const onSubmit: SubmitHandler<Form> = async (data: Form) => {
        const assetsUsed = data.assetsUsed
            ? (data.assetsUsed
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
            const postVisitOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(visit),
            };

            const post = (await fetch(
                '/api/Visits',
                postVisitOptions
            )) as ResponseAndMessage;

            if (post.message === 'Success') {
                revalidatePath('/', 'layout');

                handleToast({
                    title: 'Visit Logged',
                    description: 'Your Visit has been saved successfully',
                    status: 'success',
                });
            }

            if (post.message === 'Error') {
                handleToast({
                    title: 'Error',
                    description: 'Your Visit was not logged',
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

        const compiledPlace: CompiledPlace = {
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

        const putPlaceOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(compiledPlace),
        };

        const put = (await fetch(
            `/api/Places/${compiledPlace.placeId}`,
            putPlaceOptions
        )) as ResponseAndMessage;

        if (put.message === 'Success') {
            handleToast({
                title: 'Place updated',
                description: 'We have updates the saved place notes',
                status: 'success',
            });
        }

        if (put.message === 'Error') {
            handleToast({
                title: 'Error',
                description: 'The place notes have not been updated',
                status: 'error',
            });
        }

        handleClose();
    };

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

    return (
        <Drawer
            isOpen={isOpen}
            onClose={handleClose}
            confirmCTA={{
                children: 'Log Visit',
                type: 'submit',
                form: 'log-a-visit-form',
                colorScheme: 'green',
                isDisabled: !isDirty && !isValid,
            }}
            declineCTA={{
                onClick: () => handleClose(),
                colorScheme: 'red',
            }}
            showOverlay
        >
            <Chakra.chakra.form
                id='log-a-visit-form'
                onSubmit={handleSubmit(onSubmit)}
                display='flex'
                flexDirection='column'
                gap={16}
            >
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
                                                asset.description !== 'Closed'
                                        ) ||
                                        'The Property was fully closed on this Date'
                                    );
                                },
                            },
                        },
                    }}
                    errors={errors}
                    inputConfig={{
                        type: 'date',
                    }}
                    labelConfig={{}}
                    label='Date of Visit'
                />

                {place.admissionPrices && (
                    <Card
                        colorScheme='gray'
                        variant='outline'
                        hasNegativeMargin
                    >
                        <Chakra.Text fontSize={14}>
                            Please select the admissions category to be able to
                            select which tickets were used with the membership.
                        </Chakra.Text>
                        <SelectGroup<Form, string>
                            name='admissionCategory'
                            formRegister={{
                                register,
                                options: { required: true },
                            }}
                            errors={errors}
                            selectConfig={{}}
                            labelConfig={{}}
                            label='Admissions Category'
                            options={place.admissionPrices.categories.map(
                                (category: AdmissionCategory) => {
                                    return category.name;
                                }
                            )}
                        />

                        {admissionCategory && (
                            <Chakra.Flex
                                direction={['column', 'row']}
                                gap={8}
                            >
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
                                                inputConfig={{
                                                    defaultValue: 0,
                                                    type: 'number',
                                                }}
                                                element={{
                                                    left: {
                                                        children: (
                                                            <Button
                                                                size='xs'
                                                                left='5px'
                                                                icon={{
                                                                    icon: 'remove',
                                                                    ariaLabel:
                                                                        'minus',
                                                                }}
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
                                                                size='xs'
                                                                right='5px'
                                                                icon={{
                                                                    icon: 'plus',
                                                                    ariaLabel:
                                                                        'plus',
                                                                }}
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
                            </Chakra.Flex>
                        )}
                    </Card>
                )}

                <Chakra.Flex
                    direction='column'
                    py={16}
                    gap={8}
                >
                    <Chakra.Text fontSize={14}>
                        Who visited with you?
                    </Chakra.Text>
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
                                                size='xs'
                                                right='5px'
                                                isDisabled={fields.length <= 1}
                                                icon={{
                                                    icon: 'remove',
                                                    ariaLabel: 'remove',
                                                }}
                                                onClick={() => remove(index)}
                                            />
                                        ),
                                    },
                                }}
                                errors={errors}
                                inputConfig={{}}
                                labelConfig={{}}
                                label='Visitor'
                            />
                        );
                    })}

                    <Button
                        size='xs'
                        onClick={() =>
                            append({
                                name: '',
                            })
                        }
                    >
                        Add Another visitor
                    </Button>
                </Chakra.Flex>

                {assets.length > 0 && (
                    <Card
                        colorScheme='gray'
                        variant='outline'
                        hasNegativeMargin
                    >
                        <Heading preset='sub-heading'>Assets</Heading>
                        <Chakra.Text fontSize={14}>
                            Which parts of the property did you use on this
                            visit?
                        </Chakra.Text>

                        {assets.map((asset: Asset) => {
                            return (
                                <CheckboxGroup<Form>
                                    key={asset.name}
                                    name='assetsUsed'
                                    formRegister={{
                                        register,
                                    }}
                                    errors={errors}
                                    checkboxConfig={{
                                        value: asset.name,
                                        isDisabled:
                                            asset.description === 'Closed',
                                    }}
                                    labelConfig={{ hideBadge: true }}
                                    label={asset.name}
                                />
                            );
                        })}
                    </Card>
                )}

                {availableFacilities.length > 0 && (
                    <Card
                        colorScheme='gray'
                        variant='outline'
                        hasNegativeMargin
                    >
                        <Heading preset='sub-heading'>Facilities</Heading>
                        <Chakra.Text fontSize={14}>
                            Which facilities did you use on this visit?
                        </Chakra.Text>

                        {availableFacilities.map((facility) => {
                            const icon = resolveIcon(facility.reference);
                            return (
                                <Chakra.Flex
                                    gap={8}
                                    alignItems='center'
                                    key={facility.reference}
                                >
                                    {icon && <Icon {...icon} />}
                                    <CheckboxGroup<Form>
                                        name='facilitiesUsed'
                                        formRegister={{
                                            register,
                                        }}
                                        errors={errors}
                                        checkboxConfig={{
                                            value: facility.name,
                                        }}
                                        labelConfig={{ hideBadge: true }}
                                        label={facility.name}
                                    />
                                </Chakra.Flex>
                            );
                        })}
                    </Card>
                )}

                {place.directions && (
                    <Chakra.Flex
                        direction='column'
                        py={16}
                    >
                        <Heading preset='sub-heading'>Travel</Heading>
                        <Chakra.Text fontSize={14}>
                            How did you travel to the National Trust Property?
                        </Chakra.Text>

                        <Chakra.Flex
                            direction='column'
                            gap={16}
                        >
                            {Object.keys(place.directions.directions).map(
                                (key) => {
                                    const icon = resolveIcon(key);
                                    return (
                                        <Chakra.Flex
                                            gap={8}
                                            alignItems='center'
                                            key={key}
                                        >
                                            {icon && <Icon {...icon} />}
                                            <CheckboxGroup<Form>
                                                name='travel'
                                                formRegister={{
                                                    register,
                                                }}
                                                errors={errors}
                                                checkboxConfig={{
                                                    value: key,
                                                }}
                                                labelConfig={{
                                                    hideBadge: true,
                                                }}
                                                label={key.toCapitalisedCase()}
                                            />
                                        </Chakra.Flex>
                                    );
                                }
                            )}
                        </Chakra.Flex>
                    </Chakra.Flex>
                )}
            </Chakra.chakra.form>
        </Drawer>
    );
};

const calculateTotalPrice = (tickets: Ticket[]): number => {
    return tickets.reduce((total, ticket: Ticket) => {
        const cost = ticket.qty * ticket.standardAmount.amount;
        return total + cost;
    }, 0);
};
