import React from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const DifficultyButton = ({ difficulty, extraStyle }) => {
	const onEnter = ({ currentTarget }) => {
		gsap.to(currentTarget, { scale: 1.1, duration: 0.1 });
	};

	const onLeave = ({ currentTarget }) => {
		gsap.to(currentTarget, { scale: 1, duration: 0.1 });
	};

	return (
		<Link to={`/game/${difficulty}`}>
			<button
				type="button"
				className={`${extraStyle} text-white font-bold py-3 px-4 border-b-8 rounded drop-shadow-lg mt-4 text-2xl w-full`}
				onMouseEnter={onEnter}
				onMouseLeave={onLeave}
			>
				{difficulty}
			</button>
		</Link>
	);
};

export default DifficultyButton;
