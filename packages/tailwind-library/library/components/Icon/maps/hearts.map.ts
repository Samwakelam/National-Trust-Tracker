import { IconType } from 'react-icons';
import {
    TbCalendarHeart,
    TbCameraHeart,
    TbClipboardHeart,
    TbHeart,
    TbHeartbeat,
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
    TbHomeHeart,
    TbMapHeart,
    TbMapPinHeart,
    TbShoppingBag,
} from 'react-icons/tb';

export type HeartsType =
    | 'heart-alert'
    | 'heart-beat'
    | 'heart-broken'
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
    | 'heart'
    | 'house-heart'
    | 'bag-heart'
    | 'camera-heart'
    | 'event-heart'
    | 'location-heart'
    | 'map-heart'
    | 'record-heart';

export const heartsOutlineMap: { [key in HeartsType]: IconType } = {
    'heart-alert': TbHeartExclamation,
    'heart-beat': TbHeartbeat,
    'heart-broken': TbHeartBroken,
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
    'heart': TbHeart,
    'bag-heart': TbShoppingBag,
    'camera-heart': TbCameraHeart,
    'event-heart': TbCalendarHeart,
    'house-heart': TbHomeHeart,
    'location-heart': TbMapPinHeart,
    'map-heart': TbMapHeart,
    'record-heart': TbClipboardHeart,
};

export const heartsSolidMap: { [key in HeartsType]: IconType } = {
    ...heartsOutlineMap,
    heart: TbHeartFilled,
};
