'use client';

import React from 'react';

import { Label, LabelProps } from './Label.component';
import { useFixtureInput } from 'react-cosmos/client';

const LabelFixture = () => {
    const [hasInfoTooltip] = useFixtureInput<boolean>(
        'Has Informational Tooltip',
        false
    );
    const info: Exclude<LabelProps['tooltips'], undefined>[number] = {
        label: 'Tooltip',
        status: 'info',
        position: 'bottom',
    };

    const [hasWarningTooltip] = useFixtureInput<boolean>(
        'Has Warning Tooltip',
        false
    );
    const warning: Exclude<LabelProps['tooltips'], undefined>[number] = {
        label: 'Tooltip',
        status: 'warning',
        position: 'bottom',
    };

    const [isRequired] = useFixtureInput<boolean>('Is Required', false);

    return (
        <div className='p-16'>
            <Label
                htmlFor=''
                isRequired={isRequired}
                label='Label'
                tooltips={
                    hasWarningTooltip || hasInfoTooltip
                        ? [
                              ...(hasInfoTooltip ? [info] : []),
                              ...(hasWarningTooltip ? [warning] : []),
                          ]
                        : undefined
                }
            />
        </div>
    );
};

export default LabelFixture;
