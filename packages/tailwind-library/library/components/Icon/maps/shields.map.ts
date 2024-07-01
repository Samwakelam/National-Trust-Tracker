import { IconType } from 'react-icons';
import {
    TbShield,
    TbShieldCancel,
    TbShieldCheck,
    TbShieldOff,
    TbShieldPin,
    TbShieldPlus,
    TbShieldX,
} from 'react-icons/tb';

export type ShieldsType =
    | 'shield'
    | 'shield-off'
    | 'shield-cancel'
    | 'shield-plus'
    | 'shield-tick'
    | 'shield-cross'
    | 'shield-location';

export const shieldsMap: { [key in ShieldsType]: IconType } = {
    'shield': TbShield,
    'shield-off': TbShieldOff,
    'shield-cancel': TbShieldCancel,
    'shield-plus': TbShieldPlus,
    'shield-tick': TbShieldCheck,
    'shield-cross': TbShieldX,
    'shield-location': TbShieldPin,
};
