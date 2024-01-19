import React from 'react';
import { FieldValues } from 'react-hook-form';

import * as Chakra from '@chakra-ui/react';

import { MultiSwitchProps } from './MultiSwitch.definition';
import { Icon } from '../Icon';

export const MultiSwitch = <T extends FieldValues>({
    errors,
    formRegister,
    name,
    switches,
    groupConfig,
    ...props
}: MultiSwitchProps<T>) => {
    const { register, options } = formRegister;

    const styles = Chakra.useStyleConfig('MultiSwitch', {
        variant: undefined,
        ...props,
    });

    // const [checked, setChecked] = useState<string>();

    return (
        <Chakra.RadioGroup
            __css={styles}
            data-label={`multi-switch-${name}`}
            {...groupConfig}
        >
            {switches.map(({ label, value, switchConfig, icon }) => {
                return (
                    <Chakra.Radio
                        key={`${label ? label : name}-${value}`}
                        {...register(name, options)}
                        id={`${label ? label : value}`}
                        value={value}
                        data-label='radio'
                        isInvalid={!!errors?.[name]}
                        colorScheme='blackAlpha'
                        {...switchConfig}
                    >
                        {icon && <Icon {...icon} />}
                        {label && <>{label}</>}
                        {!icon && !label && <>{value}</>}
                    </Chakra.Radio>
                );
            })}
        </Chakra.RadioGroup>
    );
};
