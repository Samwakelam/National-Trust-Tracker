import { Card, Tile } from '../../../library/components';
import { getAmountInPounds } from '../../../library/helpers';
import { getDateKeyFormat } from '../../../library/helpers/getDateKeyFormat.helper';

type CardMonthProps = {
    month: string;
    monthSpend: number;
    averageMonthSpend: number;
    averageVisits: number;
    numberOfVisits: number;
};

export const CardMonth = ({
    month,
    monthSpend,
    averageMonthSpend,
    averageVisits,
    numberOfVisits,
}: CardMonthProps) => {
    const thisMonth = getDateKeyFormat(new Date());

    return (
        <Card
            colorScheme='white'
            preset='quartered'
            className='w-full'
            heading={month && month !== thisMonth ? month : `This Month`}
        >
            <Tile
                icon={{
                    icon: 'money',
                    ariaLabel: 'money',
                }}
                heading='Spend'
                description={`£${getAmountInPounds(monthSpend)}`}
                className='h-full'
            />
            <Tile
                icon={{
                    icon: 'money-report',
                    ariaLabel: 'money report',
                }}
                heading='Average Spend'
                description={`£${getAmountInPounds(averageMonthSpend)}`}
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
            <Tile
                icon={{
                    icon: 'ticket',
                    ariaLabel: 'ticket',
                    variant: 'outline',
                }}
                heading='Average Visits'
                description={averageVisits.toString()}
                className='h-full'
            />
        </Card>
    );
};
