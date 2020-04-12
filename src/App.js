import React from "react";

import NitInputs from "./components/N2Inputs";
import NitChart from "./components/charts/NitChart";
import { useLocalStorage } from "./hooks";
import PhInput from "./components/PhInput";

// import dummyData from "./data";

const App = () => {
	const [nCycle, setNCycle] = useLocalStorage("n-cycle-data", []);
	const [ph, setPh] = useLocalStorage("ph-data", [])
	
	return (
		<>
			<NitInputs storage={[nCycle, setNCycle]} />
			<NitChart data={nCycle} />
			<PhInput storage={[ph, setPh]} />
		</>
	);
};
export default App;
