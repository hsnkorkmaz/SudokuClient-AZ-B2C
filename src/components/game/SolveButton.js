import React from "react";
import useApi from "../../services/api/useApi";
import apiEndpoints from "../../services/api/apiEndpoints";
import { useEffect } from "react/cjs/react.development";

const SolveButton = ({
	staticNumbers,
	setSolvedNumbers,
	isActive,
	setIsActive,
}) => {
	
	const solveApi = useApi(() =>
		apiEndpoints.solveBoard({ numbers: [...staticNumbers] }, {})
	);
	const [isSet, setIsSet] = React.useState(false);

	const handleClick = () => {
		if (!isSet) {
			solveApi.request();
		}
	};

	useEffect(() => {
		if (solveApi.data && !isSet) {
			setSolvedNumbers([...solveApi.data.numbers]);
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
				>
					Solve
				</button>
			)}
		</div>
	);
};

export default SolveButton;
