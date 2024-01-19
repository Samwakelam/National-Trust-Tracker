import React, { ReactElement } from 'react';

import { Icon } from '..';

import * as Chakra from '@chakra-ui/react';

export interface LabelProps extends Chakra.FormLabelProps {
    addBadge?: Chakra.BadgeProps[];
    display?: 'stack' | 'linear';
    hideBadge?: boolean;
    htmlFor: string;
    isRequired: boolean;
    label?: string;
    tooltip?: Omit<Chakra.TooltipProps, 'children'>;
}

const [StylesProvider, useStyles] = Chakra.createStylesContext('Label');

const LabelComponent = ({
    addBadge,
    display = 'linear',
    hideBadge,
    htmlFor,
    isRequired,
    label,
    tooltip,
    ...props
}: LabelProps): ReactElement<LabelProps> => {
    const styles = useStyles();

    return (
        <Chakra.Grid
            templateColumns='auto'
            templateRows='auto'
            columnGap='0.5rem'
            width='fit-content'
        >
            <Chakra.GridItem
                rowStart={1}
                colSpan={display === 'linear' ? 1 : 20}
            >
                <Chakra.FormLabel
                    __css={styles.label}
                    htmlFor={htmlFor}
                    {...props}
                    data-label='Label'
                >
                    {label}
                </Chakra.FormLabel>
            </Chakra.GridItem>
            {!hideBadge && (
                <Chakra.GridItem rowStart={display === 'linear' ? 1 : 2}>
                    <Chakra.Badge
                        __css={styles.badge}
                        fontSize='x-small'
                        colorScheme={isRequired ? 'red' : 'blue'}
                        variant='subtle'
                    >
                        {isRequired ? 'Required' : 'Optional'}
                    </Chakra.Badge>
                </Chakra.GridItem>
            )}
            {addBadge && (
                <Chakra.GridItem rowStart={display === 'linear' ? 1 : 2}>
                    {addBadge.map((badge) => {
                        return (
                            <Chakra.Badge
                                __css={styles.badge}
                                fontSize='x-small'
                                variant='subtle'
                                {...badge}
                            />
                        );
                    })}
                </Chakra.GridItem>
            )}
            {tooltip && (
                <Chakra.GridItem
                    display='flex'
                    rowStart={display === 'linear' || hideBadge ? 1 : 2}
                >
                    <Chakra.Tooltip
                        __css={styles.tooltip}
                        {...tooltip}
                    >
                        <Chakra.chakra.span transform='translateY(2px)'>
                            <Icon
                                __css={styles.icon}
                                icon='circle-info'
                                color='#365070'
                                ariaLabel='extra information'
                            />
                        </Chakra.chakra.span>
                    </Chakra.Tooltip>
                </Chakra.GridItem>
            )}
        </Chakra.Grid>
    );
};

export const Label = (props: LabelProps) => {
    const styles = Chakra.useMultiStyleConfig('Label');

    return (
        <StylesProvider value={styles}>
            <LabelComponent {...props} />
        </StylesProvider>
    );
};
