'use client';

import React, { ForwardedRef, forwardRef } from 'react';
import { Marker, TileLayer } from 'react-leaflet';
import {
    DivIcon as LeafletIcon,
    LatLngExpression,
    Marker as LeafletMarker,
} from 'leaflet';

import { Icon } from '@sam/library';

import { Map, MapProps } from './Map.component';

import * as ReactDomServer from 'react-dom/server';

import 'leaflet/dist/leaflet.css';

interface MiniMapProps extends Pick<MapProps, 'mapConfig'> {
    isMarkerDraggable?: boolean;
    eventHandlers: {
        dragend(): void;
    };
    position: LatLngExpression;
}

export const MiniMap = forwardRef(
    (
        { position, eventHandlers, isMarkerDraggable, mapConfig }: MiniMapProps,
        ref: ForwardedRef<LeafletMarker<any>>
    ) => {
        return (
            <Map
                center={position}
                mapConfig={mapConfig}
            >
                <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}' />
                <Marker
                    ref={ref}
                    draggable={isMarkerDraggable}
                    eventHandlers={eventHandlers}
                    position={position}
                    icon={
                        new LeafletIcon({
                            className: 'custom icon',
                            html: ReactDomServer.renderToString(
                                <Icon
                                    icon='location'
                                    ariaLabel='marker'
                                    boxSize={20}
                                />
                            ),
                            iconSize: [20, 20],
                        })
                    }
                />
            </Map>
        );
    }
);
