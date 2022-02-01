import React from "react";
import { useEffect, useContext } from "react";
import apiEndpoints from "../../services/api/apiEndpoints";
import GameContext from "../../contexts/GameContext";

const Cell = ({
	index,
	value,
	isStatic,
	userNumbers,
	setUserNumbers,
	setRowHover,
	rowHover,
	setColHover,
	colHover,
	setBoxHover,
	boxHover,
	incorrectEntries,
	setIncorrectEntries,
}) => {
	const filledStyle = `bg-pink-500 border-pink-700 hover:bg-violet-500 
    text-white text-center font-bold text-xl p-2 border-b-2 rounded drop-shadow-lg w-11 h-11 cursor-pointer m-px`;
	const unfilledStyle = `bg-cyan-500 border-cyan-700 hover:bg-violet-500 
    text-white text-center font-bold text-xl p-2 border-b-2 rounded drop-shadow-lg w-11 h-11 cursor-pointer m-px`;
	const wrongStyle = `bg-red-500 border-red-700 hover:bg-violet-500 
    text-white text-center font-bold text-xl p-2 border-b-2 rounded drop-shadow-lg w-11 h-11 cursor-pointer m-px`;
	const correctStyle = `bg-green-500 border-green-700 hover:bg-violet-500 
    text-white text-center font-bold text-xl p-2 border-b-2 rounded drop-shadow-lg w-11 h-11 cursor-pointer m-px`;

	const game = useContext(GameContext);

	const gridSize = 9;
	const [inputValue, setInputValue] = React.useState(value);
	const [currentClass, setCurrentClass] = React.useState("");
	const [boxStyle, setBoxStyle] = React.useState("");
	const [rowIndex, setRowIndex] = React.useState(Math.floor(index / gridSize));
	const [colIndex, setColIndex] = React.useState(index % gridSize);
	const [boxIndex, setBoxIndex] = React.useState(index % gridSize); //TODO: fix this

	useEffect(() => {
		if (rowIndex % 3 === 0 && rowIndex !== 0) {
			setBoxStyle(" border-t-2 border-t-black");
		}
		if (colIndex % 3 === 0 && colIndex !== 0) {
			setBoxStyle(" border-l-2 border-l-black");
		}
		if (
			rowIndex % 3 === 0 &&
			rowIndex !== 0 &&
			colIndex % 3 === 0 &&
			colIndex !== 0
		) {
			setBoxStyle(" border-l-2 border-l-black border-t-2 border-t-black");
		}
	}, []);

	useEffect(() => {
		if (isStatic) return;

		if (game.checkErrorsValue) {
			let tempNumbers = [...userNumbers];
			tempNumbers[index] = 0;
			checkIfPossible(tempNumbers, index, inputValue);
		} else if (!game.checkErrorsValue && inputValue !== 0) {
			setCurrentClass(unfilledStyle);
		}
	}, [game.checkErrorsValue]);

	useEffect(() => {
		if (inputValue == "0") {
			setCurrentClass(unfilledStyle);
		} else {
			if (!game.checkErrorsValue) {
				setCurrentClass(unfilledStyle);
			} else {
				setCurrentClass(filledStyle);
			}
		}
	}, [inputValue]);

	const checkIfPossible = (numbers, i, val) => {
		if (val == 0) {
			return true;
		}

		const data = {
			numbers: numbers,
			index: i,
			value: val,
		};
		const response = apiEndpoints.isPossible(data).then((res) => {
			if (res.data.isPossible) {
				setCurrentClass(correctStyle);
			} else {
				setIncorrectEntries((incorrectEntries) => incorrectEntries + 1);
				setCurrentClass(wrongStyle);
			}
		});
		updateUserNumbers(val);
	};

	const handleChange = (e) => {
		if (e.target.value == "" || e.target.value == null) {
			setInputValue(0);
			updateUserNumbers(0);
		} else {
			setInputValue(parseInt(e.target.value));
			if (game.checkErrorsValue) {
				checkIfPossible(userNumbers, index, parseInt(e.target.value));
			} else {
				updateUserNumbers(e.target.value);
			}
		}
	};

	const updateUserNumbers = (value) => {
		let numbers = [...userNumbers];
		numbers[index] = parseInt(value);
		setUserNumbers(numbers);
	};

	const handleFocus = (e) => {
		e.target.select();
	};

	const handleKeyPress = (e) => {
		if (!/[0-9]/.test(e.key)) {
			e.preventDefault();
		}
	};

	const handleMouseEnter = () => {
		setRowHover(rowIndex);
		setColHover(colIndex);
		setBoxHover(boxIndex);
	};

	const handleMouseLeave = () => {
		setRowHover(null);
		setColHover(null);
		setBoxHover(null);
	};

	return (
		<div>
			<input
				type="text"
				maxLength="1"
				onFocus={handleFocus}
				onKeyPress={handleKeyPress}
				onChange={handleChange}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				value={inputValue === 0 ? "" : inputValue}
				className={
					game.hoverEffectValue
						? (rowHover !== null && rowHover === rowIndex) ||
						  (colHover !== null && colHover === colIndex) ||
						  (boxHover !== null && boxHover === boxIndex)
							? currentClass + " bg-orange-400 transition " + boxStyle
							: currentClass + boxStyle
						: currentClass + boxStyle
				}
				readOnly={isStatic}
			/>
		</div>
	);
};

export default Cell;
