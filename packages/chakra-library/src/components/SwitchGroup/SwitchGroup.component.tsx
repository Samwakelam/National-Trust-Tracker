import React from 'react';
import { FieldValues } from 'react-hook-form';

import { Label } from '../Label';

import { SwitchGroupProps } from './SwitchGroup.definition';

import * as Chakra from '@chakra-ui/react';

export const SwitchGroup = <T extends FieldValues>({
    errors,
    formControlConfig,
    formRegister,
    label,
    labelConfig,
    name,
    switchConfig,
    track,
    thumb,
}: SwitchGroupProps<T>) => {
    const styles = Chakra.useMultiStyleConfig('Switch', { variant: undefined });
    const { colorMode } = Chakra.useColorMode();

    const theme = Chakra.useTheme();
    const colorScheme = switchConfig?.colorScheme || 'gray';
    const { register, options } = formRegister;

    const sx = {
        '--track-color-off': track
            ? resolveChakraColor({ color: track.off, theme })
            : colorMode === 'dark'
              ? theme.colors.white[300]
              : theme.colors.white[100],
        '--track-color-on': track
            ? resolveChakraColor({ color: track!.on, theme })
            : colorMode === 'dark'
              ? theme.colors[colorScheme][500]
              : theme.colors[colorScheme][400],
        '--switch-track-height': theme.space[16],
        '--switch-track-width': theme.space[36],
    };

    return (
        <Chakra.Box
            data-label='SwitchGroup'
            __css={styles.dialog}
        >
            <Chakra.FormControl
                isInvalid={errors[name] ? true : false}
                alignItems='baseline'
                {...formControlConfig}
            >
                {label && (
                    <Label
                        htmlFor={name}
                        label={label}
                        isRequired={false}
                        m={0}
                        hideBadge={true}
                        {...labelConfig}
                    />
                )}

                <Chakra.Switch
                    sx={sx}
                    {...register(name, options)}
                    id={name}
                    size='md'
                    {...switchConfig}
                    data-label='switch'
                />
            </Chakra.FormControl>
        </Chakra.Box>
    );
};

const resolveChakraColor = ({
    color,
    theme,
}: {
    color: string;
    theme: Chakra.StyleFunctionProps['theme'];
}): string => {
    const { colors } = theme;

    const colorParts = color.split('.');

    return colors[colorParts[0]][colorParts[1]];
};
