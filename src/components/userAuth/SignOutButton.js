import React from "react";
import { useMsal } from "@azure/msal-react";

function handleLogout(instance) {
	instance.logoutPopup().catch((e) => {
		console.error(e);
	});
}

const SignOutButton = () => {
	const { instance } = useMsal();
	return (
		<div>
			<button
				className="w-full p-2 font-bold text-white bg-purple-500 border-b-4 border-purple-700 rounded hover:bg-violet-500 drop-shadow-lg"
				onClick={() => handleLogout(instance)}
			>
				Sign Out
			</button>
		</div>
	);
};

export default SignOutButton;
