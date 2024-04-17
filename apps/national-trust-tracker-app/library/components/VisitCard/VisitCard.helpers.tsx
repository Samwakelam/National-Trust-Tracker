import { Tag } from '@sam/library';

import { Asset } from '../../types/national-trust';

export const resolveAssetTagColorScheme = (asset: string) => {
    const cafeTypes: string[] = ['tea', 'caf', 'restaurant', 'kitchen'];

    if (cafeTypes.some((value) => asset.toLowerCase().includes(value)))
        return 'purple';

    switch (asset) {
        case 'House':
            return 'blue';
        case 'Garden':
            return 'green';
        case 'Park':
            return 'teal';
        case 'Castle':
            return 'yellow';
        case 'Shop':
            return 'pink';
        default:
            return undefined;
    }
};

export const resolveAssetMap = (asset: Asset) => {
    return (
        <Tag
            key={`asset-tag-${asset.name}`}
            colorScheme={resolveAssetTagColorScheme(asset.name)}
        >
            {asset.name}
        </Tag>
    );
};
