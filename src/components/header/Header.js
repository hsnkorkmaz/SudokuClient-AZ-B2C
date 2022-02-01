import React from "react";
import SudokuLogo from "../../assets/sudoku-logo.svg";
import UserMenu from "./../userAuth/UserMenu";
import { Link } from "react-router-dom";
import ScoreboardButton from "./ScoreboardButton";

const Header = () => {
	return (
		<div className="flex flex-col md:flex-row justify-between p-10">
			<Link to="/">
				<div className="flex">
					<img src={SudokuLogo} className="w-8 md:w-12 mb-6" alt="Sudoku Logo" />
					<h1 className="text-xl mb-4 ml-5 md:text-4xl font-bold text-white drop-shadow-lg">
						Sudoku Game
					</h1>
				</div>
			</Link>
			<div className="flex flex-col md:flex-row">
				<ScoreboardButton />
				<UserMenu />
			</div>
		</div>
	);
};

export default Header;
