import {
    Access,
    AdmissionPrices,
    Directions,
    DownloadableContent,
    Facilities,
    Notes,
    Opening,
    OpeningTimes,
    Place,
} from '../../../../../library/types/national-trust';

export type PlaceViewProps = {
    place: Place;
    accessTags?: Access;
    admissionPrices?: AdmissionPrices;
    directions?: Directions;
    downloadableContent?: DownloadableContent;
    facilities?: Facilities;
    notes?: Notes;
    opening?: Opening;
    openingTimes?: OpeningTimes;
};

export type Form = {
    date: string;
};

export type DisclosureType = 'log';
