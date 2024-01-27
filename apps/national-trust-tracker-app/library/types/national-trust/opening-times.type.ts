import { Link } from './link.type';

type DaysOpen = {
    start: string;
    end: string;
};

type OpeningTime = {
    name: string;
    usedForPrimaryOpeningTimes: boolean;
    daysOpen: Record<string, DaysOpen>;
};

export type OpeningTimes = {
    openingTimesNote: string;
    from: string;
    to: string;
    openingTimes: OpeningTime[];
    links: Link[];
};
