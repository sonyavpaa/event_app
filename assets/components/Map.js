import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = (props) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
    props?.streetname +
    " " +
    props?.postalCode +
    " " +
    props?.city;

  useEffect(() => {
    const getCoords = async () => {
      const res = await axios.get(url);
      const numberLat = Number(res?.data[0]?.lat);
      const numberLong = Number(res?.data[0]?.lon);
      setLatitude(numberLat);
      setLongitude(numberLong);
    };
    getCoords();
  });

  const position = [latitude, longitude];

  return position[0] && position[1] ? (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {props?.event?.name}
          <br /> {props?.venue}
          {props?.streetname && props?.streetname} {props.postalCode}{" "}
          {props.city}
        </Popup>
      </Marker>
    </MapContainer>
  ) : (
    <p>Loading map</p>
  );
};

export default Map;
