import { Card, Tile } from '../../../library/components';
import { getAmountInPounds } from '../../../library/helpers';

type CardMembershipProps = {
    totalPrice: number;
    projection: number;
    remainingBalance: number;
    savings: number;
};

export const CardMembership = ({
    totalPrice,
    projection,
    remainingBalance,
    savings,
}: CardMembershipProps) => {
    return (
        <Card
            colorScheme='white'
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
                    icon: 'trend-u',
                    ariaLabel: 'trending up',
                }}
                heading='Projection'
                description={`${projection} years`}
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
                    icon: 'money-pig',
                    ariaLabel: 'piggy bank',
                }}
                heading='Total Savings'
                description={`£${getAmountInPounds(savings)}`}
                className='h-full'
            />
        </Card>
    );
};
