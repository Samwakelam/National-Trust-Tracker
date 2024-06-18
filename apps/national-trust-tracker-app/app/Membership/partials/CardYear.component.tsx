import { Card, Tile } from '../../../library/components';
import { getAmountInPounds } from '../../../library/helpers';

type CardYearProps = {
    year: string | undefined;
    yearSpend: number;
    averageYearSpend: number;
    membershipPrice: number;
    numberOfVisits: number;
};

export const CardYear = ({
    year,
    yearSpend,
    averageYearSpend,
    membershipPrice,
    numberOfVisits,
}: CardYearProps) => {
    console.log('year: ', year);
    return (
        <Card
            colorScheme='white'
            preset='quartered'
            className='w-full'
            heading={year ? year : 'This Year'}
        >
            <Tile
                icon={{
                    icon: 'money',
                    ariaLabel: 'money',
                }}
                heading='Spend'
                description={`£${getAmountInPounds(yearSpend)}`}
                className='h-full'
            />
            <Tile
                icon={{
                    icon: 'money-report',
                    ariaLabel: 'money report',
                }}
                heading='Average Spend'
                description={`£${getAmountInPounds(averageYearSpend)}`}
                className='h-full'
            />
            <Tile
                icon={{
                    icon: 'membership',
                    ariaLabel: 'membership',
                }}
                heading='Annual Membership'
                description={`£${getAmountInPounds(membershipPrice)}`}
                className='h-full'
            />
            <Tile
                icon={{
                    icon: 'ticket',
                    ariaLabel: 'ticket',
                }}
                heading='Number of Visits'
                description={numberOfVisits.toString()}
                className='h-full'
            />
        </Card>
    );
};
