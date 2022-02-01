import React, { useEffect, useRef, useLayoutEffect } from "react";
import useApi from "../services/api/useApi";
import apiEndpoints from "../services/api/apiEndpoints";
import Loading from "../components/loading/Loading";
import gsap from "gsap";

const Scoreboard = () => {
	const apiScoreboard = useApi(() => apiEndpoints.getScoreBoard());

	const scoreStyles = [
		{
			color: "bg-red-500",
			borderColor: "border-red-700",
			textSize: "text-6xl",
		},
		{
			color: "bg-orange-500",
			borderColor: "border-orange-700",
			textSize: "text-5xl",
		},
		{
			color: "bg-yellow-500",
			borderColor: "border-yellow-700",
			textSize: "text-4xl",
		},
		{
			color: "bg-green-500",
			borderColor: "border-green-700",
			textSize: "text-3xl",
		},
		{
			color: "bg-lime-500",
			borderColor: "border-lime-700",
			textSize: "text-2xl",
		},
	];

	useEffect(() => {
		apiScoreboard.request();
	}, []);

	const scoreList = useRef();
	const q = gsap.utils.selector(scoreList);

	useLayoutEffect(() => {
		gsap.fromTo(
			q(".flex-row"),
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 1,
				stagger: 0.1,
			}
		);
	}, [apiScoreboard.data]);

	return (
		<div>
			{apiScoreboard.loading && <Loading />}
			{apiScoreboard.error && <p>{apiScoreboard.error}</p>}

			<div className="w-auto">
				{apiScoreboard.data && (
					<div className="px-4 py-3 mt-4 text-4xl font-bold text-white bg-green-500 border-b-8 border-green-700 rounded text-center">
						Scoreboard
					</div>
				)}
				<div ref={scoreList}>
					{apiScoreboard.data &&
						apiScoreboard.data.map((player, index) => {
							return (
								<div key={index} className="flex flex-row">
									<div
										className={`px-4 py-3 ${scoreStyles[index].textSize} font-bold text-white ${scoreStyles[index].color} border-b-8 ${scoreStyles[index].borderColor} rounded-tl rounded-bl`}
									>
										{index + 1}
										<span className="text-xl">st</span>
									</div>
									<div
										className={`flex justify-between w-full px-4 py-3 text-2xl font-bold text-white border-b-8 ${scoreStyles[index].color} ${scoreStyles[index].borderColor} rounded-tr rounded-br`}
									>
										<span>{player.displayName}</span>
										<span className="pl-3">{player.score}p</span>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default Scoreboard;
