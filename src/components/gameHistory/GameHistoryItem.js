import React from "react";
import { Link } from "react-router-dom";
const GameHistoryItem = ({
	id,
	mistakes,
	score,
	timeSpent,
	solvedNumbers,
	staticNumbers,
}) => {
	return (
		<>
			<div className="flex flex-row w-full">
				<div className="px-4 py-3 bg-red-500 font-bold text-white border-red-700 border-b-8 text-l rounded-tl rounded-bl border-r text-center">
					<span className="text-xl">{mistakes}</span>
				</div>
				<div className="flex justify-between w-full px-4 py-3 text-l font-bold text-white border-b-8 bg-red-500 border-red-700">
					<span>{timeSpent}s</span>
					<span className="pl-3">{score}p</span>
				</div>
				<div className="flex justify-between w-full px-4 py-3 text-l font-bold text-white border-b-8 bg-red-500 border-red-700 rounded-tr rounded-br">


					{solvedNumbers.includes(0) && (
						<Link to={`/game/saved/${id}`}>
						<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
							<span>Continue</span>
						</button>
						</Link>
					)}

					{score === 0 &&
					<button
						className="bg-red-700 text-white font-bold py-2 px-4 rounded"
						disabled
					>
						<span>Cheated</span>
					</button>
					} 

					{!solvedNumbers.includes(0) && score !== 0 &&
					<button
						className="bg-yellow-500 text-white font-bold py-2 px-4 rounded"
						disabled
					>
						<span>Solved</span>
					</button>
					} 
				</div>
			</div>
		</>
	);
};

export default GameHistoryItem;
