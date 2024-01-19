import {
    FieldErrorsImpl,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import React, { ReactNode } from 'react';

import { Label, LabelProps } from '../Label';

import * as Chakra from '@chakra-ui/react';

export type TextareaGroupProps<T extends FieldValues> = {
    errors: FieldErrorsImpl<T>;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    label?: LabelProps['label'];
    labelConfig?: Omit<LabelProps, 'isRequired' | 'htmlFor'>;
    name: Path<T>;
    textAreaConfig?: Chakra.TextareaProps;
};

const [StylesProvider, useStyles] = Chakra.createStylesContext('Textarea');

const TextareaGroupComponent = <T extends FieldValues>({
    errors,
    formRegister,
    label,
    labelConfig = { hideBadge: false },
    name,
    textAreaConfig,
}: TextareaGroupProps<T>) => {
    const styles = useStyles();
    const { register, options } = formRegister;

    const isRequired: boolean = options?.required ? true : false;
    const requiredErrorMessage =
        typeof options?.required !== 'string' ? options?.required : undefined;

    return (
        <Chakra.Box
            __css={styles.container}
            data-label='text-area-group'
        >
            <Chakra.FormControl
                isInvalid={errors[name] ? true : false}
                height='100%'
            >
                {(isRequired || label) && (
                    <Label
                        htmlFor={name}
                        label={label}
                        isRequired={isRequired}
                        {...labelConfig}
                    />
                )}
                <Chakra.Textarea
                    sx={styles.field}
                    {...register(name, options)}
                    id={name}
                    isRequired={isRequired}
                    {...textAreaConfig}
                />

                <Chakra.FormErrorMessage>
                    {errors[name]?.message as ReactNode}
                    {requiredErrorMessage &&
                        (requiredErrorMessage as ReactNode)}
                </Chakra.FormErrorMessage>
            </Chakra.FormControl>
        </Chakra.Box>
    );
};

export const TextareaGroup = <T extends FieldValues>(
    props: TextareaGroupProps<T>
) => {
    const styles = Chakra.useMultiStyleConfig('Textarea');

    return (
        <StylesProvider value={styles}>
            <TextareaGroupComponent {...props} />
        </StylesProvider>
    );
};
