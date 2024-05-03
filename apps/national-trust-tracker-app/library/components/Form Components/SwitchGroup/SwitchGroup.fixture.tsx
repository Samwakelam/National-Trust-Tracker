'use client';

import { useForm } from 'react-hook-form';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';

import { SwitchGroup, SwitchGroupProps } from './SwitchGroup.component';
import { colorScheme } from '../../../utilities/colorScheme.util';
import { accentColor } from '../../../utilities/accentColor.util';

const divergents: Exclude<
    SwitchGroupProps<any>['divergent'],
    null | undefined
>[] = ['dual', 'single'];

export const SwitchGroupFixture = () => {
    const {
        register,
        formState: { errors },
    } = useForm<any>();

    const [accent] = useFixtureSelect('Accent Color', {
        options: Object.keys(accentColor),
        defaultValue: 'slate',
    });

    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

    const [isDisabled] = useFixtureInput<boolean>('Is Disabled', false);

    const [required] = useFixtureInput<boolean>('Is Required', false);

    return (
        <div className='p-16 flex fle-col gap-24'>
            {divergents.map((divergent) => {
                return (
                    <div className='flex flex-col gap-16 items-center'>
                        <h2 className='font-bold text-16 capitalize'>
                            {divergent}
                        </h2>
                        <SwitchGroup<any>
                            key={`switch-${divergent}`}
                            name='Name'
                            formRegister={{
                                register,
                                options: { required },
                            }}
                            errors={errors}
                            divergent={divergent}
                            colorScheme={
                                colors as SwitchGroupProps<any>['colorScheme']
                            }
                            isDisabled={isDisabled}
                            accentColor={
                                divergent === 'dual'
                                    ? (accent as SwitchGroupProps<any>['accentColor'])
                                    : undefined
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default SwitchGroupFixture;
