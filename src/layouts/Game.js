import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/game/BackButton";
import Board from "../components/game/Board";
import GameTimer from "../components/game/GameTimer";
import Toggle from "../components/game/Toggle";
import GameContext from "../contexts/GameContext";
import apiEndpoints from "../services/api/apiEndpoints";
import useApi from "../services/api/useApi";
import * as helper from "../services/Helper";
import Loading from "../components/loading/Loading";

const Game = () => {
	const { difficulty } = useParams();
	const { savedGameId } = useParams();
	const [isActive, setIsActive] = useState(true);
	const [checkErrors, setCheckErrors] = useState(true);
	const [hoverEffect, setHoverEffect] = useState(true);
	const [timeSpent, setTimeSpent] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [userNumbers, setUserNumbers] = useState([]);
	const [staticNumbers, setStaticNumbers] = useState([]);

	const gameSettings = {
		isActiveValue: isActive,
		checkErrorsValue: checkErrors,
		hoverEffectValue: hoverEffect,
		timeSpentValue: timeSpent,
		secondsValue: seconds,
		difficultyValue: difficulty,
		staticNumbersValue: staticNumbers,
		setIsActive,
		setCheckErrors,
		setHoverEffect,
		setTimeSpent,
		setSeconds,
		setStaticNumbers,
	};

	const getNewGame = useApi(() =>
		apiEndpoints.getNewBoard({
			params: {
				difficulty: helper.calculateDifficulty(difficulty),
			},
		})
	);

	const getGameById = useApi(() =>
		apiEndpoints.getGameById({
			params: {
				gameId: savedGameId,
			},
		})
	);

	useEffect(() => {
		if (savedGameId) {
			getGameById.request();
		} else {
			getNewGame.request();
		}
	}, []);

	useEffect(() => {
		if (getGameById.data) {
			setStaticNumbers(getGameById.data.staticNumbers.split("").map(Number));
			setUserNumbers(getGameById.data.solvedNumbers.split("").map(Number));
		}

		if (getNewGame.data) {
			setStaticNumbers(getNewGame.data.numbers);
			setUserNumbers(getNewGame.data.numbers);
		}
	}, [getGameById.data, getNewGame.data]);

	return (
		<GameContext.Provider value={gameSettings}>
			<div className="flex">
				{getNewGame.loading || getGameById.loading ? <Loading /> : null}
				{getNewGame.error || getGameById.error ? (
					<div>
						<p>{getNewGame.error}</p>
						<p>{getGameById.error}</p>
					</div>
				) : null}
				
				{getNewGame.data || getGameById.data ? (
					<div>
						<div className="flex justify-between">
							{getNewGame.error && <p>{getNewGame.error}</p>}
							{getGameById.error && <p>{getGameById.error}</p>}
						</div>
						<div>
							<GameTimer />
						</div>
						<div className="mt-5" />
						<div>
							<Board
								userNumbers={userNumbers}
								setUserNumbers={setUserNumbers}
							/>
						</div>
						<div className="flex flex-col justify-between m-5">
							<Toggle
								state={checkErrors}
								setState={setCheckErrors}
								text="Check Errors"
							/>
							<Toggle
								state={hoverEffect}
								setState={setHoverEffect}
								text="Hover Effect"
							/>
						</div>
						<div className="flex justify-between mt-5 ml-3">
							<BackButton />
						</div>
					</div>
				) : null}
			</div>
		</GameContext.Provider>
	);
};

export default Game;
