import { Box } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
interface HotelInteractiveMapProps {
  latitude: number;
  longitude: number;
}
const HotelInteractiveMap: React.FC<HotelInteractiveMapProps> = ({
  latitude,
  longitude,
}) => {
  const position: [number, number] = [latitude, longitude];
  return (
    <Box sx={{ height: 400, borderRadius: 2, overflow: "hidden", mt: 3 }}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default HotelInteractiveMap;
