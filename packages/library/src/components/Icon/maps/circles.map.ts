import { IconType } from 'react-icons';
import { BiInfoCircle, BiSolidInfoCircle } from 'react-icons/bi';
import {
    IoAddCircleOutline,
    IoAddCircle,
    IoCheckmarkCircle,
    IoCheckmarkCircleOutline,
    IoChevronBackCircleOutline,
    IoChevronBackCircle,
    IoChevronDownCircleOutline,
    IoChevronDownCircle,
    IoChevronForwardCircleOutline,
    IoChevronForwardCircle,
    IoChevronUpCircleOutline,
    IoChevronUpCircle,
    IoCloseCircleOutline,
    IoCloseCircle,
    IoRemoveCircleOutline,
    IoRemoveCircle,
} from 'react-icons/io5';
import { MdOutlineUnpublished, MdUnpublished } from 'react-icons/md';
import { RiMoneyPoundCircleFill, RiMoneyPoundCircleLine } from 'react-icons/ri';

export type CirclesType =
    | 'circle-chevron-d'
    | 'circle-chevron-l'
    | 'circle-chevron-r'
    | 'circle-chevron-u'
    | 'circle-cross'
    | 'circle-info'
    | 'circle-plus'
    | 'circle-pound'
    | 'circle-remove'
    | 'circle-tick'
    | 'circle-untick';

export const circlesOutlineMap: { [key in CirclesType]: IconType } = {
    'circle-chevron-d': IoChevronDownCircleOutline,
    'circle-chevron-l': IoChevronForwardCircleOutline,
    'circle-chevron-r': IoChevronBackCircleOutline,
    'circle-chevron-u': IoChevronUpCircleOutline,
    'circle-cross': IoCloseCircleOutline,
    'circle-info': BiInfoCircle,
    'circle-plus': IoAddCircleOutline,
    'circle-pound': RiMoneyPoundCircleLine,
    'circle-remove': IoRemoveCircleOutline,
    'circle-tick': IoCheckmarkCircleOutline,
    'circle-untick': MdOutlineUnpublished,
};

export const circlesSolidMap: { [key in CirclesType]: IconType } = {
    'circle-chevron-d': IoChevronDownCircle,
    'circle-chevron-l': IoChevronForwardCircle,
    'circle-chevron-r': IoChevronBackCircle,
    'circle-chevron-u': IoChevronUpCircle,
    'circle-cross': IoCloseCircle,
    'circle-info': BiSolidInfoCircle,
    'circle-plus': IoAddCircle,
    'circle-pound': RiMoneyPoundCircleFill,
    'circle-remove': IoRemoveCircle,
    'circle-tick': IoCheckmarkCircle,
    'circle-untick': MdUnpublished,
};
