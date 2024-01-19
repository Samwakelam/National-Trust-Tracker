import React, {
    Children,
    Fragment,
    isValidElement,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { To, useNavigate } from 'react-router-dom';

import {
    Button,
    ButtonProps,
    Frame,
    FrameProps,
    Menu,
    MenuItemProps,
} from '..';

import * as Chakra from '@chakra-ui/react';

// Note: code has a ternary that appears to call the same function with the same prop. This is a Typescript work around as navigate() has the option of two function types which do not overlap. We have to tell typescript if it is using (delta: number): void or (to: To, options?: NavigateOptions): void.

export interface ControlsBannerProps extends FrameProps {
    slug?: To | number;
}

export const FrameControlsBanner = ({
    slug,
    children,
    id,
    ...props
}: ControlsBannerProps) => {
    const navigate = useNavigate();

    const contentContainer = useRef<HTMLDivElement>(null);
    const childrenContainer = useRef<HTMLDivElement>(null);
    const childrenWidthRef = useRef<number>(0);

    const numberOfChildren = Children.count(children);

    const [display, setDisplay] = useState<'none' | 'flex'>('flex');

    const menuItems: MenuItemProps[] = useMemo(() => {
        const childrenArray = Children.toArray(children);
        return resolveChildMap(childrenArray);
    }, [children]);

    useEffect(() => {
        if (
            childrenContainer.current &&
            childrenContainer.current.clientWidth !== 0
        ) {
            childrenWidthRef.current = childrenContainer.current.clientWidth;
        }

        if (contentContainer.current) {
            const contentWidth = contentContainer.current.clientWidth;
            const childrenWidth = childrenWidthRef.current;

            setDisplay(childrenWidth > contentWidth - 110 ? 'none' : 'flex');
        }
    }, [
        contentContainer.current?.clientWidth,
        numberOfChildren,
        childrenContainer,
    ]);

    return (
        <Frame
            id='frame-controls-as-banner'
            size='banner'
            {...props}
        >
            <Chakra.HStack
                alignItems='center'
                justifyContent={slug ? 'space-between' : 'flex-end'}
                w='100%'
                ref={contentContainer}
            >
                {slug && (
                    <Button
                        icon={{ icon: 'arrow-l', ariaLabel: 'back button' }}
                        onClick={() =>
                            typeof slug === 'number'
                                ? navigate(slug)
                                : navigate(slug)
                        }
                    />
                )}

                <Chakra.HStack
                    overflow={'none'}
                    display={display}
                    ref={childrenContainer}
                >
                    {children}
                </Chakra.HStack>

                <Chakra.HStack display={display === 'none' ? 'flex' : 'none'}>
                    <Menu menuItems={menuItems} />
                </Chakra.HStack>
            </Chakra.HStack>
        </Frame>
    );
};

const resolveButtonToMenuItems = (button: ButtonProps): MenuItemProps => {
    const { children, icon, isDisabled, onClick } = button;

    return {
        label: children ?? icon?.ariaLabel,
        icon,
        isDisabled,
        onClick,
    } as MenuItemProps;
};

type ChildrenArray = (
    | string
    | number
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
)[];

const resolveChildMap = (children: ChildrenArray): any[] => {
    if (!children) return [];
    return Children.toArray(children).flatMap((child) => {
        if (isValidElement(child) && child.type === Button) {
            return resolveButtonToMenuItems(child.props);
        }
        if (isValidElement(child) && child.type === Fragment) {
            //@ts-ignore - child.props is unknown for some reason?
            return resolveChildMap(child.props.children);
        }
        return [];
    });
};
