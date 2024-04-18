import { IconType } from 'react-icons';
import {
    BsArrowDownLeftSquare,
    BsArrowDownLeftSquareFill,
    BsArrowUpRightSquare,
    BsArrowUpRightSquareFill,
} from 'react-icons/bs';
import { IoAdd, IoCheckmark, IoClose, IoRemove } from 'react-icons/io5';
import {
    MdLocalHospital,
    MdOutlineLocalHospital,
    MdSensors,
    MdSensorsOff,
} from 'react-icons/md';
import { PiWarningBold, PiWarningFill } from 'react-icons/pi';

export type SymbolsType =
    | 'broadcast-off'
    | 'broadcast'
    | 'cross'
    | 'external'
    | 'hospital'
    | 'internal'
    | 'plus'
    | 'remove'
    | 'tick'
    | 'warning';

export const symbolsOutlineMap: { [key in SymbolsType]: IconType } = {
    'broadcast-off': MdSensorsOff,
    'broadcast': MdSensors,
    'cross': IoClose,
    'external': BsArrowUpRightSquare,
    'hospital': MdOutlineLocalHospital,
    'internal': BsArrowDownLeftSquare,
    'plus': IoAdd,
    'remove': IoRemove,
    'tick': IoCheckmark,
    'warning': PiWarningBold,
};

export const symbolsSolidMap: { [key in SymbolsType]: IconType } = {
    'broadcast-off': MdSensorsOff,
    'broadcast': MdSensors,
    'cross': IoClose,
    'external': BsArrowUpRightSquareFill,
    'hospital': MdLocalHospital,
    'internal': BsArrowDownLeftSquareFill,
    'plus': IoAdd,
    'remove': IoRemove,
    'tick': IoCheckmark,
    'warning': PiWarningFill,
};
