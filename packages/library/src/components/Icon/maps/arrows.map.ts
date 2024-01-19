import { IconType } from 'react-icons';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';
import {
    // TbArrowBarDown,
    // TbArrowBarLeft,
    // TbArrowBarRight,
    // TbArrowBarToDown,
    // TbArrowBarToLeft,
    // TbArrowBarToRight,
    // TbArrowBarToUp,
    // TbArrowBarUp,
    TbArrowDown,
    TbArrowLeft,
    TbArrowRight,
    TbArrowUp,
    TbArrowsDown,
    TbArrowsDownUp,
    TbArrowsLeft,
    TbArrowsLeftRight,
    TbArrowsRight,
    TbArrowsRightLeft,
    TbArrowsUp,
    TbArrowsUpDown,
    TbRefresh,
    TbRefreshAlert,
    TbRefreshDot,
    TbRefreshOff,
    TbRestore,
} from 'react-icons/tb';

export type ArrowsType =
    | 'arrow-d'
    | 'arrow-l'
    | 'arrow-r'
    | 'arrow-u'
    // | 'bar-in-l'
    // | 'bar-in-r'
    // | 'bar-in-u'
    // | 'bar-in-d'
    // | 'bar-out-l'
    // | 'bar-out-r'
    // | 'bar-out-u'
    // | 'bar-out-d'
    | 'refresh-alert'
    | 'refresh-changes'
    | 'refresh'
    | 'restore'
    | 'refresh-dot'
    | 'refresh-off'
    | 'sort-by-rl'
    | 'sort-by-lr'
    | 'sort-by-du'
    | 'sort-by-ud'
    | 'sort-by-u'
    | 'sort-by-d'
    | 'sort-by-l'
    | 'sort-by-r';

export const arrowsMap: { [key in ArrowsType]: IconType } = {
    'arrow-d': TbArrowDown,
    'arrow-l': TbArrowLeft,
    'arrow-r': TbArrowRight,
    'arrow-u': TbArrowUp,
    // 'bar-in-l': TbArrowBarToLeft,
    // 'bar-in-r': TbArrowBarToRight,
    // 'bar-in-u': TbArrowBarToUp,
    // 'bar-in-d': TbArrowBarToDown,
    // 'bar-out-l': TbArrowBarLeft,
    // 'bar-out-r': TbArrowBarRight,
    // 'bar-out-u': TbArrowBarUp,
    // 'bar-out-d': TbArrowBarDown,
    'refresh-alert': TbRefreshAlert,
    'refresh-changes': MdOutlinePublishedWithChanges,
    'refresh-dot': TbRefreshDot,
    'refresh-off': TbRefreshOff,
    'refresh': TbRefresh,
    'restore': TbRestore,
    'sort-by-rl': TbArrowsRightLeft,
    'sort-by-lr': TbArrowsLeftRight,
    'sort-by-du': TbArrowsDownUp,
    'sort-by-ud': TbArrowsUpDown,
    'sort-by-u': TbArrowsUp,
    'sort-by-d': TbArrowsDown,
    'sort-by-l': TbArrowsLeft,
    'sort-by-r': TbArrowsRight,
};
