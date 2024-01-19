import React, {
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    FieldErrorsImpl,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';

import { Label, LabelProps } from '../Label';

import * as Chakra from '@chakra-ui/react';

export type InputGroupProps<T extends FieldValues> = {
    addOn?: {
        left?: Chakra.InputAddonProps;
        right?: Chakra.InputAddonProps;
    };
    containerConfig?: Chakra.BoxProps;
    element?: {
        left?: Chakra.InputElementProps;
        right?: Chakra.InputElementProps;
    };
    errors: FieldErrorsImpl<T>;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    inputConfig?: Chakra.InputProps;
    label?: LabelProps['label'];
    labelConfig?: Omit<LabelProps, 'isRequired' | 'htmlFor'>;
    name: Path<T>;
};

export const InputGroup = <T extends FieldValues>({
    addOn,
    containerConfig,
    element,
    errors,
    formRegister,
    inputConfig,
    label,
    labelConfig = { hideBadge: false },
    name,
}: InputGroupProps<T>): ReactElement<InputGroupProps<T>> => {
    const styles = Chakra.useMultiStyleConfig('Input', { variant: undefined });
    const { register, options } = formRegister;

    const leftElementRef = useRef<HTMLElement>(null);
    const rightElementRef = useRef<HTMLElement>(null);
    const leftAddonRef = useRef<HTMLElement>(null);
    const rightAddonRef = useRef<HTMLElement>(null);

    const [padding, setPadding] = useState<{
        left: number | 16;
        right: number | 16;
    }>({
        left: 16,
        right: 16,
    });

    // const [position, setPosition] = useState<{
    //     left: number;
    //     right: number;
    // }>({
    //     left: 5,
    //     right: 5,
    // });

    const isRequired: boolean = options?.required ? true : false;
    const requiredErrorMessage =
        typeof options?.required !== 'string' ? options?.required : undefined;

    useEffect(() => {
        const left = leftElementRef.current?.getBoundingClientRect();
        const leftPadding = left ? left.width + 16 : 16;

        const right = rightElementRef.current?.getBoundingClientRect();
        const rightPadding = right ? right.width + 16 : 16;

        setPadding((prev) => ({
            left: leftPadding,
            right: rightPadding,
        }));
    }, [element]);

    // useEffect(() => {
    //     const left = leftAddonRef.current?.getBoundingClientRect();
    //     const leftValue = left ? Math.ceil(left.width) + 5 : 5;

    //     const right = rightAddonRef.current?.getBoundingClientRect();
    //     const rightValue = right ? Math.ceil(right.width) + 5 : 5;

    //     setPosition((prev) => ({
    //         left: leftValue,
    //         right: rightValue,
    //     }));
    // }, [addOn]);

    const sx = {
        '--padding-left': `${padding.left}px`,
        '--padding-right': `${padding.right}px`,
    };

    return (
        <Chakra.Box
            __css={{ ...styles.container, ...sx }}
            flex={1}
            mb='1.5rem'
            data-label='InputGroup'
            w='100%'
            {...containerConfig}
        >
            <Chakra.FormControl isInvalid={errors[name] ? true : false}>
                <Label
                    htmlFor={name}
                    label={label}
                    isRequired={isRequired}
                    {...labelConfig}
                />
                <Chakra.InputGroup>
                    {addOn?.left && (
                        <Chakra.InputLeftAddon
                            {...addOn.left}
                            ref={leftAddonRef}
                        />
                    )}

                    {element?.left && (
                        <Chakra.InputLeftElement
                            {...element.left}
                            ref={leftElementRef}
                        />
                    )}
                    <Chakra.Input
                        {...register(name, options)}
                        id={name}
                        isRequired={isRequired}
                        {...inputConfig}
                    />
                    {element?.right && (
                        <Chakra.InputRightElement
                            {...element.right}
                            ref={rightElementRef}
                        />
                    )}

                    {addOn?.right && (
                        <Chakra.InputRightAddon
                            {...addOn.right}
                            ref={rightAddonRef}
                        />
                    )}
                </Chakra.InputGroup>

                <Chakra.FormErrorMessage>
                    {errors[name]?.message as ReactNode}
                    {requiredErrorMessage &&
                        (requiredErrorMessage as ReactNode)}
                </Chakra.FormErrorMessage>
            </Chakra.FormControl>
        </Chakra.Box>
    );
};
