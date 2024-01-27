import { Link } from './link.type';

export type PlaceSummary = {
    active: boolean;
    links: Link[];
    name: string;
    placeId: number;
};

export type Places = {
    links: Link[];
    placeSummaries: PlaceSummary[];
};
