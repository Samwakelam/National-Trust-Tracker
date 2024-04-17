'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { ChartData, ChartOptions } from 'chart.js';

import {
    Chart,
    ContainerScrollBox,
    ContainerPage,
    Frame,
    getCase,
    Heading,
    Card,
    Icon,
    IconProps,
    HeadingProps,
    Button,
    Modal,
    InputGroup,
    SelectGroup,
} from '@sam/library';
import { Children } from '@sam/library/src/types';

import { MembershipType, membershipType } from '../../types/internal';
import { InformationType, useVisits } from '../../hooks/useVisits';
import {
    getAmountInPounds,
    resolveCurrency,
    resolvePersonMap,
} from '../../helpers';
import { getDateKeyFormat } from '../../helpers/getDateKeyFormat.helper';

import {
    MembershipChartType,
    MembershipViewProps,
    MembershipData,
    FormMembership,
} from './Membership.definitions';
import { chartOptionsConfig } from './Membership.config';

import * as Chakra from '@chakra-ui/react';

import '../../prototypes/String.extensions';

export const MembershipView = ({ visits, membership }: MembershipViewProps) => {
    const theme = Chakra.useTheme();
    const { getAll, getByMonth } = useVisits({
        visits,
    });

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

    const {
        control,
        formState: { errors, isDirty, isValid },
        register,
        reset,
    } = useForm<FormMembership>({
        mode: 'onChange',
        defaultValues: {
            ...membership,
            totalCost: parseFloat(getAmountInPounds(membership.totalCost)),
        },
    });
    const { fields, append, remove } = useFieldArray<FormMembership>({
        control,
        name: 'members',
    });

    const data: Record<
        MembershipChartType,
        ChartData<MembershipData>
    > = useMemo(() => {
        const _data = getByMonth().statistics;

        const months = Object.keys(_data);
        const getData = (key: InformationType) =>
            months.flatMap((month): number | Record<string, number> | any[] => {
                const stats = _data[month];

                if (
                    key === 'totalPrice' &&
                    stats &&
                    typeof stats === 'number'
                ) {
                    return parseFloat(
                        getAmountInPounds(stats[key as keyof typeof stats])
                    );
                }

                if (stats) {
                    return stats[key as keyof typeof stats];
                }

                return [];
            });

        const decreasingMembership = months.reduce(
            (prev: Record<string, number>, month) => {
                const keys = Object.keys(prev);
                const lastMonth = keys[keys.length - 1] as string;
                const lastTotal = prev[lastMonth] as number;

                const currentTotal =
                    lastTotal - _data[month as keyof typeof _data]!.totalPrice;

                if (prev[month]) {
                    prev[month] = currentTotal;
                } else {
                    prev = {
                        ...prev,
                        [month]: currentTotal,
                    };
                }

                return prev;
            },
            { [getDateKeyFormat(membership.startDate)]: membership.totalCost }
        );

        return {
            ticket: {
                labels: months,
                datasets: [
                    {
                        label: 'Savings',
                        data: getData('totalPrice'),
                        yAxisID: 'axisTwo',
                        borderColor: theme.colors.teal[200],
                        backgroundColor: theme.colors.teal[100],
                        tension: 0.2,
                    },
                    {
                        label: 'Tickets',
                        data: getData('totalTickets'),
                        yAxisID: 'axisOne',
                        borderColor: theme.colors.green[200],
                        backgroundColor: theme.colors.green[100],
                        tension: 0.2,
                    },
                    {
                        label: 'Visits',
                        data: getData('visits'),
                        yAxisID: 'axisOne',
                        borderColor: theme.colors.blue[200],
                        backgroundColor: theme.colors.blue[100],
                        tension: 0.2,
                    },
                ],
            },
            price: {
                labels: [getDateKeyFormat(membership.startDate), ...months],
                datasets: [
                    {
                        label: 'Remaining Membership',
                        data: decreasingMembership,
                        borderColor: theme.colors.teal[200],
                        backgroundColor: theme.colors.teal[100],
                        tension: 0.2,
                    },
                ],
            },
        };
    }, [visits]);

    const chartOptions: Record<
        MembershipChartType,
        ChartOptions<'line'>
    > = useMemo(() => {
        return chartOptionsConfig;
    }, []);

    const handleCloseModal = () => {
        reset();
        setIsOpen(false);
    };

    useEffect(() => {
        const stats = getAll().statistics;
        if (typeof stats !== 'number') {
            const spent = stats['totalPrice'];

            const remaining = membership.totalCost - spent;
            const totalTickets = stats['totalTickets'];

            const ticketAverage = Math.round(spent / totalTickets);
            const ticketsOutstanding = Math.ceil(remaining / ticketAverage);

            const monthlyStats = getByMonth().statistics;
            const months = Object.keys(monthlyStats);
            const monthlyAverage =
                months.reduce((prev, month) => {
                    prev += monthlyStats[month]!.totalPrice;
                    return prev;
                }, 0) / months.length;

            setAmounts((prev) => ({
                ...prev,
                total: membership.totalCost,
                remaining,
                spent,
                ticketAverage,
                totalTickets,
                ticketsOutstanding,
                monthlyAverage,
            }));
        }
    }, [membership, visits]);

    return (
        <ContainerPage>
            <ContainerScrollBox>
                <Frame id='membership-frame'>
                    <Chakra.Grid
                        gridTemplateColumns={['1fr', '1fr 1fr']}
                        columnGap={32}
                        rowGap={20}
                        w='100%'
                    >
                        <Chakra.GridItem
                            display='flex'
                            flexDirection='column'
                            justifyContent='space-between'
                            gap={56}
                        >
                            <Chart
                                type='line'
                                data={data.ticket}
                                options={chartOptions.ticket}
                            />
                            <Chart
                                type='line'
                                data={data.price}
                                options={chartOptions.price}
                            />
                            <Button onClick={() => setIsOpen(true)}>
                                Update Membership
                            </Button>
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            display='flex'
                            flexDirection='column'
                            gap={20}
                        >
                            <Card colorScheme='white'>
                                <Heading preset='sub-heading'>
                                    Membership Information
                                </Heading>

                                <InformationItem
                                    icon={{
                                        icon: 'membership',
                                        ariaLabel: 'membership',
                                    }}
                                    heading={{ children: 'Membership Type' }}
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
                                    heading={{ children: 'Members' }}
                                    text={membership.members.map(
                                        resolvePersonMap
                                    )}
                                />
                            </Card>

                            <Card colorScheme='white'>
                                <Heading preset='sub-heading'>
                                    Pricing Information
                                </Heading>
                                <InformationItem
                                    icon={{
                                        icon: 'sack',
                                        ariaLabel: 'money bag',
                                    }}
                                    heading={{ children: 'Membership Total' }}
                                    text={`${resolveCurrency('GBP')} ${getAmountInPounds(
                                        amounts.total
                                    )}`}
                                />
                                <InformationItem
                                    icon={{
                                        icon: 'piggy-bank',
                                        ariaLabel: 'piggy bank',
                                    }}
                                    heading={{
                                        children: 'Total Saved',
                                    }}
                                    text={` ${resolveCurrency('GBP')} ${getAmountInPounds(
                                        amounts.spent
                                    )}`}
                                />
                                <InformationItem
                                    icon={{
                                        icon: 'money-report',
                                        ariaLabel: 'money report',
                                    }}
                                    heading={{
                                        children: 'Total Remaining',
                                    }}
                                    text={` ${resolveCurrency('GBP')} ${getAmountInPounds(
                                        amounts.remaining
                                    )}`}
                                />
                                <InformationItem
                                    icon={{
                                        icon: 'money-report',
                                        ariaLabel: 'money report',
                                    }}
                                    heading={{
                                        children: 'Monthly Average',
                                    }}
                                    text={` ${resolveCurrency('GBP')} ${getAmountInPounds(
                                        amounts.monthlyAverage
                                    )}`}
                                />
                            </Card>

                            <Card colorScheme='white'>
                                <Heading preset='sub-heading'>
                                    Ticket Information
                                </Heading>

                                <InformationItem
                                    icon={{
                                        icon: 'users',
                                        ariaLabel: 'users',
                                    }}
                                    heading={{
                                        children: 'Tickets Bought',
                                    }}
                                    text={amounts.totalTickets}
                                />

                                <InformationItem
                                    icon={{
                                        icon: 'ticket',
                                        ariaLabel: 'ticket',
                                        variant: 'outline',
                                    }}
                                    heading={{
                                        children: 'Average Ticket Price',
                                    }}
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
                                    heading={{
                                        children: 'Tickets Outstanding',
                                    }}
                                    text={`${amounts.ticketsOutstanding} tickets left until paid off.`}
                                >
                                    <Chakra.Text>
                                        Based on one person and the calculated
                                        average ticket price.
                                    </Chakra.Text>
                                </InformationItem>
                            </Card>
                        </Chakra.GridItem>
                    </Chakra.Grid>
                </Frame>
            </ContainerScrollBox>
            <Modal
                isOpen={isOpen}
                onClose={() => handleCloseModal()}
                title='Update Membership'
                confirmCTA={{
                    type: 'submit',
                    form: '',
                    children: 'Submit',
                    colorScheme: 'green',
                    isDisabled: !isDirty || !isValid,
                }}
                declineCTA={{
                    colorScheme: 'red',
                }}
            >
                <Chakra.chakra.form id='update-membership-form'>
                    <InputGroup<FormMembership>
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
                    />

                    <Card
                        variant='outline'
                        colorScheme='gray'
                        hasNegativeMargin
                    >
                        <InputGroup<FormMembership>
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
                        />
                        {fields.map((field, index) => {
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
                        })}
                        <Button
                            size='xs'
                            onClick={() =>
                                append({
                                    name: '',
                                })
                            }
                        >
                            Add Another Member
                        </Button>
                    </Card>
                </Chakra.chakra.form>
            </Modal>
        </ContainerPage>
    );
};

type InformationItemProps = {
    icon?: IconProps;
    text: ReactNode;
    heading: HeadingProps;
    children?: Children;
};

const InformationItem = ({
    icon,
    heading,
    text,
    children,
}: InformationItemProps) => {
    return (
        <Chakra.Grid
            columnGap={16}
            rowGap={8}
            alignItems='flex-start'
            gridTemplateColumns={'auto 1fr'}
        >
            <Chakra.GridItem
                display='flex'
                colStart={1}
                alignItems='center'
                h='100%'
            >
                {icon && <Icon {...icon} />}
            </Chakra.GridItem>

            <Chakra.GridItem
                display='flex'
                gap={16}
                alignItems='center'
            >
                <Heading
                    preset='sub-heading'
                    mb={0}
                    {...heading}
                />
                <Chakra.Text>{text}</Chakra.Text>
            </Chakra.GridItem>
            {children && (
                <Chakra.GridItem colStart={2}>{children}</Chakra.GridItem>
            )}
        </Chakra.Grid>
    );
};
