'use client';

import React from 'react';

import { Label, LabelProps } from './Label.component';
import { useFixtureInput } from 'react-cosmos/client';

const LabelFixture = () => {
    const [hasInfoTooltip] = useFixtureInput<boolean>(
        'has Informational Tooltip',
        false
    );
    const info: Exclude<LabelProps['tooltips'], undefined>[number] = {
        label: 'Tooltip',
        status: 'info',
        position: 'bottom',
    };

    const [hasWarningTooltip] = useFixtureInput<boolean>(
        'has Warning Tooltip',
        false
    );
    const warning: Exclude<LabelProps['tooltips'], undefined>[number] = {
        label: 'Tooltip',
        status: 'warning',
        position: 'bottom',
    };

    return (
        <div className='p-16'>
            <Label
                htmlFor=''
                isRequired={false}
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
