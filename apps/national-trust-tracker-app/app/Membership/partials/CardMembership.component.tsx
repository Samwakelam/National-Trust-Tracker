import { Card, Tile } from '../../../library/components';
import { getAmountInPounds } from '../../../library/helpers';

type CardMembershipProps = {
    totalPrice: number;
    startDate: string;
    remainingBalance: number;
    numberOfYears: number;
};

export const CardMembership = ({
    totalPrice,
    startDate,
    remainingBalance,
    numberOfYears,
}: CardMembershipProps) => {
    return (
        <Card
            colorScheme='yellow'
            preset='quartered'
            className='w-full'
            heading='Membership'
        >
            <Tile
                icon={{
                    icon: 'money-pound',
                    ariaLabel: 'pound',
                }}
                heading='Total Price'
                description={`£${getAmountInPounds(totalPrice)}`}
                className='h-full'
            />
            <Tile
                icon={{
                    icon: 'membership',
                    ariaLabel: 'membership',
                }}
                heading='Start Date'
                description={startDate}
                className='h-full'
            />
            <Tile
                icon={{
                    icon: 'money-report',
                    ariaLabel: 'money report',
                }}
                heading='Remaining Balance'
                description={`£${getAmountInPounds(remainingBalance)}`}
                className='h-full'
            />
            <Tile
                icon={{
                    icon: 'calendar-event',
                    ariaLabel: 'date',
                }}
                heading='Number of Years'
                description={numberOfYears.toString()}
                className='h-full'
            />
        </Card>
    );
};
