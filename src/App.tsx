import React from "react";
import Directions from "./Directions";
import DistanceMatrix from "./DistanceMatrix";

import { DistanceMatrixService } from "@react-google-maps/api";

const App: React.FC = () => {
	return (
		<div>
			{/* <h1>Google Maps Directions</h1>
			<Directions /> */}
			<h1>Google Maps Distance Matrix</h1>
			<DistanceMatrix />
		</div>
	);
};

export default App;
