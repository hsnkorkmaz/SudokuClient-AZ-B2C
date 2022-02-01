import React, { useEffect, useRef, useLayoutEffect } from "react";
import UserToken from "../services/userAuth/UserToken";
import useApi from "../services/api/useApi";
import apiEndpoints from "../services/api/apiEndpoints";
import Loading from "../components/loading/Loading";
import GameHistoryItem from "../components/gameHistory/GameHistoryItem";
import gsap from "gsap";

const GameHistory = () => {
	const [userToken, setUserToken] = React.useState(null);
	const apiGames = useApi(() =>
		apiEndpoints.getGameHistoryByUser({
			headers: {
				Authorization: "Bearer " + userToken,
				"Content-Type": "application/json",
			},
		})
	);

	useEffect(() => {
		if (!userToken) return;
		apiGames.request();
	}, [userToken]);


	const history = useRef();
	const q = gsap.utils.selector(history);

	useLayoutEffect(() => {		
		gsap.fromTo(q(".flex-row"), {
		  opacity: 0
		}, {
		  opacity: 1,
		  duration: 1,
		  stagger: 0.1
		});

	  }, [apiGames.data]);

	return (
		<div>
			<UserToken setToken={setUserToken} />
			{apiGames.loading && <Loading />}
			{apiGames.error && <p>{apiGames.error}</p>}

			<div className="text-white w-full" ref={history}>
				{apiGames.data && (
					<div className="px-4 py-3 text-4xl font-bold text-white bg-green-500 border-b-8 border-green-700 rounded text-center">
						Game History
					</div>
				)}
				{apiGames.data &&
					apiGames.data.map((game) => {
						return (
							<GameHistoryItem 
								key={game.id}
								id={game.id}
								mistakes={game.mistakes}
								score={game.points}
								timeSpent={game.timeSpent}
								solvedNumbers={game.solvedNumbers}
								staticNumbers={game.staticNumbers}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default GameHistory;
