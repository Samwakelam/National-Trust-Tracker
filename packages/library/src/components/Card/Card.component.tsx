import React, { useEffect, useRef, useState } from 'react';

import { PositionType } from '../../types';

import {
    Button,
    ButtonProps,
    Icon,
    IconProps,
    Heading,
    HeadingProps,
    MenuProps,
    Menu,
    TagProps,
    Tag,
} from '..';

import * as Chakra from '@chakra-ui/react';

interface FooterIconProps extends IconProps {
    type: 'Icon';
    id: string;
}

interface FooterTagProps extends TagProps {
    type: 'Tag';
    id: string;
}

export type CardFooterItemProps = FooterIconProps | FooterTagProps;
export type CardFooterItemsProps = CardFooterItemProps[];

export interface CardProps extends Chakra.CardProps {
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    footerItems?: CardFooterItemsProps;
    hasNegativeMargin?: boolean;
    heading?: HeadingProps;
    icon?: IconProps & { position?: PositionType };
    image?: Chakra.ImageProps & { isInset?: boolean };
    layout?: 'horizontal' | 'vertical';
    menu?: MenuProps;
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
    menu,
    size,
    variant = 'elevated',
    footerItems,
    ...props
}: CardProps) => {
    const cardContent = useRef<HTMLDivElement | null>(null);
    const footerContent = useRef<HTMLDivElement | null>(null);

    const styles = Chakra.useMultiStyleConfig('Card', {
        size,
        variant,
        layout,
    });

    const [dimensions, setDimensions] = useState<{
        height: number;
        width: number;
    }>({
        width: 100,
        height: 100,
    });
    const [imagePadding, setImagePadding] = useState<number>(0);
    const [imageProps, setImageProps] = useState<Chakra.ImageProps | undefined>(
        undefined
    );

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

    useEffect(() => {
        if (image) {
            const { isInset, ..._imageProps } = image;
            setImageProps(_imageProps);
        }
        if (image && image.isInset) {
            setImagePadding(16);
        }
        if (!image) {
            setImageProps(undefined);
        }
    }, [image]);

    return (
        <Chakra.Card
            as='article'
            data-label='Card'
            variant={variant}
            mx={hasNegativeMargin ? '-1rem' : 0}
            display='flex'
            flexDirection={layout === 'vertical' ? 'column' : 'row'}
            {...props}
        >
            {imageProps && (
                <Chakra.Image
                    __css={styles.image}
                    width={
                        layout === 'vertical' ? `${dimensions.width}px` : 'auto'
                    }
                    height={
                        layout === 'vertical'
                            ? 'auto'
                            : `${dimensions.height}px`
                    }
                    padding={imagePadding}
                    {...imageProps}
                />
            )}

            <Chakra.Flex
                direction='column'
                ref={cardContent}
                flex='1'
            >
                {(heading || icon) && (
                    <Chakra.CardHeader>
                        <Chakra.Flex>
                            {(icon?.position === 'left' ||
                                (icon && !icon.position)) && <Icon {...icon} />}
                            {heading && (
                                <Heading
                                    mb={0}
                                    {...heading}
                                />
                            )}
                            {icon?.position === 'right' && <Icon {...icon} />}
                        </Chakra.Flex>
                        {menu && (
                            <Menu
                                buttonConfig={{
                                    icon: {
                                        icon: 'menu-dots-v',
                                        ariaLabel: 'menu',
                                    },
                                    variant: 'ghost',
                                }}
                                {...menu}
                            />
                        )}
                    </Chakra.CardHeader>
                )}
                <Chakra.CardBody>{children}</Chakra.CardBody>

                {(declineCTA || confirmCTA || footerItems) && (
                    <Chakra.CardFooter ref={footerContent}>
                        {footerItems && (
                            <Chakra.Flex
                                id='footer-icons'
                                alignItems='center'
                            >
                                {footerItems.map((item) => {
                                    if (item.type === 'Icon') {
                                        return (
                                            <Icon
                                                key={item.id}
                                                {...item}
                                            />
                                        );
                                    }

                                    return (
                                        <Tag
                                            key={item.id}
                                            {...item}
                                        />
                                    );
                                })}
                            </Chakra.Flex>
                        )}
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
                )}
            </Chakra.Flex>
        </Chakra.Card>
    );
};
