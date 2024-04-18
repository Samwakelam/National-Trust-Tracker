import { IconType } from 'react-icons';
import {
    TbCalendarHeart,
    TbCameraHeart,
    TbClipboardHeart,
    TbHeart,
    TbHeartBroken,
    TbHeartCancel,
    TbHeartCheck,
    TbHeartCog,
    TbHeartExclamation,
    TbHeartFilled,
    TbHeartHandshake,
    TbHeartMinus,
    TbHeartOff,
    TbHeartPin,
    TbHeartPlus,
    TbHeartQuestion,
    TbHeartSearch,
    TbHeartX,
    TbHeartbeat,
    TbMapHeart,
    TbMapPinHeart,
} from 'react-icons/tb';

export type HeartsType =
    | 'heart'
    | 'heart-alert'
    | 'heart-beat'
    | 'heart-cancel'
    | 'heart-cross'
    | 'heart-location'
    | 'heart-off'
    | 'heart-plus'
    | 'heart-remove'
    | 'heart-search'
    | 'heart-settings'
    | 'heart-tick'
    | 'heart-together'
    | 'heart-unknown'
    | 'camera-heart'
    | 'record-heart'
    | 'event-heart'
    | 'heart-broken'
    | 'location-heart'
    | 'map-heart';

export const heartsOutlineMap: { [key in HeartsType]: IconType } = {
    'heart': TbHeart,
    'heart-alert': TbHeartExclamation,
    'heart-beat': TbHeartbeat,
    'heart-cancel': TbHeartCancel,
    'heart-cross': TbHeartX,
    'heart-location': TbHeartPin,
    'heart-off': TbHeartOff,
    'heart-plus': TbHeartPlus,
    'heart-remove': TbHeartMinus,
    'heart-search': TbHeartSearch,
    'heart-settings': TbHeartCog,
    'heart-tick': TbHeartCheck,
    'heart-together': TbHeartHandshake,
    'heart-unknown': TbHeartQuestion,
    'camera-heart': TbCameraHeart,
    'record-heart': TbClipboardHeart,
    'event-heart': TbCalendarHeart,
    'heart-broken': TbHeartBroken,
    'location-heart': TbMapPinHeart,
    'map-heart': TbMapHeart,
};

export const heartsSolidMap: { [key in HeartsType]: IconType } = {
    ...heartsOutlineMap,
    heart: TbHeartFilled,
};
