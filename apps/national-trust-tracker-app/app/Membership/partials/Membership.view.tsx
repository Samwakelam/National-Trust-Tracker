'use client';

import { useEffect, useState } from 'react';
// import { useFieldArray, useForm } from 'react-hook-form';
// import { ChartData, ChartOptions } from 'chart.js';

import { useVisits } from '../../../library/context/Visits.context';
import { Bar, Button, Card, Frame, Icon } from '../../../library/components';

import { MembershipViewProps } from './Membership.definitions';

import '../../../library/prototypes/String.extensions';
import { Carousel } from '../../../library/components/Carousel/Carousel.component';
import { CardMembership } from './CardMembership.component';
import { CardMonth } from './CardMonth.component';
import { CardYear } from './CardYear.component';
import { ReduceMapProps } from '../../../library/context/Visits.helpers';
import { getDateKeyFormat } from '../../../library/helpers/getDateKeyFormat.helper';
import { getAmountInPounds } from '../../../library/helpers';

// MARK: Component

export const MembershipView = ({ membership }: MembershipViewProps) => {
    const { getStatistics } = useVisits();

    // MARK: State

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [amounts, setAmounts] = useState<{
        balance: number;
        monthSpend: number;
        monthAverageSpend: number;
        monthVisits: number;
        monthAverageVisits: number;
        yearSpend: number;
        yearAverageSpend: number;
        yearMembershipPrice: number;
        yearVisits: number;
        totalYears: number;
        totalSpend: number;
    }>({
        balance: 0,
        monthAverageSpend: 0,
        monthAverageVisits: 0,
        monthSpend: 0,
        monthVisits: 0,
        yearAverageSpend: 0,
        yearMembershipPrice: 0,
        yearSpend: 0,
        yearVisits: 0,
        totalYears: 0,
        totalSpend: 0,
    });

    // MARK: Effects

    useEffect(() => {
        const allStats = getStatistics() as ReduceMapProps;

        const monthStats = getStatistics({ specificity: 'month' }) as Record<
            string,
            ReduceMapProps
        >;
        const thisMonth = monthStats[getDateKeyFormat(new Date())];

        const yearStats = getStatistics({ specificity: 'year' }) as Record<
            string,
            ReduceMapProps
        >;
        const thisYear = yearStats[new Date().getFullYear()];

        const numberOfMonths = Object.keys(monthStats).length;
        const numberOfYears =
            new Date().getFullYear() -
            new Date(membership.startDate).getFullYear();

        setAmounts((prev) => ({
            ...prev,
            balance: membership.totalCost - allStats.totalPrice,
            monthSpend: thisMonth?.totalPrice || 0,
            monthVisits: thisMonth?.visits || 0,
            yearSpend: thisYear?.totalPrice || 0,
            yearVisits: thisYear?.visits || 0,
            monthAverageSpend: thisYear
                ? thisYear.totalPrice / numberOfMonths
                : 0,
            monthAverageVisits: thisYear ? thisYear.visits / numberOfMonths : 0,
            yearAverageSpend: allStats.totalPrice / numberOfYears,
            yearMembershipPrice: 0,
            totalYears: numberOfYears,
            totalSpend: allStats.totalPrice,
        }));
    }, [membership]);

    // MARK: Return

    return (
        <div className='flex flex-col bg-pink-200'>
            <Frame id='membership-frame'>
                <Card
                    divergent='solidOutline'
                    className='w-full'
                    detail={
                        <h3 className='font-semibold'>
                            Membership: {membership.groupName}
                        </h3>
                    }
                >
                    <div className='flex flex-row w-full justify-between gap-16 p-16'>
                        <ul className='rounded-8 '>
                            {membership.members.map((member) => (
                                <li key={`members-${member.name}`}>
                                    {member.name}
                                </li>
                            ))}
                        </ul>
                        <div className='rounded-8'>
                            <div className='flex flex-row gap-8 items-center'>
                                <Icon
                                    icon='clock'
                                    ariaLabel='clock'
                                />
                                <p>Number of Years</p>
                                <p>{amounts.totalYears}</p>
                            </div>
                            <div className='flex flex-row gap-8 items-center'>
                                <Icon
                                    icon='money-pig'
                                    ariaLabel='savings'
                                />
                                <p>Total savings</p>
                                <p>£{getAmountInPounds(amounts.totalSpend)}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </Frame>
            <Frame
                id='membership-carousel-frame'
                colorScheme='blue'
            >
                <Carousel
                    visibleSlides={3}
                    isFullWidth
                >
                    <CardMembership
                        numberOfYears={amounts.totalYears}
                        remainingBalance={amounts.balance}
                        startDate={membership.startDate}
                        totalPrice={membership.totalCost}
                    />
                    <CardMonth
                        averageMonthSpend={amounts.monthAverageSpend}
                        averageVisits={amounts.monthAverageVisits}
                        numberOfVisits={amounts.monthVisits}
                        monthSpend={amounts.monthSpend}
                    />
                    <CardYear
                        averageYearSpend={amounts.yearAverageSpend}
                        yearSpend={amounts.yearSpend}
                        membershipPrice={amounts.yearMembershipPrice}
                        numberOfVisits={amounts.yearVisits}
                    />
                </Carousel>
            </Frame>
            <Frame id='membership-heat-map-frame'>
                <div className='rounded-8 bg-white-300 h-208 w-full'></div>
            </Frame>
            <Bar
                colorScheme='amber'
                className='sticky bottom-0 min-h-unset'
            >
                <Button>2020</Button>
                <Button>2021</Button>
                <Button>2022</Button>
            </Bar>
        </div>
    );
};
