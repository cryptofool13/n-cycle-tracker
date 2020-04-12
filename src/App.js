import React from "react";

import Inputs from "./components/Inputs";
import Chart from "./components/Chart";
import { useLocalStorage } from "./hooks";

import dummyData from "./data";

const App = () => {
	const [data, setData] = useLocalStorage("n-cycle-data", []);

	return (
		<>
			<Inputs storage={[data, setData]} />
			<Chart data={data} />
		</>
	);
};
export default App;
