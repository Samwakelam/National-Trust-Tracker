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

import { Button, ButtonProps } from '../Button';
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
    const styles = Chakra.useMultiStyleConfig('Input', {
        variant: undefined,
    });

    const { register, options } = formRegister;

    const leftElementRef = useRef<HTMLElement>(null);
    const rightElementRef = useRef<HTMLElement>(null);

    const [padding, setPadding] = useState<{
        left: number;
        right: number;
    }>({
        left: 16,
        right: 16,
    });

    const isRequired: boolean = options?.required ? true : false;
    const requiredErrorMessage =
        typeof options?.required !== 'string' ? options?.required : undefined;

    useEffect(() => {
        let leftPadding = padding.left;
        let rightPadding = padding.right;

        if (element && element.left) {
            const left = leftElementRef.current?.getBoundingClientRect();
            leftPadding = left ? left.width + 16 : 16;
        }

        if (element && element.right) {
            const right = rightElementRef.current?.getBoundingClientRect();
            rightPadding = right ? right.width + 16 : 16;
        }

        setPadding((prev) => ({
            ...prev,
            left: leftPadding,
            right: rightPadding,
        }));
    }, [element]);

    return (
        <Chakra.Box
            __css={styles.container}
            flex={1}
            mb='1.5rem'
            data-label='InputGroup'
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
                    {addOn?.left && <Chakra.InputLeftAddon {...addOn.left} />}

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
                        pl={`${padding.left}px`}
                        pr={`${padding.right}px`}
                        {...inputConfig}
                    />
                    {element?.right && (
                        <Chakra.InputRightElement
                            {...element.right}
                            ref={rightElementRef}
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
