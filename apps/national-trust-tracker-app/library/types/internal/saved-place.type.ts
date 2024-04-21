import {
    Access,
    Directions,
    Opening,
    Place,
    ReferencedFacilities,
} from '../national-trust';

export interface SavedPlace
    extends Pick<
        Place,
        | 'featureCategories'
        | 'images'
        | 'location'
        | 'name'
        | 'placeId'
        | 'websiteUrl'
        | 'description'
    > {
    accessTags?: Access;
    directions?: Directions;
    facilities?: ReferencedFacilities;
    opening?: Opening;
}
