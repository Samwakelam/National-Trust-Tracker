import React, { ReactElement } from 'react';
import {
    FieldErrorsImpl,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';

import { Label, LabelProps } from '..';

import * as Chakra from '@chakra-ui/react';

export type CheckboxProps<T extends FieldValues> = {
    checkboxConfig?: Chakra.CheckboxProps & { form?: string };
    errors: FieldErrorsImpl<T>;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    label?: LabelProps['label'];
    labelConfig?: Omit<LabelProps, 'isRequired' | 'htmlFor'>;
    name: Path<T>;
};

export const CheckboxGroup = <T extends FieldValues>({
    checkboxConfig,
    errors,
    formRegister,
    label,
    labelConfig = { hideBadge: false },
    name,
}: CheckboxProps<T>): ReactElement<CheckboxProps<T>> => {
    const { register, options } = formRegister;

    const isRequired: boolean = options?.required ? true : false;

    return (
        <Chakra.Checkbox
            data-label='checkbox'
            isInvalid={errors[name] ? true : false}
            {...register(name, options)}
            id={name}
            {...checkboxConfig}
        >
            <Label
                htmlFor={name}
                label={label}
                isRequired={isRequired}
                {...labelConfig}
            />
        </Chakra.Checkbox>
    );
};
