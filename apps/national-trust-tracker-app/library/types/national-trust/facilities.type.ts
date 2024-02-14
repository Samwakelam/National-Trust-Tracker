import { Link } from './link.type';

export interface ReferencedFacility extends Facility {
    reference: string;
}

export interface ReferencedFacilities extends Facilities {
    facilities: ReferencedFacility[];
}

export type Facility = {
    reference?: string;
    name: string;
    description?: string;
    available: boolean;
    keyFacility: boolean;
};

export type Facilities = {
    facilities: Facility[];
    resourceType: string;
    links: Link[];
};
