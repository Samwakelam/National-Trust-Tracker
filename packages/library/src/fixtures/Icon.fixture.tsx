// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { FixtureBox, Icon } from '../components';
import { getWritableAsConst } from '../helpers';
import {
    arrowsMap,
    calendarsSolidMap,
    chevronsMap,
    circlesOutlineMap,
    filesOutlineMap,
    layersSolidMap,
    locationOutlineMap,
    nationalTrustMap,
    shapesSolidMap,
    shieldsMap,
    symbolsSolidMap,
    userSolidMap,
    utilsOutlineMap,
} from '../components/Icon/maps';

import * as Chakra from '@chakra-ui/react';

const libraryType = [
    'arrows',
    'calendars',
    'chevrons',
    'circles',
    'files',
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
    const [library] = useSelect('Library', {
        options: getWritableAsConst(libraryType),
        defaultValue: 'arrows',
    });

    const [variant] = useSelect('Variant', {
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
        <FixtureBox
            hasPadding
            direction='row'
            gap='3rem'
            flexWrap='wrap'
            justifyContent='center'
            alignItems='flex-start'
        >
            {getIcons(library).map((icon) => {
                return (
                    <Chakra.VStack>
                        <Icon
                            key={`icon-fixture-${icon}`}
                            icon={icon}
                            ariaLabel={icon}
                            variant={variant}
                            w='1.5rem'
                            h='1.5rem'
                        />
                        <Chakra.Text size='0.825rem'>{icon}</Chakra.Text>
                    </Chakra.VStack>
                );
            })}
        </FixtureBox>
    );
};

export default IconFixture;
