import React, { useState } from "react";
import { GoogleMap, LoadScript, DistanceMatrixService } from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "500px",
};

const center = {
	lat: 35.6895, // Default center (Tokyo)
	lng: 139.6917,
};

const DistanceMatrix: React.FC = () => {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [startLocation, setStartLocation] = useState("");
	const [endLocation, setEndLocation] = useState("");
	const [distance, setDistance] = useState("");
	const [duration, setDuration] = useState("");
	const [requestMade, setRequestMade] = useState(false); // Track if the request is made

	const handleSubmit = () => {
		if (map && startLocation && endLocation) {
			setRequestMade(true);
		}
	};

	const handleDistanceMatrixResponse = (response: google.maps.DistanceMatrixResponse | null, status: google.maps.DistanceMatrixStatus) => {
		if (status === "OK" && response) {
			const result = response.rows[0].elements[0];
			if (result.status === "OK") {
				setDistance(result.distance?.text || "");
				setDuration(result.duration?.text || "");
			} else {
				console.error(`Distance Matrix request failed due to: ${result.status}`);
			}
		} else {
			console.error(`Error in Distance Matrix response: ${status}`);
		}
	};

	return (
		<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
			<div>
				<input type='text' placeholder='Start Location' value={startLocation} onChange={(e) => setStartLocation(e.target.value)} />
				<input type='text' placeholder='End Location' value={endLocation} onChange={(e) => setEndLocation(e.target.value)} />
				<button onClick={handleSubmit}>Get Distance</button>
				<p>Distance: {distance}</p>
				<p>Duration: {duration}</p>
			</div>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={(mapInstance) => setMap(mapInstance)}>
				{requestMade && startLocation && endLocation && (
					<DistanceMatrixService
						options={{
							origins: [startLocation],
							destinations: [endLocation],
							travelMode: google.maps.TravelMode.DRIVING,
						}}
						callback={handleDistanceMatrixResponse}
					/>
				)}
			</GoogleMap>
		</LoadScript>
	);
};

export default DistanceMatrix;
