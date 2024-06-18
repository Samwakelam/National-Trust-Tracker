import React, { ReactElement } from 'react';
import { MapContainer, MapContainerProps } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

export type MapProps = {
    children: ReactElement | ReactElement[];
    mapConfig?: Omit<MapContainerProps, 'center'>;
    center: LatLngExpression;
};

export const Map = ({ center, mapConfig, children }: MapProps) => {
    return (
        <MapContainer
            data-label='Map'
            center={center}
            zoom={6}
            scrollWheelZoom={true}
            {...mapConfig}
            style={{
                height: '100%',
                minHeight: '150px',
                width: '100%',
                marginBottom: '1rem',
                ...mapConfig?.style,
            }}
        >
            {children}
        </MapContainer>
    );
};
