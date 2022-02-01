import React from "react";
import {
	useEffect,
	useState,
	useLayoutEffect,
	useRef,
	useContext,
} from "react";
import Cell from "./Cell";
import apiEndpoints from "../../services/api/apiEndpoints";
import SolveButton from "./SolveButton";
import CheckSolutionButton from "./CheckSolutionButton";
import UserToken from "../../services/userAuth/UserToken";
import gsap from "gsap";
import GameContext from "../../contexts/GameContext";
import { useIsAuthenticated } from "@azure/msal-react";
import * as helper from "../../services/Helper";

const Board = ({ userNumbers, setUserNumbers }) => {
	const isAuthenticated = useIsAuthenticated();
	const game = useContext(GameContext);

	const [solvedNumbers, setSolvedNumbers] = useState([]);
	const [rowHover, setRowHover] = React.useState(null);
	const [colHover, setColHover] = React.useState(null);
	const [boxHover, setBoxHover] = React.useState(null);
	const [incorrectEntries, setIncorrectEntries] = React.useState(0);
	const [userToken, setUserToken] = useState(null);

	useEffect(() => {
		if (!userToken) return;

		if (!game.isActiveValue) {
			let points = 0;
			let numbers = [];
			if (solvedNumbers.length === 0) {
				points = helper.calculatePoints(
					incorrectEntries,
					game.timeSpentValue,
					game.difficultyValue
				);
				numbers = [...userNumbers];
			} else {
				points = 0;
				numbers = [...solvedNumbers];
			}

			let data = {
				points: Math.floor(points),
				timeSpent: game.timeSpentValue,
				difficulty: helper.calculateDifficulty(game.difficultyValue),
				mistakes: incorrectEntries,
				staticNumbers: game.staticNumbersValue,
				solvedNumbers: numbers,
				finished: true,
			};

			let config = {
				headers: {
					Authorization: "Bearer " + userToken,
					"Content-Type": "application/json",
				},
			};

			apiEndpoints.saveGame(data, config);
		}
	}, [game.isActiveValue]);

	const cellList = useRef();
	const q = gsap.utils.selector(cellList);
	useLayoutEffect(() => {
	/* 	gsap.from(
			q("input"),
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 0.5,
				stagger: 0.02,
			}
		)
 */

		gsap.from(q("input"), {
			opacity: 0,
			stagger: { // wrap advanced options in an object
			  each: 0.05,
			  opacity: 1,
    	      from: "random",
			  grid: "auto",
			  ease: "power2.inOut",
			 
			}
		  });
	}, [game.staticNumbersValue]);


useLayoutEffect(() => {
	gsap.from(q("input"), {
		opacity: 0,
		stagger: { // wrap advanced options in an object
		  each: 0.2,
		  opacity: 1,
		  ease: "power2.inOut",
		  grid: [9,9],
		  from: 0,
		 
		}
	  });
}, [solvedNumbers]);
	

	return (
		<div className="" ref={cellList}>
			{isAuthenticated && <UserToken setToken={setUserToken} />}
			<div
				className={`grid grid-cols-9 border-2 border-black bg-white rounded-2xl p-2 ${
					game.isActiveValue
						? ""
						: "opacity-30 pointer-events-none animate-pulse"
				}`}
			>
				{solvedNumbers.length <= 0 &&
					game.staticNumbersValue.map((number, index) => {
						let userNumber = number;
						let isStatic = false;
						if (userNumber !== 0) {
							isStatic = true;
						}
						if (userNumbers[index] !== number) {
							userNumber = userNumbers[index];
						}

						return (
							<Cell
								key={index}
								index={index}
								staticNumbers={game.staticNumbersValue}
								userNumbers={userNumbers}
								setUserNumbers={setUserNumbers}
								value={userNumber}
								isStatic={isStatic}
								setRowHover={setRowHover}
								rowHover={rowHover}
								setColHover={setColHover}
								colHover={colHover}
								setBoxHover={setBoxHover}
								boxHover={boxHover}
								incorrectEntries={incorrectEntries}
								setIncorrectEntries={setIncorrectEntries}
							/>
						);
					})}

				{solvedNumbers.length > 0 &&
					solvedNumbers.map((number, index) => {
						return (
							<Cell
								key={index}
								index={index}
								staticNumbers={game.staticNumbersValue}
								userNumbers={userNumbers}
								setUserNumbers={setUserNumbers}
								value={number}
								isStatic={number === 0 ? false : true}
								setRowHover={setRowHover}
								rowHover={rowHover}
								setColHover={setColHover}
								colHover={colHover}
								setBoxHover={setBoxHover}
								boxHover={boxHover}
								incorrectEntries={incorrectEntries}
								setIncorrectEntries={setIncorrectEntries}
							/>
						);
					})}
			</div>
			<div className="flex justify-between mt-2 ml-2">
				<SolveButton
					staticNumbers={game.staticNumbersValue}
					setSolvedNumbers={setSolvedNumbers}
					isActive={game.isActiveValue}
					setIsActive={game.setIsActive}
				/>
				<CheckSolutionButton
					userNumbers={userNumbers}
					isActive={game.isActiveValue}
					setIsActive={game.setIsActive}
				/>
			</div>
		</div>
	);
};

export default Board;
