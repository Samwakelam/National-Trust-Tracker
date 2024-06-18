import { RadioGroupProps, RadioProps, ThemingProps } from '@chakra-ui/react';
import {
    FieldErrors,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import { IconProps } from '../Icon';

export interface MultiSwitchProps<T extends FieldValues> extends ThemingProps {
    errors: FieldErrors<T>;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    name: Path<T>;
    switches: {
        label?: string;
        icon?: IconProps;
        value: string;
        switchConfig?: Omit<RadioProps, 'defaultChecked' | 'isChecked'>;
    }[];
    groupConfig?: Omit<RadioGroupProps, 'children'>;
}
