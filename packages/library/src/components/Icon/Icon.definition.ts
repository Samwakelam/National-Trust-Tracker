import { IconProps as ChakraIconProps } from '@chakra-ui/react';
import { ArrowsType } from './maps/arrows.map';
import { IconType as ReactIconType } from 'react-icons';
import {
    ChevronsType,
    CirclesType,
    FilesType,
    LayersType,
    LocationType,
    NationalTrustType,
    ShapesType,
    ShieldsType,
    SymbolsType,
    UserType,
    UtilsType,
} from './maps';
import { CalendarsType } from './maps/calendars.map';

export type IconVariant = 'solid' | 'outline';

export type IconType =
    | ArrowsType
    | CalendarsType
    | ChevronsType
    | CirclesType
    | FilesType
    | LayersType
    | LocationType
    | NationalTrustType
    | ShapesType
    | ShieldsType
    | SymbolsType
    | UserType
    | UtilsType;

export interface IconProps extends Omit<ChakraIconProps, 'as' | 'position'> {
    ariaLabel: string;
    icon: IconType;
    variant?: IconVariant;
    onMouseOut?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
    onMouseOver?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

export type IconMapProps = Record<IconType, ReactIconType>;
