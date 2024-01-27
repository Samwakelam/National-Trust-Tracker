import { Link } from './link.type';

export type Asset = {
    name: string;
    description: string;
    opensAt: string;
    closesAt: string;
};

export type Day = {
    status: 'CLOSED' | 'FULLY_OPEN' | 'PARTIALLY_OPEN';
    assets: Asset[];
};

export type Opening = {
    openingTimesNote: string;
    days: Record<string, Day>;
    links: Link[];
};
