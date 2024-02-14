import {
    Access,
    Directions,
    Facilities,
    Opening,
    Place,
    ReferencedFacilities,
} from '../national-trust';

export interface CompiledPlace
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
