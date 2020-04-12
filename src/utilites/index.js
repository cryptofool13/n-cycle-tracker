import { useState, useEffect } from "react";

export const today = () =>
	new Date().toDateString().split(" ").slice(1).join(" ");

export const stringify = (data) => JSON.stringify(data);

export const parse = (data) => JSON.parse(data);

export const useLocalStorage = () => {
	const [data, setData] = useState([]);

	const getData = async () => {
		let localData = parse(localStorage.getItem("n-cycle-data"));
		if (!localData) return;
		setData(localData);
	};

	useEffect(() => {
		getData();
	}, []);

	return [data, setData];
};
