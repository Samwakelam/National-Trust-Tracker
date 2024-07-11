import { Link } from './link.type';

type FeatureCategory = {
    name: string;
    features: Record<string, boolean>;
};

export const regionType = [
    'East of England',
    'London',
    'Midlands',
    'North West',
    'Northern Ireland',
    'South East',
    'South West',
    'Wales',
    'Yorkshire and North East',
] as const;
export type RegionType = (typeof regionType)[number];

export type Location = {
    latitudeLongitude: {
        latitude: number;
        longitude: number;
    };
    postalAddress: PostalAddress;
    region: string;
};

export type PostalAddress = {
    lines: string[];
    town: string;
    county: string;
    country: string;
    postcode: string;
};

type SocialMediaLink = {
    url: string;
    type: 'FACEBOOK' | 'INSTAGRAM' | 'TWITTER';
};

export type Place = {
    name: string;
    placeId: number;
    description: {
        strapline: string;
        htmlDescription: string;
    };
    emergencyNotice: string;
    websiteUrl?: string;
    location?: Location;
    contact: {
        telephone: string;
        email: string;
        socialMediaLinks: SocialMediaLink[];
    };
    images?: {
        PRIMARY: {
            description: string;
            url: string;
        };
    };
    alternativeImages?: [];
    featureCategories: FeatureCategory[];
    activelyPromoted: string[];
    tags: string[];
    cmsRegion?: string;
    websiteUrlPath?: string;
    links: Link[];
};
