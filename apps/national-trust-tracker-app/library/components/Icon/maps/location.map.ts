import { IconType } from 'react-icons';
import {
    MdAddLocationAlt,
    MdEditLocationAlt,
    MdLocationOff,
    MdLocationOn,
    MdNotListedLocation,
    MdOutlineAddLocationAlt,
    MdOutlineEditLocationAlt,
    MdOutlineLocationOff,
    MdOutlineLocationOn,
    MdOutlineNotListedLocation,
    MdOutlineWrongLocation,
    MdWrongLocation,
} from 'react-icons/md';
import { TbLocation, TbLocationOff, TbRoute, TbRouteOff } from 'react-icons/tb';

export type LocationType =
    | 'location'
    | 'location-add'
    | 'location-edit'
    | 'location-delete'
    | 'location-unknown'
    | 'location-off'
    | 'location-arrow'
    | 'location-arrow-off'
    | 'route'
    | 'route-off';

export const locationOutlineMap: { [key in LocationType]: IconType } = {
    'location': MdOutlineLocationOn,
    'location-add': MdOutlineAddLocationAlt,
    'location-delete': MdOutlineWrongLocation,
    'location-edit': MdOutlineEditLocationAlt,
    'location-off': MdOutlineLocationOff,
    'location-unknown': MdOutlineNotListedLocation,
    'location-arrow': TbLocation,
    'location-arrow-off': TbLocationOff,
    'route': TbRoute,
    'route-off': TbRouteOff,
};

export const locationSolidMap: { [key in LocationType]: IconType } = {
    'location': MdLocationOn,
    'location-add': MdAddLocationAlt,
    'location-delete': MdWrongLocation,
    'location-edit': MdEditLocationAlt,
    'location-off': MdLocationOff,
    'location-unknown': MdNotListedLocation,
    'location-arrow': TbLocation,
    'location-arrow-off': TbLocationOff,
    'route': TbRoute,
    'route-off': TbRouteOff,
};
