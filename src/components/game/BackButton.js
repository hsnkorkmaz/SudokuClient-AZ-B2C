import React from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
	return (
		<Link to="/">
			<button className="p-2 font-bold text-white bg-purple-500 border-b-4 border-purple-700 rounded hover:bg-violet-500 drop-shadow-lg">
				Back to Home
			</button>
		</Link>
	);
};

export default BackButton;
