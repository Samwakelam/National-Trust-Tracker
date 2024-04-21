'use client';

import { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
// import { useFieldArray, useForm } from 'react-hook-form';
// import { ChartData, ChartOptions } from 'chart.js';

import { useVisits } from '../../../library/context/Visits.context';
import {
    Button,
    Card,
    Frame,
    Icon,
    IconProps,
    Modal,
} from '../../../library/components';
import {
    getAmountInPounds,
    getCase,
    resolveCurrency,
    resolvePersonMap,
} from '../../../library/helpers';

import { MembershipViewProps } from './Membership.definitions';

import '../../../library/prototypes/String.extensions';

export const MembershipView = ({ membership }: MembershipViewProps) => {
    const { visits } = useVisits();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [amounts, setAmounts] = useState<{
        total: number;
        remaining: number;
        spent: number;
        ticketAverage: number;
        totalTickets: number;
        ticketsOutstanding: number;
        monthlyAverage: number;
        projection: number;
    }>({
        total: 100,
        remaining: 100,
        spent: 100,
        ticketAverage: 100,
        totalTickets: 0,
        ticketsOutstanding: 0,
        monthlyAverage: 100,
        projection: 0,
    });

    // const {
    //     control,
    //     formState: { errors, isDirty, isValid },
    //     register,
    //     reset,
    // } = useForm<FormMembership>({
    //     mode: 'onChange',
    //     defaultValues: {
    //         ...membership,
    //         totalCost: parseFloat(getAmountInPounds(membership.totalCost)),
    //     },
    // });
    // const { fields, append, remove } = useFieldArray<FormMembership>({
    //     control,
    //     name: 'members',
    // });

    // const data: Record<
    //     MembershipChartType,
    //     ChartData<MembershipData>
    // > = useMemo(() => {
    //     const _data = getByMonth().statistics;

    //     const months = Object.keys(_data);
    //     const getData = (key: InformationType) =>
    //         months.flatMap((month): number | Record<string, number> | any[] => {
    //             const stats = _data[month];

    //             if (
    //                 key === 'totalPrice' &&
    //                 stats &&
    //                 typeof stats === 'number'
    //             ) {
    //                 return parseFloat(
    //                     getAmountInPounds(stats[key as keyof typeof stats])
    //                 );
    //             }

    //             if (stats) {
    //                 return stats[key as keyof typeof stats];
    //             }

    //             return [];
    //         });

    //     const decreasingMembership = months.reduce(
    //         (prev: Record<string, number>, month) => {
    //             const keys = Object.keys(prev);
    //             const lastMonth = keys[keys.length - 1] as string;
    //             const lastTotal = prev[lastMonth] as number;

    //             const currentTotal =
    //                 lastTotal - _data[month as keyof typeof _data]!.totalPrice;

    //             if (prev[month]) {
    //                 prev[month] = currentTotal;
    //             } else {
    //                 prev = {
    //                     ...prev,
    //                     [month]: currentTotal,
    //                 };
    //             }

    //             return prev;
    //         },
    //         { [getDateKeyFormat(membership.startDate)]: membership.totalCost }
    //     );

    //     return {
    //         ticket: {
    //             labels: months,
    //             datasets: [
    //                 {
    //                     label: 'Savings',
    //                     data: getData('totalPrice'),
    //                     yAxisID: 'axisTwo',
    //                     borderColor: theme.colors.teal[200],
    //                     backgroundColor: theme.colors.teal[100],
    //                     tension: 0.2,
    //                 },
    //                 {
    //                     label: 'Tickets',
    //                     data: getData('totalTickets'),
    //                     yAxisID: 'axisOne',
    //                     borderColor: theme.colors.green[200],
    //                     backgroundColor: theme.colors.green[100],
    //                     tension: 0.2,
    //                 },
    //                 {
    //                     label: 'Visits',
    //                     data: getData('visits'),
    //                     yAxisID: 'axisOne',
    //                     borderColor: theme.colors.blue[200],
    //                     backgroundColor: theme.colors.blue[100],
    //                     tension: 0.2,
    //                 },
    //             ],
    //         },
    //         price: {
    //             labels: [getDateKeyFormat(membership.startDate), ...months],
    //             datasets: [
    //                 {
    //                     label: 'Remaining Membership',
    //                     data: decreasingMembership,
    //                     borderColor: theme.colors.teal[200],
    //                     backgroundColor: theme.colors.teal[100],
    //                     tension: 0.2,
    //                 },
    //             ],
    //         },
    //     };
    // }, [visits]);

    // const chartOptions: Record<
    //     MembershipChartType,
    //     ChartOptions<'line'>
    // > = useMemo(() => {
    //     return chartOptionsConfig;
    // }, []);

    const handleCloseModal = () => {
        // reset();
        setIsOpen(false);
    };

    // useEffect(() => {
    //     const stats = getAll().statistics;
    //     if (typeof stats !== 'number') {
    //         const spent = stats['totalPrice'];

    //         const remaining = membership.totalCost - spent;
    //         const totalTickets = stats['totalTickets'];

    //         const ticketAverage = Math.round(spent / totalTickets);
    //         const ticketsOutstanding = Math.ceil(remaining / ticketAverage);

    //         const monthlyStats = getByMonth().statistics;
    //         const months = Object.keys(monthlyStats);
    //         const monthlyAverage =
    //             months.reduce((prev, month) => {
    //                 prev += monthlyStats[month]!.totalPrice;
    //                 return prev;
    //             }, 0) / months.length;

    //         setAmounts((prev) => ({
    //             ...prev,
    //             total: membership.totalCost,
    //             remaining,
    //             spent,
    //             ticketAverage,
    //             totalTickets,
    //             ticketsOutstanding,
    //             monthlyAverage,
    //         }));
    //     }
    // }, [membership, visits]);

    return (
        <div>
            <Frame id='membership-frame'>
                <div className='grid-cols-1 sm:grid-cols-2 gap-y-32 gap-x-20 w-full'>
                    <div className='flex flex-col justify-between gap-56'>
                        <Button onClick={() => setIsOpen(true)}>
                            Update Membership
                        </Button>
                    </div>
                    <div className='flex flex-col gap-20'>
                        <Card>
                            <h2>Membership Information</h2>

                            <InformationItem
                                icon={{
                                    icon: 'membership',
                                    ariaLabel: 'membership',
                                }}
                                heading='Membership Type'
                                text={getCase(
                                    membership.type,
                                    'sentence'
                                ).toCapitalisedCase()}
                            />

                            <InformationItem
                                icon={{
                                    icon: 'users',
                                    ariaLabel: 'users',
                                }}
                                heading='Members'
                                text={membership.members.map(resolvePersonMap)}
                            />
                        </Card>

                        <Card>
                            <h2>Pricing Information</h2>
                            <InformationItem
                                icon={{
                                    icon: 'sack',
                                    ariaLabel: 'money bag',
                                }}
                                heading='Membership Total'
                                text={`${resolveCurrency('GBP')} ${getAmountInPounds(
                                    amounts.total
                                )}`}
                            />
                            <InformationItem
                                icon={{
                                    icon: 'piggy-bank',
                                    ariaLabel: 'piggy bank',
                                }}
                                heading='Total Saved'
                                text={` ${resolveCurrency('GBP')} ${getAmountInPounds(
                                    amounts.spent
                                )}`}
                            />
                            <InformationItem
                                icon={{
                                    icon: 'money-report',
                                    ariaLabel: 'money report',
                                }}
                                heading='Total Remaining'
                                text={` ${resolveCurrency('GBP')} ${getAmountInPounds(
                                    amounts.remaining
                                )}`}
                            />
                            <InformationItem
                                icon={{
                                    icon: 'money-report',
                                    ariaLabel: 'money report',
                                }}
                                heading='Monthly Average'
                                text={` ${resolveCurrency('GBP')} ${getAmountInPounds(
                                    amounts.monthlyAverage
                                )}`}
                            />
                        </Card>

                        <Card>
                            <h2>Ticket Information</h2>

                            <InformationItem
                                icon={{
                                    icon: 'users',
                                    ariaLabel: 'users',
                                }}
                                heading='Tickets Bought'
                                text={amounts.totalTickets}
                            />

                            <InformationItem
                                icon={{
                                    icon: 'ticket',
                                    ariaLabel: 'ticket',
                                    variant: 'outline',
                                }}
                                heading='Average Ticket Price'
                                text={`${resolveCurrency('GBP')} ${getAmountInPounds(
                                    amounts.ticketAverage
                                )}`}
                            />

                            <InformationItem
                                icon={{
                                    icon: 'house',
                                    ariaLabel: 'house',
                                    variant: 'outline',
                                }}
                                heading='Tickets Outstanding'
                                text={`${amounts.ticketsOutstanding} tickets left until paid off.`}
                            >
                                <p>
                                    Based on one person and the calculated
                                    average ticket price.
                                </p>
                            </InformationItem>
                        </Card>
                    </div>
                </div>
            </Frame>

            <Modal
                isOpen={isOpen}
                onClose={() => handleCloseModal()}
                heading='Update Membership'
                confirmCTA={{
                    type: 'submit',
                    form: '',
                    children: 'Submit',
                    // isDisabled: !isDirty || !isValid,
                }}
                declineCTA={{}}
            >
                <form id='update-membership-form'>
                    {/* <InputGroup<FormMembership>
                        name='groupName'
                        formRegister={{ register }}
                        errors={errors}
                        label='Group Name'
                        labelConfig={{ hideBadge: true }}
                    />

                    <InputGroup<FormMembership>
                        name='startDate'
                        formRegister={{ register }}
                        errors={errors}
                        label='Start Date'
                        inputConfig={{
                            type: 'date',
                        }}
                        labelConfig={{ hideBadge: true }}
                    /> */}

                    <Card>
                        {/* <InputGroup<FormMembership>
                            name='totalCost'
                            formRegister={{
                                register,
                            }}
                            errors={errors}
                            label='Total Cost'
                            labelConfig={{ hideBadge: true }}
                            inputConfig={{ type: 'number' }}
                            addOn={{ left: { children: '£' } }}
                        />
                        <SelectGroup<FormMembership, MembershipType>
                            name='type'
                            label='Membership Type'
                            labelConfig={{ hideBadge: true }}
                            formRegister={{ register }}
                            errors={errors}
                            options={membershipType.map((_type) => {
                                return getCase(
                                    _type,
                                    'sentence'
                                ).toCapitalisedCase();
                            })}
                        /> */}
                        {/* {fields.map((field, index) => {
                            return (
                                <InputGroup<FormMembership>
                                    key={field.id}
                                    name={`members.${index}.name`}
                                    formRegister={{
                                        register,
                                    }}
                                    element={{
                                        right: {
                                            children: (
                                                <Button
                                                    size='xs'
                                                    right='5px'
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
                                    inputConfig={{}}
                                    labelConfig={{ hideBadge: true }}
                                    label='Member'
                                />
                            );
                        })} */}
                        <Button
                            onClick={
                                () => {}
                                // append({
                                //     name: '',
                                // })
                            }
                        >
                            Add Another Member
                        </Button>
                    </Card>
                </form>
            </Modal>
        </div>
    );
};

type InformationItemProps = {
    icon?: IconProps;
    text: ReactNode;
    heading: string;
    children?: ReactElement | ReactElement[];
};

// data-label='' className=''

const InformationItem = ({
    icon,
    heading,
    text,
    children,
}: InformationItemProps) => {
    return (
        <div
            data-label='information-item'
            className='grid grid-cols-[auto_1fr] items-start gap-x-8 gap-y-16'
        >
            <div className='flex flex-row col-start-1 items-center h-full'>
                {icon && <Icon {...icon} />}
            </div>

            <div className='flex flex-row gap-16 items-center'>
                <h2>{heading}</h2>
                <p>{text}</p>
            </div>
            {children && <div className='col-start-2'>{children}</div>}
        </div>
    );
};
