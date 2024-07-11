'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { VisitDB } from '../../../../library/types/internal';
import {
    Button,
    Card,
    Frame,
    Icon,
    InputGroup,
} from '../../../../library/components';
import {
    getAmountInPence,
    getAmountInPounds,
    getCase,
    resolveIcon,
} from '../../../../library/helpers';
import {
    Asset,
    Facility,
    PostalAddress,
} from '../../../../library/types/national-trust';

import '../../../../library/prototypes/String.extensions';
import { useVisits } from '../../../../library/context/Visits.context';
import { useToast } from '../../../../library/context/Toast.context';
import { ToastProps } from '../../../../library/components/Toast/Toast.component';

// MARK: Types

type VisitViewProps = {
    visit: VisitDB;
};

type FormValues = VisitDB;

// MARK: View

export const VisitView = ({ visit }: VisitViewProps) => {
    const markerRef = useRef(null);
    const router = useRouter();
    const toast = useToast();
    const { onUpdateVisit } = useVisits();

    // MARK: Form

    const {
        control,
        register,
        formState: { errors, isDirty, isValid },
        handleSubmit,
        reset,
    } = useForm<FormValues>({ mode: 'onChange' });

    const {
        fields: people,
        remove: removePerson,
        append: appendPerson,
    } = useFieldArray<FormValues>({
        control,
        name: 'people',
    });

    const { fields: tickets } = useFieldArray<FormValues>({
        control,
        name: 'tickets',
    });

    // MARK: State

    const [isEditable, setIsEditable] = useState<boolean>(false);

    // MARK: Memos

    const Map = useMemo(
        () =>
            dynamic(
                () =>
                    import(
                        '../../../../library/components/Map/Map.component'
                    ).then((module) => module.Map),
                {
                    ssr: false,
                    loading: () => (
                        <div className='w-full h-full'>Loading Map</div>
                    ),
                }
            ),
        []
    );

    // MARK: Handlers

    const handleToast = ({
        title,
        description,
        status,
    }: Omit<ToastProps, 'onClose' | 'id'>) => {
        toast({
            title,
            description,
            status,
            duration: 5000,
            // isClosable: true,
            position: 'top',
        });
    };

    const handleReset = () => {
        const tickets = visit.tickets.map((ticket) => {
            return {
                ...ticket,
                standardAmount: {
                    ...ticket.standardAmount,
                    amount: getAmountInPounds(
                        ticket.standardAmount.amount
                    ) as any as number,
                },
            };
        });

        reset({
            ...visit,
            tickets,
        });
        setIsEditable(false);
    };

    // MARK: Submit

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const _tickets = data.tickets.map((ticket) => ({
            ...ticket,
            standardAmount: {
                ...ticket.standardAmount,
                amount: getAmountInPence(
                    ticket.standardAmount.amount.toString()
                ),
            },
        }));

        const totalPrice = _tickets.reduce((prev, ticket) => {
            prev += ticket.standardAmount.amount * ticket.qty;
            return prev;
        }, 0);

        const _visit: VisitDB = {
            ...data,
            tickets: _tickets,
            totalPrice,
        };

        const res = await onUpdateVisit(visit._id, _visit);

        if (res.message === 'Error') {
            handleToast({
                title: 'Error',
                description: res.error,
                status: 'error',
            });
        }

        if (res.message === 'Success') {
            handleToast({
                title: 'Updated',
                status: 'success',
                description: 'Successfully updated',
            });
        }

        setIsEditable(false);
    };

    // MARK: Effects

    useEffect(() => {
        if (visit) handleReset();
    }, [visit]);

    // MARK: Return

    return (
        visit && (
            <>
                <Frame
                    bgImage={visit.place.images?.PRIMARY?.url || undefined}
                    id='frame-hero-image'
                    className='h-544 md:h-320 justify-end'
                >
                    <div className='flex flex-col gap-16 w-full items-start'>
                        <h1 className='font-bold text-24'>
                            {visit.place.name}
                        </h1>
                        <p className='font-semibold'>
                            {new Date(visit.date).toDateString()}
                        </p>
                        <div className='flex flex-row gap-16 flex-wrap'>
                            <Button
                                link={{
                                    href: visit.place.websiteUrl,
                                    target: '_blank',
                                }}
                                colorScheme='white'
                            >
                                Website
                            </Button>
                            <Button
                                link={{
                                    href: `Places/${getCase(visit.place.name, 'pascal')}/${visit.place.placeId}`,
                                }}
                                colorScheme='white'
                            >
                                Property Page
                            </Button>
                        </div>
                    </div>
                </Frame>

                {/* MARK: Controls
                 */}
                <Frame
                    id='place-frame-controls'
                    preset='controls'
                    navigationCTA={{ onClick: () => router.back() }}
                >
                    <>
                        {isEditable && (
                            <>
                                <Button
                                    icon={{
                                        icon: 'cross',
                                        ariaLabel: 'cancel',
                                    }}
                                    divergent='soft'
                                    type='submit'
                                    form='visit-form'
                                    colorScheme='red'
                                    onClick={() => handleReset()}
                                />
                                <Button
                                    icon={{
                                        icon: 'upload',
                                        ariaLabel: 'save',
                                    }}
                                    divergent='soft'
                                    isDisabled={!isDirty || !isValid}
                                    type='submit'
                                    form='visit-form'
                                    colorScheme='green'
                                />
                            </>
                        )}
                    </>
                    <Button
                        icon={{
                            icon: 'pencil',
                            ariaLabel: 'edit',
                        }}
                        divergent='soft'
                        onClick={() => setIsEditable(true)}
                    />
                </Frame>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    id='visit-form'
                >
                    {/* MARK: Location
                     */}

                    <Frame id='place-frame'>
                        <InputGroup<FormValues>
                            name='date'
                            label='Date'
                            formRegister={{ register }}
                            errors={errors}
                            labelConfig={{ hideBadge: true }}
                        />
                        <div className='flex flex-col md:flex-row gap-16 w-full'>
                            <Card className='w-full md:w-auto order-2 md:order-1'>
                                <div className='flex flex-row gap-8'>
                                    <Icon
                                        icon='detail'
                                        ariaLabel='address'
                                    />
                                    <div className='flex flex-col gap-8'>
                                        {Object.keys(
                                            visit.place.location.postalAddress
                                        ).map((item) => {
                                            const value =
                                                visit.place.location
                                                    .postalAddress[
                                                    item as keyof PostalAddress
                                                ];

                                            return (
                                                <span
                                                    className='flex flex-row gap-8'
                                                    key={item}
                                                >
                                                    <p className='font-bold'>
                                                        {item === 'lines'
                                                            ? null
                                                            : item.toCapitalisedCase()}
                                                    </p>
                                                    <p>
                                                        {Array.isArray(value)
                                                            ? value.map((v) => {
                                                                  return v;
                                                              })
                                                            : value}
                                                    </p>
                                                </span>
                                            );
                                        })}
                                        <span className='flex flex-row gap-8'>
                                            <p className='font-bold'>Region</p>
                                            <p>{visit.place.location.region}</p>
                                        </span>
                                    </div>
                                </div>
                                <div className='flex flex-row gap-8'>
                                    {visit.travel.map((transport) => {
                                        const icon = resolveIcon(
                                            transport.toLowerCase()
                                        );

                                        return (
                                            <React.Fragment key={transport}>
                                                {icon && <Icon {...icon} />}
                                                <div className='flex flex-col gap-8'>
                                                    <p className='font-bold'>
                                                        {transport.toCapitalisedCase()}
                                                    </p>
                                                </div>
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </Card>
                            <div
                                data-label='map-container'
                                className='aspect-video h-full flex-1 order-1 md:order-2'
                            >
                                <Map
                                    ref={markerRef}
                                    position={[
                                        visit.place.location.latitudeLongitude
                                            .latitude,
                                        visit.place.location.latitudeLongitude
                                            .longitude,
                                    ]}
                                />
                            </div>
                        </div>
                    </Frame>

                    {/* MARK: Tickets
                     */}

                    <Frame id='people-and-tickets'>
                        <p>
                            <span className='font-semibold'>Total Price</span>:
                            £{getAmountInPounds(visit.totalPrice)}
                        </p>
                        <div className='flex flex-col md:flex-row gap-16  md:items-stretch w-full'>
                            {tickets.map((ticket, index) => {
                                return (
                                    <Card
                                        key={ticket.id}
                                        className='w-full'
                                        heading='Ticket'
                                    >
                                        <InputGroup<FormValues>
                                            name={`tickets.${index}.name`}
                                            formRegister={{ register }}
                                            errors={errors}
                                            label='Name'
                                            isDisabled={true}
                                            labelConfig={{ hideBadge: true }}
                                        />
                                        <InputGroup<FormValues>
                                            name={`tickets.${index}.qty`}
                                            formRegister={{
                                                register,
                                                options: {
                                                    valueAsNumber: true,
                                                },
                                            }}
                                            isDisabled={!isEditable}
                                            errors={errors}
                                            label='Qty'
                                            type='number'
                                            labelConfig={{ hideBadge: true }}
                                        />
                                        <InputGroup<FormValues>
                                            name={`tickets.${index}.standardAmount.amount`}
                                            formRegister={{
                                                register,
                                                options: {
                                                    valueAsNumber: true,
                                                },
                                            }}
                                            isDisabled={!isEditable}
                                            errors={errors}
                                            label='Qty'
                                            type='number'
                                            step='.01'
                                            labelConfig={{ hideBadge: true }}
                                            addon={{ left: { children: '£' } }}
                                        />
                                    </Card>
                                );
                            })}

                            <Card
                                className='w-full'
                                heading='Visitors'
                            >
                                {people.map((person, index) => {
                                    return (
                                        <InputGroup<FormValues>
                                            key={person.id}
                                            name={`people.${index}.name`}
                                            formRegister={{
                                                register,
                                            }}
                                            isDisabled={!isEditable}
                                            element={{
                                                right: {
                                                    children: (
                                                        <Button
                                                            size='sm'
                                                            divergent='soft'
                                                            colorScheme='red'
                                                            isDisabled={
                                                                people.length <=
                                                                1
                                                            }
                                                            icon={{
                                                                icon: 'remove',
                                                                ariaLabel:
                                                                    'remove',
                                                            }}
                                                            onClick={() =>
                                                                removePerson(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                    ),
                                                },
                                            }}
                                            errors={errors}
                                            label='Visitor'
                                            labelConfig={{
                                                hideBadge: true,
                                            }}
                                        />
                                    );
                                })}
                                <Button
                                    colorScheme='forest'
                                    onClick={() =>
                                        appendPerson({
                                            name: '',
                                        })
                                    }
                                    isDisabled={!isEditable}
                                >
                                    Add Another visitor
                                </Button>
                            </Card>
                        </div>
                    </Frame>
                    {/* MARK: Assets and Facilities
                     */}
                    <Frame
                        id='assets-and-facilities'
                        className='items-stretch md:flex-row md:gap-16 lg:gap-16'
                    >
                        <Card
                            heading='Assets Used'
                            className='w-full'
                        >
                            {visit.assetsUsed.map((asset: Asset) => {
                                return (
                                    <div key={asset.name}>
                                        <p>{asset.name}</p>
                                    </div>
                                );
                            })}
                        </Card>
                        <Card
                            heading='Facilities Used'
                            className='w-full'
                        >
                            {visit.facilitiesUsed.map((facility: Facility) => {
                                const icon = resolveIcon(
                                    facility.reference || ''
                                );

                                return (
                                    <div
                                        key={facility.name}
                                        className='flex flex-row gap-8'
                                    >
                                        {icon && <Icon {...icon} />}
                                        <p>{facility.name}</p>
                                    </div>
                                );
                            })}
                        </Card>
                    </Frame>
                </form>
            </>
        )
    );
};
