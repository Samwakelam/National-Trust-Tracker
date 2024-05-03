import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import {
    FieldErrors,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';

import { twMerge } from '../../../utilities/twMerge.util';

import { Label, LabelProps } from '../Label';
import { TextareaStyles, textareaStyles } from './TextareaGroup.styles';

// MARK: Types

export interface TextareaGroupProps<T extends FieldValues>
    extends TextareaStyles {
    errors: FieldErrors<T>;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    name: Path<T>;
    isDisabled?: boolean;
    label?: LabelProps['label'];
    labelConfig?: Omit<LabelProps, 'isRequired' | 'htmlFor'>;
}

// MARK: Input Group

export const TextareaGroup = <T extends FieldValues>({
    colorScheme,
    divergent,
    errors,
    formRegister,
    isDisabled,
    label,
    labelConfig = { hideBadge: false },
    name,
}: TextareaGroupProps<T>): ReactElement<TextareaGroupProps<T>> => {
    const { register, options } = formRegister;

    const [hasError, setHasError] = useState<boolean>(false);
    const [hasFocus, setHasFocus] = useState<boolean>(false);

    const styles = textareaStyles({
        colorScheme,
        divergent,
        className: twMerge(hasError && 'border-b-red-400'),
    });

    const isRequired: boolean = options?.required ? true : false;
    const requiredErrorMessage =
        typeof options?.required !== 'string' ? options?.required : undefined;

    // MARK: Effects

    useEffect(() => {
        setHasError(!!errors[name]);
    }, [errors]);

    // MARK: Return

    return (
        <div
            data-label='textarea-group'
            className='mb-24 flex-1 w-full'
        >
            <Label
                htmlFor={name}
                label={label}
                className='mb-4'
                isRequired={isRequired}
                {...labelConfig}
            />
            <div
                data-label='wrapper'
                className='flex flex-row w-full'
            >
                <textarea
                    data-label='textarea'
                    className={twMerge(styles)}
                    {...register(name, options)}
                    disabled={isDisabled}
                    id={name}
                    onBlur={() => setHasFocus(false)}
                    onFocus={() => setHasFocus(true)}
                    placeholder='Placeholder'
                    required={isRequired}
                />
            </div>
            <p
                data-label='message'
                className='text-red-400'
            >
                {errors[name]?.message as ReactNode}
                {requiredErrorMessage && (requiredErrorMessage as ReactNode)}
            </p>
        </div>
    );
};
