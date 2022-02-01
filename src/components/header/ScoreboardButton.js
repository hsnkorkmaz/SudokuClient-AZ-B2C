import React from "react";
import { Link } from "react-router-dom";

const ScoreboardButton = () => {
	return (
		<Link to="/scoreboard">
			<h5 className="p-2 md:mr-4 font-bold text-white bg-pink-500 border-b-4 border-pink-700 rounded hover:bg-violet-500 drop-shadow-lg">
				Scoreboard
			</h5>
		</Link>
	);
};

export default ScoreboardButton;
