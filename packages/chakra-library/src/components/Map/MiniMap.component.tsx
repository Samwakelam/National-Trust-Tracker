import React, { ForwardedRef, forwardRef } from 'react';
import { Marker, TileLayer } from 'react-leaflet';
import { LatLngExpression, Marker as LeafletMarker } from 'leaflet';

import { Map, MapProps } from './Map.component';

export interface MiniMapProps extends Pick<MapProps, 'mapConfig'> {
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
                />
            </Map>
        );
    }
);
