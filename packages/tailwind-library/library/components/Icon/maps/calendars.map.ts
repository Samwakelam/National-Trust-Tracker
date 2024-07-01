import { IconType } from 'react-icons';
import {
    BiCalendarAlt,
    BiCalendarCheck,
    BiCalendarEdit,
    BiCalendarEvent,
    BiCalendarExclamation,
    BiCalendarMinus,
    BiCalendarPlus,
    BiCalendarWeek,
    BiCalendarX,
    BiSolidCalendar,
    BiSolidCalendarCheck,
    BiSolidCalendarEdit,
    BiSolidCalendarEvent,
    BiSolidCalendarExclamation,
    BiSolidCalendarMinus,
    BiSolidCalendarPlus,
    BiSolidCalendarWeek,
    BiSolidCalendarX,
} from 'react-icons/bi';
import { TbClock, TbClock12, TbClock24, TbClockFilled } from 'react-icons/tb';

export type CalendarsType =
    | 'calendar-alert'
    | 'calendar-cross'
    | 'calendar-edit'
    | 'calendar-event'
    | 'calendar-plus'
    | 'calendar-remove'
    | 'calendar-tick'
    | 'calendar-week'
    | 'calendar'
    | 'clock'
    | 'clock-12'
    | 'clock-24';

export const calendarsSolidMap: { [key in CalendarsType]: IconType } = {
    'calendar-alert': BiSolidCalendarExclamation,
    'calendar-cross': BiSolidCalendarX,
    'calendar-edit': BiSolidCalendarEdit,
    'calendar-event': BiSolidCalendarEvent,
    'calendar-plus': BiSolidCalendarPlus,
    'calendar-remove': BiSolidCalendarMinus,
    'calendar-tick': BiSolidCalendarCheck,
    'calendar-week': BiSolidCalendarWeek,
    'calendar': BiSolidCalendar,
    'clock': TbClockFilled,
    'clock-12': TbClock12,
    'clock-24': TbClock24,
};

export const calendarsOutlineMap: { [key in CalendarsType]: IconType } = {
    'calendar-alert': BiCalendarExclamation,
    'calendar-cross': BiCalendarX,
    'calendar-edit': BiCalendarEdit,
    'calendar-event': BiCalendarEvent,
    'calendar-plus': BiCalendarPlus,
    'calendar-remove': BiCalendarMinus,
    'calendar-tick': BiCalendarCheck,
    'calendar-week': BiCalendarWeek,
    'calendar': BiCalendarAlt,
    'clock': TbClock,
    'clock-12': TbClock12,
    'clock-24': TbClock24,
};
