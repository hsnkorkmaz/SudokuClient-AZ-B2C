import React, {useLayoutEffect, useEffect, useRef} from "react";
import DifficultyButton from "../components/game/DifficultyButton";
import Logo from "../components/game/Logo";
import gsap from "gsap";
const Main = () => {

	const buttonList = useRef();
	const q = gsap.utils.selector(buttonList);

	useEffect(() => {
		gsap.fromTo(
			q("button"),
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 0.5,
				stagger: 0.2,
			}
		);
	}, []);

	return (
		<div >
			<Logo />
			<div className="flex flex-col" ref={buttonList}>
				<DifficultyButton
					difficulty="Easy"
					extraStyle="bg-green-500 border-green-700 hover:bg-violet-500"
				/>
				<DifficultyButton
					difficulty="Medium"
					extraStyle="bg-yellow-500 border-yellow-700 hover:bg-violet-500"
				/>
				<DifficultyButton
					difficulty="Hard"
					extraStyle="bg-orange-500 border-orange-700 hover:bg-violet-500"
				/>
				<DifficultyButton
					difficulty="Challenging"
					extraStyle="bg-red-500 border-red-700 hover:bg-violet-500"
				/>
			</div>
		</div>
	);
};

export default Main;
