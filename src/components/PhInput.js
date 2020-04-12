import React, { useState } from "react";

import { today } from "../utilites";

const PhInput = ({ storage }) => {
	const [ph, setPh] = useState("");

	const [oldData, setData] = storage;

	const addData = () => {
		const newData = {
			date: today(),
			ph,
		};

		setPh("");
		setData([...oldData, newData]);
	};

	return (
		<>
			<label htmlFor="ph">pH: </label>
			<input
				type="text"
				placeholder="(0 - 14)"
				value={ph}
				onChange={(e) => setPh(e.target.value)}
			/>
			<button onClick={addData}>Save Ph</button>
		</>
	);
};

export default PhInput;
