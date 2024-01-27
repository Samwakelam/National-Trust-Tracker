export type RelType =
    | 'place'
    | 'self'
    | 'admissionPrices'
    | 'openingTimes'
    | 'opening'
    | 'directions'
    | 'notes'
    | 'downloadableContent'
    | 'facilities'
    | 'accessTags';

export type Link = {
    href: string;
    lastModified?: string;
    rel: RelType;
};
