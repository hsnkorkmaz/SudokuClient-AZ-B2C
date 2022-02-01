import React from "react";
import useApi from "../../services/api/useApi";
import apiEndpoints from "../../services/api/apiEndpoints";
import { useEffect } from "react";

const CheckSolutionButton = ({ userNumbers, isActive, setIsActive }) => {
	const solveApi = useApi(() =>
		apiEndpoints.validateBoard({ numbers: [...userNumbers] }, {})
	);
	const [isSet, setIsSet] = React.useState(false);

	const handleClick = () => {
		if (!isSet) {
			solveApi.request();
		}
	};

	useEffect(() => {
		if (solveApi.data?.isValid && !isSet) {
			setIsActive(false);
			setIsSet(true);
		}
	}, [solveApi]);
	return (
		<div>
			{isActive && (
				<button
					onClick={handleClick}
					className="p-2 font-bold text-white bg-purple-500 border-b-4 border-purple-700 rounded hover:bg-violet-500 drop-shadow-lg"
					disabled={userNumbers.includes(0) ? true : false}
				>
					Check Solution
				</button>
			)}
		</div>
	);
};

export default CheckSolutionButton;
