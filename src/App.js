import React from "react";

import Inputs from "./components/Inputs";
import Chart from "./components/Chart";
import { useLocalStorage } from "./utilites";

import dummyData from "./data";

const App = () => {
	const [data, setData] = useLocalStorage();
	return (
		<>
			<Inputs storage={[data, setData]} />
			<Chart data={dummyData} />
		</>
	);
};
export default App;
