import { ReactElement } from 'react';
import { SystemStyleObject } from '@chakra-ui/theme-tools';

import { PositionType } from '../../types';
import { IconProps } from '..';

import * as Chakra from '@chakra-ui/react';

export interface AccordionIconProps extends IconProps {
    position?: PositionType;
}

export type AccordionItemProps = {
    text: string;
    icon?: AccordionIconProps;
    expandedStyle?: SystemStyleObject;
};

export type AccordionPanelProps = {
    children: ReactElement | ReactElement[];
};

export interface AccordionProps extends Chakra.AccordionProps {
    items: [AccordionItemProps, AccordionPanelProps][];
    uniqueIdentifier: string | number;
}
