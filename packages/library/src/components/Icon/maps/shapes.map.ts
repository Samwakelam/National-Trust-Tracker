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
import {
    IoCarSport,
    IoCarSportOutline,
    IoTicket,
    IoTicketOutline,
} from 'react-icons/io5';
import { LuFactory } from 'react-icons/lu';
import {
    MdCardMembership,
    MdDirectionsBoat,
    MdOutlineDirectionsBoat,
} from 'react-icons/md';
import {
    PiHouse,
    PiHouseBold,
    PiHouseFill,
    PiHouseLine,
    PiHouseLineBold,
    PiHouseLineFill,
    PiHouseSimple,
    PiHouseSimpleBold,
    PiHouseSimpleFill,
    PiToolboxBold,
    PiToolboxFill,
} from 'react-icons/pi';
import {
    TbBulb,
    TbBulbFilled,
    TbBulbOff,
    TbMoneybag,
    TbPigMoney,
    TbReportMoney,
    TbShip,
    TbShipOff,
} from 'react-icons/tb';

export type ShapesType =
    | 'boat'
    | 'bulb-off'
    | 'bulb-on'
    | 'car'
    | 'dashboard'
    | 'house'
    | 'house-ground'
    | 'house-simple'
    | 'industry'
    | 'lock-closed'
    | 'lock-open'
    | 'membership'
    | 'money-report'
    | 'moon'
    | 'passport'
    | 'people'
    | 'piggy-bank'
    | 'pirate'
    | 'sack'
    | 'ship-off'
    | 'ship-on'
    | 'sun'
    | 'ticket'
    | 'thumbs-d'
    | 'thumbs-u'
    | 'toolbox';

export const shapesOutlineMap: { [key in ShapesType]: IconType } = {
    'boat': MdOutlineDirectionsBoat,
    'bulb-off': TbBulbOff,
    'bulb-on': TbBulb,
    'car': IoCarSportOutline,
    'dashboard': AiOutlineDashboard,
    'house': PiHouseBold,
    'house-ground': PiHouseLineBold,
    'house-simple': PiHouseSimpleBold,
    'industry': LuFactory,
    'lock-closed': HiOutlineLockClosed,
    'lock-open': HiOutlineLockOpen,
    'membership': MdCardMembership,
    'money-report': TbReportMoney,
    'moon': BiMoon,
    'passport': FaPassport,
    'people': BsPeople,
    'piggy-bank': TbPigMoney,
    'pirate': GiPirateFlag,
    'sack': TbMoneybag,
    'ship-off': TbShipOff,
    'ship-on': TbShip,
    'sun': BiSun,
    'ticket': IoTicketOutline,
    'thumbs-d': FiThumbsDown,
    'thumbs-u': FiThumbsUp,
    'toolbox': PiToolboxBold,
};

export const shapesSolidMap: { [key in ShapesType]: IconType } = {
    'boat': MdDirectionsBoat,
    'bulb-off': TbBulbOff,
    'bulb-on': TbBulbFilled,
    'car': IoCarSport,
    'dashboard': AiFillDashboard,
    'house': PiHouseFill,
    'house-ground': PiHouseLineFill,
    'house-simple': PiHouseSimpleFill,
    'industry': FaIndustry,
    'lock-closed': HiLockClosed,
    'lock-open': HiLockOpen,
    'membership': MdCardMembership,
    'money-report': TbReportMoney,
    'moon': BiSolidMoon,
    'passport': FaPassport,
    'people': BsPeopleFill,
    'piggy-bank': TbPigMoney,
    'pirate': GiPirateFlag,
    'sack': TbMoneybag,
    'ship-off': TbShipOff,
    'ship-on': TbShip,
    'sun': BiSolidSun,
    'ticket': IoTicket,
    'thumbs-d': IoMdThumbsDown,
    'thumbs-u': IoMdThumbsUp,
    'toolbox': PiToolboxFill,
};
