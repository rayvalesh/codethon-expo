import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const AgeStats = ({ ageGroups }) => {
	const chartData = {
		labels: ageGroups.map((group) => group.range),
		datasets: [
			{
				label: "Number of People",
				data: ageGroups.map((group) => group.count),
				backgroundColor: "rgba(79,192,192,0.6)",
			},
		],
	};

	const chartOptions = {
		indexAxis: "y",
		scales: {
			x: {
				ticks: {
					display: true,
				},
				grid: {
					display: false,
				},
				beginAtZero: true,
			},
			y: {
				beginAtZero: true,
				maxBarThickness: 20,
			},
		},
	};

	return (
		<div className="flex ">
			<div style={{ width: "66.66%" }}>
				<Bar data={chartData} options={chartOptions} />
			</div>
		</div>
	);
};

export default AgeStats;