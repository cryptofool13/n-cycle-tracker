import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const NitChart = ({ data }) => (
	<>
		<h3>Nitrogen Cycle</h3>
		<LineChart
			width={500}
			height={300}
			data={data}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
			}}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="date" left={{ top: 20 }} />
			<YAxis />
			<Tooltip />
			<Legend verticalAlign="top" />
			<Line
				type="monotone"
				dataKey="nh3"
				stroke="#8884d8"
				activeDot={{ r: 4 }}
			/>
			<Line
				activeDot={{ r: 4 }}
				type="monotone"
				dataKey="no2"
				stroke="#82ca9d"
			/>
			<Line
				activeDot={{ r: 4 }}
				type="monotone"
				dataKey="no3"
				stroke="#45afaa"
			/>
		</LineChart>
	</>
);

export default NitChart;
