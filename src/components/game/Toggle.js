import React from "react";

const Toggle = ({ state, setState, text }) => {
	const handleChange = (e) => {
		setState(e.target.checked);
	};
	return (
		<div>
			<label htmlFor={text} className="flex text-lg text-white">
				<input
					id={text}
					type="checkbox"
					checked={state}
					onChange={handleChange}
					className="relative top-0 left-0 w-16 h-8 m-1 transition duration-200 bg-white rounded-full appearance-none cursor-pointer drop-shadow-md bg-opacity-5 checked:bg-pink-500 after:absolute after:h-8 after:w-8 after:rounded-full after:bg-violet-600 after:left-0 after:top-0 after:transform after:scale-110 after:duration-200 after:checked:transform after:checked:scale-100 after:checked:duration-200 after:checked:translate-x-8"
				/>
				<span className="ml-2">{text}</span>
			</label>
		</div>
	);
};

export default Toggle;
