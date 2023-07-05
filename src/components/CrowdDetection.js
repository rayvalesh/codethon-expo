import React from "react";

const CrowdDetection = ({ males, females }) => {
	return (
		<div className="grid grid-cols-2 gap-8">
			<div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
				<h2 className="text-lg font-bold mb-2">Males</h2>
				<p>{males}</p>
			</div>
			<div className="bg-pink-500 text-white p-4 rounded-lg shadow-lg">
				<h2 className="text-lg font-bold mb-2">Females</h2>
				<p>{females}</p>
			</div>
		</div>
	);
};

export default CrowdDetection;