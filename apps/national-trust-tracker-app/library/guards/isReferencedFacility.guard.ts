import { ReferencedFacility } from '../types/national-trust';

export const isReferencedFacility = (
    value: any
): value is ReferencedFacility => {
    const props = [
        'reference',
        'name',
        'description',
        'available',
        'keyFacility',
    ];

    if (!value || typeof value === 'string') return false;

    return Object.keys(value).every((key) => props.includes(key));
};
