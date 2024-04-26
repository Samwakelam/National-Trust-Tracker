'use client';

import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import { Button } from '../Button';
import { Tooltip, TooltipProps } from './Tooltip.component';

const positions: Exclude<TooltipProps['position'], undefined | null>[] = [
    'bottom',
    'left',
    'right',
    'top',
];

const TooltipFixture = () => {
    const [alwaysOpen] = useFixtureInput<boolean>('Always Open', false);

    const [position] = useFixtureSelect('Position', {
        options: positions,
        defaultValue: 'top',
    });

    const [hasArrow] = useFixtureInput<boolean>('Has Arrow', true);

    const [label] = useFixtureInput<string>('Label', 'Tooltip');

    return (
        <div className='flex flex-row justify-center items-center h-full'>
            <Tooltip
                label={label}
                position={position}
                hasArrow={hasArrow}
                alwaysOpen={alwaysOpen}
            >
                <Button>Hover Over Me</Button>
            </Tooltip>
        </div>
    );
};

export default TooltipFixture;
