import React from "react";
import Main from "./layouts/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Game from "./layouts/Game";
import GameHistory from "./layouts/GameHistory";
import Scoreboard from "./layouts/Scoreboard";

const App = () => {
	return (
		<Router>
			<div className="min-h-screen bg-indigo-800">
				<Header />
				<div className="flex items-center justify-center mt-10">
					<Routes>
						<Route exact path="/" element={<Main />} />
						<Route exact path="/game/:difficulty" element={<Game />} />
						<Route exact path="/game/saved/:savedGameId" element={<Game />} />
						<Route exact path="/gameHistory" element={<GameHistory />} />
						<Route exact path="/scoreboard" element={<Scoreboard />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
