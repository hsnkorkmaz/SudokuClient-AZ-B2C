import React from "react";

const SideButton = ({ number }) => {
	return (
		<div>
			<button className="w-10 h-10 p-2 mb-1 font-bold text-white bg-purple-500 border-b-4 border-purple-700 rounded hover:bg-violet-500 drop-shadow-lg">
				{number}
			</button>
		</div>
	);
};

export default SideButton;
