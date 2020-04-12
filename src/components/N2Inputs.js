import React, { useState } from "react";

import { today } from "../utilites";

const NitInputs = ({ storage }) => {
	const [newNH3, setNH3] = useState("");
	const [newNO2, setNO2] = useState("");
	const [newNO3, setNO3] = useState("");

	const [oldData, setData] = storage;

	const addData = () => {
		const newData = {
			date: today(),
			nh3: newNH3,
			no2: newNO2,
			no3: newNO3,
		};
		console.log(oldData, newData);
		clearInputs();
		setData([...oldData, newData]);
	};

	const clearInputs = () => {
		setNH3("");
		setNO2("");
		setNO3("");
	};

	return (
		<>
			<label htmlFor="NH3">Ammonia: </label>
			<input
				id="NH3"
				placeholder="(ppm x 10)"
				type="text"
				value={newNH3}
				onChange={(e) => setNH3(e.target.value)}
			/>
			<br />
			<label htmlFor="NO2">Nitrite: </label>
			<input
				id="NO2"
				placeholder="(ppm x 10)"
				type="text"
				value={newNO2}
				onChange={(e) => setNO2(e.target.value)}
			/>
			<br />
			<label htmlFor="NO3">Nitrate: </label>
			<input
				id="NO3"
				placeholder="(ppm)"
				type="text"
				value={newNO3}
				onChange={(e) => setNO3(e.target.value)}
			/>
			<br />
			<button onClick={addData}>Save Cycle</button>
		</>
	);
};

export default NitInputs;
