import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../services/userAuth/authConfig";

function handleLogin(instance) {
	instance.loginPopup(loginRequest).catch((e) => {
		console.error(e);
	});
}

const SignInButton = () => {
	const { instance } = useMsal();

	return (
		<button
			className="w-full p-2 font-bold text-white bg-purple-500 border-b-4 border-purple-700 rounded hover:bg-violet-500 drop-shadow-lg"
			onClick={() => handleLogin(instance)}
		>
			Sign In / Sign Up
		</button>
	);
};

export default SignInButton;
