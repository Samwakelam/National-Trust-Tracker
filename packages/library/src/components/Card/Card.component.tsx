import React, { useEffect, useRef, useState } from 'react';

import { PositionType } from '../../types';

import {
    Button,
    ButtonProps,
    Icon,
    IconProps,
    Heading,
    HeadingProps,
} from '..';

import * as Chakra from '@chakra-ui/react';

export interface CardProps extends Chakra.CardProps {
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    hasNegativeMargin?: boolean;
    heading?: HeadingProps;
    icon?: IconProps & { position?: PositionType };
    image?: Chakra.ImageProps;
    layout?: 'horizontal' | 'vertical';
}

export const Card = ({
    children,
    confirmCTA,
    declineCTA,
    hasNegativeMargin,
    heading,
    icon,
    image,
    layout = 'vertical',
    size,
    variant = 'elevated',
    ...props
}: CardProps) => {
    const cardContent = useRef<HTMLDivElement | null>(null);
    const footerContent = useRef<HTMLDivElement | null>(null);

    const styles = Chakra.useMultiStyleConfig('Card', { size, variant });

    const [dimensions, setDimensions] = useState<{
        height: number;
        width: number;
    }>({
        width: 100,
        height: 100,
    });

    useEffect(() => {
        if (cardContent.current && !footerContent.current) {
            setDimensions((prev) => ({
                ...prev,
                height: cardContent.current!.clientHeight,
                width: cardContent.current!.clientWidth,
            }));
        }

        if (cardContent.current && footerContent.current) {
            setDimensions((prev) => ({
                ...prev,
                height: cardContent.current!.clientHeight,
                width:
                    footerContent.current!.clientWidth >
                    cardContent.current!.clientWidth
                        ? footerContent.current!.clientWidth
                        : cardContent.current!.clientWidth,
            }));
        }
    }, [cardContent, footerContent, heading, icon]);

    return (
        <Chakra.Card
            as='section'
            data-label='Card'
            variant={variant}
            mx={hasNegativeMargin ? '-1rem' : 0}
            display='flex'
            flexDirection='column'
            {...props}
        >
            <Chakra.Flex
                direction={layout === 'vertical' ? 'column' : 'row'}
                height='100%'
            >
                {image && (
                    <Chakra.Image
                        __css={styles.image}
                        fit='cover'
                        width={
                            layout === 'vertical'
                                ? `${dimensions.width}px`
                                : 'auto'
                        }
                        height={
                            layout === 'vertical'
                                ? 'auto'
                                : `${dimensions.height}px`
                        }
                        borderRadius={
                            layout === 'vertical'
                                ? '0.375rem 0.375rem 0 0'
                                : declineCTA || confirmCTA
                                ? '0.375rem 0 0 0'
                                : '0.375rem 0 0 0.375rem'
                        }
                        {...image}
                    />
                )}
                <Chakra.Flex
                    direction='column'
                    height='100%'
                    ref={cardContent}
                >
                    {(heading || icon) && (
                        <Chakra.CardHeader>
                            {(icon?.position === 'left' ||
                                (icon && !icon.position)) && <Icon {...icon} />}
                            {heading && <Heading {...heading} />}
                            {icon?.position === 'right' && <Icon {...icon} />}
                        </Chakra.CardHeader>
                    )}
                    <Chakra.CardBody
                        display='flex'
                        flexDirection='column'
                        gap={16}
                    >
                        {children}
                    </Chakra.CardBody>
                </Chakra.Flex>
            </Chakra.Flex>
            {(declineCTA || confirmCTA) && (
                <Chakra.Box ref={footerContent}>
                    <Chakra.Divider />
                    <Chakra.CardFooter>
                        {declineCTA && (
                            <Button
                                variant='outline'
                                children='Cancel'
                                {...declineCTA}
                            />
                        )}
                        {confirmCTA && (
                            <Button
                                variant='solid'
                                colorScheme='facebook'
                                {...confirmCTA}
                            />
                        )}
                    </Chakra.CardFooter>
                </Chakra.Box>
            )}
        </Chakra.Card>
    );
};
