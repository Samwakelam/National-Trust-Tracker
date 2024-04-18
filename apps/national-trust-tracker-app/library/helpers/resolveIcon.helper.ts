import { IconProps } from '../components';

export const resolveIcon = (reference: string): IconProps | null => {
    switch (reference) {
        case 'TAG002501':
            return {
                icon: 'nt-acc-dogs',
                ariaLabel: 'assistance dogs',
            };
        case 'TAG002503':
            return {
                icon: 'nt-book-shop',
                ariaLabel: 'book shop',
            };
        case 'TAG002504':
            return {
                icon: 'nt-cafe',
                ariaLabel: 'cafe',
            };
        case 'TAG002505':
            return {
                icon: 'nt-car-park',
                ariaLabel: 'car-park',
            };
        case 'TAG002507':
            return {
                icon: 'nt-dogs',
                ariaLabel: 'dogs allowed',
            };
        case 'TAG002510':
            return {
                icon: 'nt-guided-tour',
                ariaLabel: 'guided tour',
            };
        case 'TAG002511':
            return {
                icon: 'nt-kiosk',
                ariaLabel: 'Kiosk',
            };
        case 'TAG002512':
            return {
                icon: 'nt-restaurant',
                ariaLabel: 'restaurant',
            };
        case 'TAG002515':
            return {
                icon: 'nt-plant-shop',
                ariaLabel: 'plant shop',
            };
        case 'TAG002517':
            return {
                icon: 'nt-shop',
                ariaLabel: 'shop',
            };
        case 'TAG002518':
            return {
                icon: 'nt-tea-room',
                ariaLabel: 'tea room',
            };
        case 'TAG002519':
            return {
                icon: 'nt-toilet',
                ariaLabel: 'toilets',
            };
        case 'TAG002521':
            return {
                icon: 'nt-acc-route',
                ariaLabel: 'accessible route',
            };
        case 'TAG002522':
            return {
                icon: 'nt-acc-toilet',
                ariaLabel: 'accessible toilet',
            };
        case 'TAG002523':
            return {
                icon: 'nt-braille',
                ariaLabel: 'braille',
            };
        case 'TAG002525':
            return {
                icon: 'nt-acc-park',
                ariaLabel: 'accessible parking',
            };
        case 'TAG002526':
            return {
                icon: 'nt-drop-off',
                ariaLabel: 'drop off point',
            };
        case 'TAG002527':
            return {
                icon: 'nt-induction-loop',
                ariaLabel: 'induction loop',
            };
        case 'TAG002528':
            return {
                icon: 'nt-large-print',
                ariaLabel: 'large print',
            };
        case 'TAG002529':
            return {
                icon: 'nt-acc-food-outlet',
                ariaLabel: 'accessible food outlet',
            };
        case 'TAG002530':
            return {
                icon: 'nt-acc-shop',
                ariaLabel: 'accessible shop',
            };
        case 'TAG002531':
            return {
                icon: 'nt-level-access',
                ariaLabel: 'level access',
            };
        case 'TAG002533':
            return {
                icon: 'nt-narrow-corridor',
                ariaLabel: 'narrow corridor',
            };
        case 'TAG002534':
            return {
                icon: 'nt-photograph-album',
                ariaLabel: 'photograph album',
            };
        case 'TAG002535':
            return {
                icon: 'nt-acc-vehicle',
                ariaLabel: 'accessible vehicle',
            };
        case 'TAG002536':
            return {
                icon: 'nt-acc-ramp',
                ariaLabel: 'accessible ramp',
            };
        case 'TAG002537':
            return {
                icon: 'nt-seating',
                ariaLabel: 'seating',
            };
        case 'TAG002540':
            return {
                icon: 'nt-steps',
                ariaLabel: 'steps or uneven',
            };
        case 'TAG002542':
            return {
                icon: 'nt-virtual-tour',
                ariaLabel: 'virtual tour',
            };
        case 'TAG002543':
            return {
                icon: 'nt-wheelchair',
                ariaLabel: 'wheelchair',
            };
        case 'bus':
            return {
                icon: 'nt-bus',
                ariaLabel: 'bus',
            };
        case 'cycle':
            return {
                icon: 'nt-bicycle',
                ariaLabel: 'bicycle',
            };
        case 'ferry': {
            return {
                icon: 'nt-ferry',
                ariaLabel: 'ferry',
            };
        }
        case 'foot':
            return {
                icon: 'nt-foot',
                ariaLabel: 'foot',
            };
        case 'road':
            return {
                icon: 'nt-road',
                ariaLabel: 'road',
            };
        case 'train':
            return {
                icon: 'nt-train',
                ariaLabel: 'train',
            };
        case 'underground':
            return {
                icon: 'nt-underground',
                ariaLabel: 'underground',
            };

        default:
            return null;
    }
};
