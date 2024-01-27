import { Link } from './link.type';

type Direction = {
    htmlDescription: string;
};

interface Road extends Direction {
    parking: string;
    satnav?: string;
}

interface Cycle extends Direction {
    cycleRouteUrl?: string;
}

export type DirectionType =
    | 'bus'
    | 'cycle'
    | 'ferry'
    | 'foot'
    | 'road'
    | 'train'
    | 'underground';

export type Directions = {
    directions: Record<DirectionType, Direction | Road | Cycle>;
    links: Link[];
};
