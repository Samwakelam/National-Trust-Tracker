import {
    AdmissionPrice,
    Asset,
    DirectionType,
    ReferencedFacility,
    Place,
} from '../national-trust';

export interface Ticket extends Omit<AdmissionPrice, 'giftAidAmount'> {
    qty: number;
}

type CloudinaryImageProps = {
    access_mode: string;
    asset_id: string;
    bytes: number;
    created_at: string;
    etag: string;
    existing: boolean;
    folder: string;
    format: string;
    height: number;
    placeholder: boolean;
    public_id: string;
    resource_type: string;
    secure_url: string;
    signature: string;
    tags: string[];
    type: string;
    url: string;
    version: number;
    version_id: string;
    width: number;
};

type VisitedPlace = Pick<
    Place,
    | 'featureCategories'
    | 'images'
    | 'location'
    | 'name'
    | 'placeId'
    | 'websiteUrl'
>;

export type Person = { name: string };

export type Visit = {
    assetsUsed: Asset[];
    date: string;
    facilitiesUsed: ReferencedFacility[];
    images?: CloudinaryImageProps[];
    people: Person[];
    place: VisitedPlace;
    tickets: Ticket[];
    totalPrice: number;
    travel: DirectionType[];
};

export interface VisitDB extends Visit {
    _id: string;
}
