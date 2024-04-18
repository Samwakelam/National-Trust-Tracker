'use client';
// Note: React must be declared in all files for cosmos to work
import React from 'react';

// Note: Full paths must be used in all files for cosmos to work

import {
    arrowsMap,
    calendarsSolidMap,
    chevronsMap,
    circlesOutlineMap,
    filesOutlineMap,
    heartsOutlineMap,
    layersSolidMap,
    locationOutlineMap,
    nationalTrustMap,
    shapesSolidMap,
    shieldsMap,
    symbolsSolidMap,
    userSolidMap,
    utilsOutlineMap,
} from './maps';
import { Icon } from './Icon.component';
import { useFixtureSelect } from 'react-cosmos/client';

const libraryType = [
    'arrows',
    'calendars',
    'chevrons',
    'circles',
    'files',
    'hearts',
    'layers',
    'location',
    'national-trust',
    'shapes',
    'shields',
    'symbols',
    'user',
    'utils',
] as const;
type LibraryType = (typeof libraryType)[number];

export const IconFixture = () => {
    const [library] = useFixtureSelect('Library', {
        options: libraryType.map((type) => type),
        defaultValue: 'arrows',
    });

    const [variant] = useFixtureSelect('Variant', {
        options: ['solid', 'outline'],
        defaultValue: 'solid',
    });

    const getIcons = (library: LibraryType): any[] => {
        switch (library) {
            case 'arrows': {
                return Object.keys(arrowsMap);
            }
            case 'calendars': {
                return Object.keys(calendarsSolidMap);
            }
            case 'chevrons': {
                return Object.keys(chevronsMap);
            }
            case 'circles': {
                return Object.keys(circlesOutlineMap);
            }
            case 'files': {
                return Object.keys(filesOutlineMap);
            }
            case 'hearts': {
                return Object.keys(heartsOutlineMap);
            }
            case 'layers': {
                return Object.keys(layersSolidMap);
            }
            case 'location': {
                return Object.keys(locationOutlineMap);
            }
            case 'national-trust': {
                return Object.keys(nationalTrustMap);
            }
            case 'shapes': {
                return Object.keys(shapesSolidMap);
            }
            case 'shields': {
                return Object.keys(shieldsMap);
            }
            case 'symbols': {
                return Object.keys(symbolsSolidMap);
            }
            case 'user': {
                return Object.keys(userSolidMap);
            }
            case 'utils': {
                return Object.keys(utilsOutlineMap);
            }
        }
    };

    return (
        <div className='flex flex-row flex-wrap items-center gap-24 p-16'>
            {getIcons(library).map((icon) => {
                return (
                    <div
                        key={`icon-fixture-${icon}`}
                        className='flex flex-col items-center gap-8 p-4'
                    >
                        <Icon
                            icon={icon}
                            ariaLabel={icon}
                            variant={variant}
                        />
                        <p>{icon}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default IconFixture;
