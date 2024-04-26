import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import * as L from "leaflet";
import customMarker from "../src/assets/images/icon-location.svg";
import PropTypes from "prop-types";

Map.propTypes = {
  data: PropTypes.any,
};

function Map({ data }) {
  const customIcon = new L.icon({
    iconUrl: customMarker,
    iconRetinaUrl: customMarker,
    iconSize: [40, 50],
    popupAnchor: [-0, -0],
  });
  const position = [data?.latitude, data?.longitude];

  return (
    <div className="map-container">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>{data?.region}</Popup>
        </Marker>
        <ChangeCenter position={position} />
      </MapContainer>
    </div>
  );
}

ChangeCenter.propTypes = {
  position: PropTypes.array,
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
