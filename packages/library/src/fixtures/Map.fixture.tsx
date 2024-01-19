/* eslint-disable no-useless-computed-key */
// Note: React must be declared in all files for cosmos to work
import React, { ReactElement, useRef } from 'react';
import { LatLngExpression, Marker as LeafletMarker } from 'leaflet';

// Note: Full paths must be used in all files for cosmos to work
import { FixtureBox } from '../components';
import { MiniMap } from '../components/Map';

import * as Chakra from '@chakra-ui/react';

const position: LatLngExpression = [-6.04, 106.93];

const MapFixture = ({ children }: { children: ReactElement }) => {
    return (
        <FixtureBox
            hasPadding
            gap='1rem'
        >
            <Chakra.Box
                height='256px'
                width='256px'
            >
                {children}
            </Chakra.Box>
        </FixtureBox>
    );
};

export default {
    ['Mini Map']: () => {
        const markerRef = useRef<LeafletMarker<any>>(null);
        return (
            <MapFixture>
                <>
                    {/* <MiniMap
                    ref={markerRef}
                    eventHandlers={{
                        dragend: () => {},
                    }}
                    position={position}
                /> */}
                </>
            </MapFixture>
        );
    },
};
