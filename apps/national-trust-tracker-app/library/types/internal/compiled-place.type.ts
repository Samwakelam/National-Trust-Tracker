import {
    Access,
    Directions,
    Facilities,
    Opening,
    Place,
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
    > {
    accessTags?: Access;
    directions?: Directions;
    facilities?: Facilities;
    opening?: Opening;
}
