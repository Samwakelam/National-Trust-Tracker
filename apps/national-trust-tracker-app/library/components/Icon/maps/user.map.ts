import { IconType } from 'react-icons';
import {
    BiSolidUser,
    BiSolidUserCheck,
    BiSolidUserDetail,
    BiSolidUserMinus,
    BiSolidUserPlus,
    BiSolidUserVoice,
    BiSolidUserX,
    BiUser,
    BiUserCheck,
    BiUserMinus,
    BiUserPlus,
    BiUserVoice,
    BiUserX,
} from 'react-icons/bi';
import { IoPeopleOutline, IoPeopleSharp } from 'react-icons/io5';
import {
    TbEyeFilled,
    TbEye,
    TbEyeCheck,
    TbEyeCancel,
    TbEyeCog,
    TbEyeEdit,
    TbEyeExclamation,
    TbEyeMinus,
    TbEyeOff,
    TbEyePause,
    TbEyePin,
    TbEyeSearch,
    TbEyeQuestion,
    TbEyeX,
    TbEyePlus,
    TbUserHeart,
} from 'react-icons/tb';

export type UserType =
    | 'eye'
    | 'eye-off'
    | 'eye-blocked'
    | 'eye-tick'
    | 'eye-settings'
    | 'eye-edit'
    | 'eye-alert'
    | 'eye-remove'
    | 'eye-pause'
    | 'eye-location'
    | 'eye-plus'
    | 'eye-search'
    | 'eye-unknown'
    | 'eye-cross'
    | 'user'
    | 'users'
    | 'user-broadcast'
    | 'user-cross'
    | 'user-detail'
    | 'user-heart'
    | 'user-plus'
    | 'user-remove'
    | 'user-tick';

export const userOutlineMap: { [key in UserType]: IconType } = {
    'eye': TbEye,
    'eye-off': TbEyeOff,
    'eye-blocked': TbEyeCancel,
    'eye-tick': TbEyeCheck,
    'eye-settings': TbEyeCog,
    'eye-edit': TbEyeEdit,
    'eye-alert': TbEyeExclamation,
    'eye-remove': TbEyeMinus,
    'eye-pause': TbEyePause,
    'eye-location': TbEyePin,
    'eye-plus': TbEyePlus,
    'eye-search': TbEyeSearch,
    'eye-unknown': TbEyeQuestion,
    'eye-cross': TbEyeX,
    'user': BiUser,
    'users': IoPeopleOutline,
    'user-broadcast': BiUserVoice,
    'user-cross': BiUserX,
    'user-detail': BiSolidUserDetail,
    'user-heart': TbUserHeart,
    'user-plus': BiUserPlus,
    'user-remove': BiUserMinus,
    'user-tick': BiUserCheck,
};

export const userSolidMap: { [key in UserType]: IconType } = {
    'eye': TbEyeFilled,
    'eye-off': TbEyeOff,
    'eye-blocked': TbEyeCancel,
    'eye-tick': TbEyeCheck,
    'eye-settings': TbEyeCog,
    'eye-edit': TbEyeEdit,
    'eye-alert': TbEyeExclamation,
    'eye-remove': TbEyeMinus,
    'eye-pause': TbEyePause,
    'eye-location': TbEyePin,
    'eye-plus': TbEyePlus,
    'eye-search': TbEyeSearch,
    'eye-unknown': TbEyeQuestion,
    'eye-cross': TbEyeX,
    'user': BiSolidUser,
    'users': IoPeopleSharp,
    'user-broadcast': BiSolidUserVoice,
    'user-cross': BiSolidUserX,
    'user-detail': BiSolidUserDetail,
    'user-heart': TbUserHeart,
    'user-plus': BiSolidUserPlus,
    'user-remove': BiSolidUserMinus,
    'user-tick': BiSolidUserCheck,
};
