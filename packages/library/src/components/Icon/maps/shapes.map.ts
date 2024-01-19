import { IconType } from 'react-icons';
import { AiFillDashboard, AiOutlineDashboard } from 'react-icons/ai';
import { BiMoon, BiSolidMoon, BiSolidSun, BiSun } from 'react-icons/bi';
import { BsPeople, BsPeopleFill } from 'react-icons/bs';
import { FaIndustry, FaPassport } from 'react-icons/fa6';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { GiPirateFlag } from 'react-icons/gi';
import {
    HiLockClosed,
    HiLockOpen,
    HiOutlineLockClosed,
    HiOutlineLockOpen,
} from 'react-icons/hi';
import { IoMdThumbsDown, IoMdThumbsUp } from 'react-icons/io';
import { LuFactory } from 'react-icons/lu';
import { MdDirectionsBoat, MdOutlineDirectionsBoat } from 'react-icons/md';
import { PiToolboxBold, PiToolboxFill } from 'react-icons/pi';
import {
    TbBulb,
    TbBulbFilled,
    TbBulbOff,
    TbShip,
    TbShipOff,
} from 'react-icons/tb';

export type ShapesType =
    | 'boat'
    | 'bulb-off'
    | 'bulb-on'
    | 'dashboard'
    | 'industry'
    | 'lock-closed'
    | 'lock-open'
    | 'moon'
    | 'passport'
    | 'people'
    | 'pirate'
    | 'ship-off'
    | 'ship-on'
    | 'sun'
    | 'thumbs-d'
    | 'thumbs-u'
    | 'toolbox';

export const shapesOutlineMap: { [key in ShapesType]: IconType } = {
    'boat': MdOutlineDirectionsBoat,
    'bulb-off': TbBulbOff,
    'bulb-on': TbBulb,
    'dashboard': AiOutlineDashboard,
    'industry': LuFactory,
    'lock-closed': HiOutlineLockClosed,
    'lock-open': HiOutlineLockOpen,
    'moon': BiMoon,
    'passport': FaPassport,
    'people': BsPeople,
    'pirate': GiPirateFlag,
    'ship-off': TbShipOff,
    'ship-on': TbShip,
    'sun': BiSun,
    'thumbs-d': FiThumbsDown,
    'thumbs-u': FiThumbsUp,
    'toolbox': PiToolboxBold,
};

export const shapesSolidMap: { [key in ShapesType]: IconType } = {
    'boat': MdDirectionsBoat,
    'bulb-off': TbBulbOff,
    'bulb-on': TbBulbFilled,
    'dashboard': AiFillDashboard,
    'industry': FaIndustry,
    'lock-closed': HiLockClosed,
    'lock-open': HiLockOpen,
    'moon': BiSolidMoon,
    'passport': FaPassport,
    'people': BsPeopleFill,
    'pirate': GiPirateFlag,
    'ship-off': TbShipOff,
    'ship-on': TbShip,
    'sun': BiSolidSun,
    'thumbs-d': IoMdThumbsDown,
    'thumbs-u': IoMdThumbsUp,
    'toolbox': PiToolboxFill,
};
