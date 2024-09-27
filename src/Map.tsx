// src/Map.tsx
import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "500px",
};

const center = {
	lat: 35.6895, // Default center (Tokyo)
	lng: 139.6917,
};

const Map: React.FC = () => {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
	const [startLocation, setStartLocation] = useState("");
	const [endLocation, setEndLocation] = useState("");
	const [distance, setDistance] = useState("");
	const [duration, setDuration] = useState("");

	const handleSubmit = () => {
		if (map && startLocation && endLocation) {
			const directionsService = new google.maps.DirectionsService();
			directionsService.route(
				{
					origin: startLocation,
					destination: endLocation,
					travelMode: google.maps.TravelMode.DRIVING,
				},
				(result, status) => {
					if (status === google.maps.DirectionsStatus.OK && result) {
						setDirectionsResponse(result);
						const route = result.routes[0].legs[0];
						setDistance(route.distance?.text || "");
						setDuration(route.duration?.text || "");
					} else {
						console.error(`Error fetching directions ${result}`);
					}
				}
			);
		}
	};

	return (
		<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
			<div>
				<input type='text' placeholder='Start Location' value={startLocation} onChange={(e) => setStartLocation(e.target.value)} />
				<input type='text' placeholder='End Location' value={endLocation} onChange={(e) => setEndLocation(e.target.value)} />
				<button onClick={handleSubmit}>Get Directions</button>
				<p>Distance: {distance}</p>
				<p>Duration: {duration}</p>
			</div>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={(mapInstance) => setMap(mapInstance)}>
				{directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
			</GoogleMap>
		</LoadScript>
	);
};

export default Map;
