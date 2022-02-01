import React, { useState, useEffect, useContext } from "react";
import GameContext from "../../contexts/GameContext";
const GameTimer = () => {
	const game = useContext(GameContext);

	function calculateDisplayTime(passedSeconds) {
		let display = "";
		let minutes = Math.floor(passedSeconds / 60);
		let seconds = passedSeconds % 60;
		display = minutes + "m " + seconds + "s";
		return display;
	}

	function toggle() {
		game.setIsActive(!game.isActiveValue);
	}

	function reset() {
		game.setSeconds(0);
		game.setIsActive(false);
	}

	useEffect(() => {
		let interval = null;
		if (game.isActiveValue) {
			interval = setInterval(() => {
				game.setTimeSpent(game.secondsValue + 1);
				game.setSeconds(game.secondsValue + 1);
			}, 1000);
		} else if (!game.isActiveValue && game.secondsValue !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [game.isActiveValue, game.secondsValue]);

	return (
		<div className="flex justify-center">
			<div className="mr-5 text-4xl text-white">
				{calculateDisplayTime(game.secondsValue)}
			</div>
			<div className="flex justify-center">
				<button onClick={toggle}>
					{game.isActiveValue ? (
						<svg
							fill="currentColor"
							stroke="currentColor"
							x="0px"
							y="0px"
							className="w-8 h-8 fill-white"
							viewBox="0 0 512 512"
						>
							<path
								d="M256,0C114.617,0,0,114.615,0,256s114.617,256,256,256s256-114.615,256-256S397.383,0,256,0z M224,320
                                    c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z M352,320
                                    c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z"
							/>
						</svg>
					) : (
						<svg
							x="0px"
							y="0px"
							className="w-8 h-8 fill-white"
							viewBox="0 0 408.221 408.221"
						>
							<path
								d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11
                                            C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012
                                            c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"
							/>
						</svg>
					)}
				</button>
			</div>
		</div>
	);
};

export default GameTimer;
