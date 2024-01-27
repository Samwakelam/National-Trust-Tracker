import { Asset } from '../types/national-trust';

export const isAsset = (value: any): value is Asset => {
    const props = ['name', 'description', 'opensAt', 'closesAt'];

    if (!value) return false;

    return Object.keys(value).every((key) => props.includes(key));
};
