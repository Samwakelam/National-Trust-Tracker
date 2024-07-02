'use client';

import React, { forwardRef, ForwardedRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {
    LatLngExpression,
    Map as LeafletMap,
    Marker as LeafletMarker,
    divIcon,
} from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

// MARK: Types

type MapProps = {
    position: LatLngExpression;
    zoom?: number;
};

// MARK: Component

export const Map = forwardRef(
    (
        { position, zoom = 8 }: MapProps,
        ref: ForwardedRef<LeafletMap | null>
    ) => {
        // MARK: Variables

        // MARK: State

        // MARK: Handlers

        // MARK: Effects

        // MARK: Return

        return (
            <MapContainer
                center={position}
                zoom={zoom}
                scrollWheelZoom={true}
                ref={ref}
                className='w-full h-full rounded-12 [&>.leaflet-pane]:z-0 [&_.leaflet-top]:z-0 [&_.leaflet-left]:z-0 [&_.leaflet-right]:z-0 [&_.leaflet-bottom]:z-0'
                data-label='map'
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker
                    position={position}
                    draggable={false}
                />
            </MapContainer>
        );
    }
);
