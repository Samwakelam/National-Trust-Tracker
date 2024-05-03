import React, { useEffect, useRef, useState } from 'react';
import {
    FieldErrors,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';

import { twMerge } from '../../../utilities/twMerge.util';

import { Label, LabelProps } from '../Label';

import { SwitchStyles, switchStyles } from './SwitchGroup.styles';

export interface SwitchGroupProps<T extends FieldValues> extends SwitchStyles {
    errors: FieldErrors<T>;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    isDisabled?: boolean;
    name: Path<T>;
    label?: LabelProps['label'];
    labelConfig?: Omit<LabelProps, 'isRequired' | 'htmlFor'>;
}

export const SwitchGroup = <T extends FieldValues>({
    accentColor,
    colorScheme,
    divergent,
    errors,
    formRegister,
    isDisabled,
    label,
    labelConfig,
    name,
}: SwitchGroupProps<T>) => {
    const { register, options } = formRegister;
    
    const styles = switchStyles({ accentColor, colorScheme, divergent });


    return (
        <div
            data-label='switch-group'
            className='flex flex-row gap-8'
        >
            <input
                {...register(name, options)}
                id={name}
                type='checkbox'
                disabled={isDisabled}
                data-label='switch'
                className={twMerge(styles)}
            />

            <Label
                htmlFor={name}
                label={label}
                isRequired={false}
                className=''
                hideBadge={true}
                {...labelConfig}
            />
        </div>
    );
};
