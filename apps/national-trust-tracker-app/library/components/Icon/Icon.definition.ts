import { ArrowsType } from './maps/arrows.map';
import { IconType as ReactIconType } from 'react-icons';
import {
    ChevronsType,
    CirclesType,
    FilesType,
    HeartsType,
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
import { ReactNode } from 'react';

export type IconVariant = 'solid' | 'outline';

export type IconType =
    | ArrowsType
    | CalendarsType
    | ChevronsType
    | CirclesType
    | FilesType
    | HeartsType
    | LayersType
    | LocationType
    | NationalTrustType
    | ShapesType
    | ShieldsType
    | SymbolsType
    | UserType
    | UtilsType;

export type IconProps = {
    ariaLabel: string;
    icon: IconType;
    variant?: IconVariant;
    onMouseOut?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onMouseOver?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    className?: string;
};

export type IconMapProps = Record<IconType, any>;
