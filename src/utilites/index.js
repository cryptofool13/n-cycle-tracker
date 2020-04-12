import moment from "moment";

export const today = () => moment().format("M-D");

export const stringify = (data) => JSON.stringify(data);

export const parse = (data) => JSON.parse(data);
