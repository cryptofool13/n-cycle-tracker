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

const PhChart = ({data}) => (
	<>
		<h3>pH</h3>
		<LineChart
			width={500}
			height={200}
			data={data}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
			}}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="date" left={{ top: 20 }} />
			<YAxis domain={[0,14]} interval={0} />
			<Tooltip />
			<Legend verticalAlign="top" />
			<Line
				type="monotone"
				dataKey="ph"
				stroke="#61b4ff"
				activeDot={{ r: 4 }}
			/>
		</LineChart>
    {console.log("data", data)}
	</>
);

export default PhChart;
