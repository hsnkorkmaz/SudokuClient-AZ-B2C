import React from "react";
import SideNumber from "./SideNumber";

const SideButtons = () => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	return (
		<>
			{numbers.map((number, index) => {
				return <SideNumber key={index} number={number} />;
			})}
		</>
	);
};

export default SideButtons;
