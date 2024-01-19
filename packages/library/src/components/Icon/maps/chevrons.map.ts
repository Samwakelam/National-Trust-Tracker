import { IconType } from 'react-icons';
import {
    TbChevronDown,
    TbChevronLeft,
    TbChevronRight,
    TbChevronUp,
    TbChevronsDown,
    TbChevronsLeft,
    TbChevronsRight,
    TbChevronsUp,
} from 'react-icons/tb';

export type ChevronsType =
    | 'chevron-u'
    | 'chevron-d'
    | 'chevron-l'
    | 'chevron-r'
    | 'chevron-ll'
    | 'chevron-rr'
    | 'chevron-uu'
    | 'chevron-dd';

export const chevronsMap: { [key in ChevronsType]: IconType } = {
    'chevron-u': TbChevronUp,
    'chevron-d': TbChevronDown,
    'chevron-l': TbChevronLeft,
    'chevron-r': TbChevronRight,
    'chevron-ll': TbChevronsLeft,
    'chevron-rr': TbChevronsRight,
    'chevron-uu': TbChevronsUp,
    'chevron-dd': TbChevronsDown,
};
