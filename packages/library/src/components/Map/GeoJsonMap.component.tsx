import { FeatureGroup, TileLayer, GeoJSON } from "react-leaflet";
import { LatLngExpression } from "leaflet";


import { colorArray } from "../../utils/colours.utils";

import { Spinner } from "../Spinner";
import { Map, MapProps } from "./Map.component";

import * as turf from "@turf/turf";

export interface GeoJSONMapProps extends Pick<MapProps, "mapConfig"> {
  geoJson: GeoJSON.FeatureCollection | GeoJSON.Feature | undefined;
  isLoading: boolean;
}

export const GeoJsonMap = ({
  geoJson,
  isLoading,
  mapConfig,
}: GeoJSONMapProps) => {
  const center: LatLngExpression = (
    geoJson
      ? turf.center(geoJson as turf.AllGeoJSON).geometry.coordinates.reverse()
      : [0, 0]
  ) as LatLngExpression;

  return isLoading ? (
    <Spinner size="xl" color="red" />
  ) : (
    <Map center={center} mapConfig={{ zoom: 4, ...mapConfig }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        {geoJson && geoJson.type === "Feature" && <GeoJSON data={geoJson} />}

        {geoJson &&
          geoJson.type === "FeatureCollection" &&
          geoJson.features.length > 0 &&
          geoJson.features.map((feature, index) => (
            <GeoJSON
              key={index}
              data={feature}
              style={{
                color:
                  colorArray[Math.floor(Math.random() * colorArray.length)],
              }}
            />
          ))}
      </FeatureGroup>
    </Map>
  );
};
