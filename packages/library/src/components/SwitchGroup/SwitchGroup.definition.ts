import {
    FieldErrorsImpl,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';

import { LabelProps } from '../Label';

import * as Chakra from '@chakra-ui/react';

export type CheckedProps = {
    on: string;
    off: string;
};

export type SwitchConfigProps = Chakra.SwitchProps;

export interface SwitchGroupProps<T extends FieldValues>
    extends Omit<LabelProps, 'isRequired' | 'htmlFor' | 'hideBadge'> {
    errors: FieldErrorsImpl<T>;
    formControlConfig?: Chakra.FormControlProps;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    label?: LabelProps['label'];
    labelConfig?: Omit<LabelProps, 'isRequired' | 'htmlFor' | 'hideBadge'>;
    name: Path<T>;
    switchConfig?: SwitchConfigProps;
    thumb?: CheckedProps;
    track?: CheckedProps;
}
