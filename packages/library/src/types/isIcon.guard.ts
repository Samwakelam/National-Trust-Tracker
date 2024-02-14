import { IconProps } from '../components';

export const isIcon = (value: any): value is IconProps => {
    if (!value || typeof value !== 'object') return false;

    const props: string[] = ['icon', 'ariaLabel'];

    return props.every((key) => Object.keys(value).includes(key));
};
