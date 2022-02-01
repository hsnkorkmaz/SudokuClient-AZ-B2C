import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { useMsal } from "@azure/msal-react";
import { Link } from "react-router-dom";
const UserMenu = () => {
	const isAuthenticated = useIsAuthenticated();
	const { accounts } = useMsal();
	const name = accounts[0] && accounts[0].name;
	return (
		<>
			<Link to="/gameHistory">
				{isAuthenticated ? (
					<h5 className="p-2 md:mr-4 font-bold text-white bg-pink-500 border-b-4 border-pink-700 rounded hover:bg-violet-500 drop-shadow-lg">
						{name}
					</h5>
				) : null}
			</Link>
			<div>{isAuthenticated ? <SignOutButton /> : <SignInButton />}</div>
		</>
	);
};

export default UserMenu;
