import React, { ReactElement } from 'react';

import { Button, ButtonProps } from '../Button/Button.component';

export type ButtonType = 'add' | 'cancel' | 'delete' | 'edit' | 'save';

export interface ButtonPresetProps extends ButtonProps {
    preset: ButtonType;
}

export const ButtonPreset = ({
    preset,
    ...props
}: ButtonPresetProps): ReactElement<ButtonPresetProps> => {
    switch (preset) {
        case 'add':
            return (
                <Button
                    colorScheme='blue'
                    icon={{ icon: 'plus', ariaLabel: 'add' }}
                    tooltip={{ label: 'Add', hasArrow: true }}
                    {...props}
                />
            );

        case 'cancel':
            return (
                <Button
                    colorScheme='red'
                    icon={{ icon: 'cross', ariaLabel: 'cancel' }}
                    tooltip={{ label: 'Cancel', hasArrow: true }}
                    {...props}
                />
            );

        case 'delete':
            return (
                <Button
                    colorScheme='red'
                    icon={{ icon: 'bin', ariaLabel: 'delete' }}
                    tooltip={{ label: 'Delete', hasArrow: true }}
                    {...props}
                />
            );

        case 'edit':
            return (
                <Button
                    colorScheme='teal'
                    icon={{ icon: 'pencil', ariaLabel: 'edit' }}
                    tooltip={{ label: 'Edit', hasArrow: true }}
                    {...props}
                />
            );

        case 'save':
            return (
                <Button
                    colorScheme='green'
                    icon={{ icon: 'tick', ariaLabel: 'save' }}
                    tooltip={{ label: 'Save Changes', hasArrow: true }}
                    {...props}
                />
            );
    }
};
