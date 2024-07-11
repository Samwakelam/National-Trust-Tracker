'use client';

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

import {
    AddonStyles,
    ElementStyles,
    InputStyles,
    addonStyles,
    elementStyles,
    inputStyles,
} from './InputGroup.styles';

// MARK: Types

interface ElementProps extends ElementStyles {
    children: ReactElement;
}

interface AddonProps extends AddonStyles {
    children: ReactNode;
}

export interface InputGroupProps<T extends FieldValues> extends InputStyles {
    addon?: {
        left?: Pick<AddonProps, 'children'>;
        right?: Pick<AddonProps, 'children'>;
    };
    element?: {
        left?: Pick<ElementProps, 'children'>;
        right?: Pick<ElementProps, 'children'>;
    };
    errors: FieldErrors<T>;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    isDisabled?: boolean;
    label?: LabelProps['label'];
    labelConfig?: Omit<LabelProps, 'isRequired' | 'htmlFor'>;
    name: Path<T>;
    placeholder?: string;
    step?: React.InputHTMLAttributes<HTMLInputElement>['step'];
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
}

// MARK: Input Group

export const InputGroup = <T extends FieldValues>({
    addon,
    colorScheme,
    divergent,
    element,
    errors,
    formRegister,
    isDisabled,
    label,
    labelConfig = { hideBadge: false },
    name,
    placeholder,
    step,
    type = 'text',
}: InputGroupProps<T>): ReactElement<InputGroupProps<T>> => {
    const { register, options } = formRegister;

    const [hasError, setHasError] = useState<boolean>(false);
    const [hasFocus, setHasFocus] = useState<boolean>(false);

    const styles = inputStyles({
        colorScheme,
        divergent,
        className: twMerge(
            hasError && 'border-b-red-400',
            !!element?.right && 'border-r-0',
            !!element?.left && 'border-l-0'
        ),
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
            data-label='input-group'
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
                className='flex flex-row'
            >
                {addon?.left && (
                    <Addon
                        colorScheme={colorScheme}
                        divergent={divergent}
                        disabled={isDisabled}
                        placement='left'
                        {...addon.left}
                    />
                )}

                {element?.left && (
                    <Element
                        colorScheme={colorScheme}
                        divergent={divergent}
                        hasError={hasError}
                        hasFocus={hasFocus}
                        disabled={isDisabled}
                        placement='left'
                        {...element.left}
                    />
                )}
                <input
                    data-label='input'
                    className={twMerge(styles)}
                    {...register(name, options)}
                    disabled={isDisabled}
                    id={name}
                    onBlur={() => setHasFocus(false)}
                    onFocus={() => setHasFocus(true)}
                    placeholder={placeholder}
                    required={isRequired}
                    type={type}
                    step={step}
                />
                {element?.right && (
                    <Element
                        colorScheme={colorScheme}
                        divergent={divergent}
                        hasError={hasError}
                        hasFocus={hasFocus}
                        disabled={isDisabled}
                        placement='right'
                        {...element.right}
                    />
                )}

                {addon?.right && (
                    <Addon
                        colorScheme={colorScheme}
                        divergent={divergent}
                        placement='right'
                        disabled={isDisabled}
                        {...addon.right}
                    />
                )}
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

// MARK: Addon

const Addon = ({
    divergent,
    placement,
    colorScheme,
    children,
    disabled,
}: AddonProps) => {
    const styles = addonStyles({
        divergent,
        colorScheme,
        placement,
        disabled,
    });

    return (
        <div
            data-label='addon'
            className={twMerge(styles)}
        >
            <p>{children}</p>
        </div>
    );
};

// MARK: Element

const Element = ({
    divergent,
    placement,
    colorScheme,
    hasFocus,
    hasError,
    children,
    disabled,
}: ElementProps) => {
    const styles = elementStyles({
        divergent,
        placement,
        colorScheme,
        hasFocus,
        hasError,
        disabled,
    });

    return (
        <div
            data-label='element'
            className={twMerge(styles)}
        >
            {children}
        </div>
    );
};
