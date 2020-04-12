import React from "react";

import { useLocalStorage } from "./hooks";
import NitInputs from "./components/N2Inputs";
import PhInput from "./components/PhInput";
import NitChart from "./components/charts/NitChart";
import PhChart from "./components/charts/PhChart";
// import dummyData from "./data";

const App = () => {
	const [nCycle, setNCycle] = useLocalStorage("n-cycle-data", []);
	const [ph, setPh] = useLocalStorage("ph-data", []);

	return (
		<>
			<NitInputs storage={[nCycle, setNCycle]} />
			<NitChart data={nCycle} />
			<PhInput storage={[ph, setPh]} />
			<PhChart data={ph} />
		</>
	);
};
export default App;
