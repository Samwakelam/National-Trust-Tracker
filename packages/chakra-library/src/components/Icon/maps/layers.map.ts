import { IconType } from 'react-icons';
import {
    BiLayer,
    BiLayerMinus,
    BiLayerPlus,
    BiSolidLayer,
    BiSolidLayerMinus,
    BiSolidLayerPlus,
} from 'react-icons/bi';
import { BsLayers, BsLayersFill, BsLayersHalf } from 'react-icons/bs';

export type LayersType =
    | 'layer'
    | 'layer-add'
    | 'layer-minus'
    | 'layer-triple'
    | 'layer-half';

export const layersOutlineMap: { [key in LayersType]: IconType } = {
    'layer': BsLayers,
    'layer-add': BiLayerPlus,
    'layer-half': BsLayersHalf,
    'layer-minus': BiLayerMinus,
    'layer-triple': BiLayer,
};

export const layersSolidMap: { [key in LayersType]: IconType } = {
    'layer': BsLayersFill,
    'layer-add': BiSolidLayerPlus,
    'layer-half': BsLayersHalf,
    'layer-minus': BiSolidLayerMinus,
    'layer-triple': BiSolidLayer,
};
