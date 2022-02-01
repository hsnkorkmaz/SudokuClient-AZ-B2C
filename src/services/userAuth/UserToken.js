import { tokenRequest } from "./authConfig";
import { useMsal, useAccount } from "@azure/msal-react";
import { useState, useEffect } from "react";

const UserToken = ({ setToken }) => {
	const { instance, accounts } = useMsal();
	const account = useAccount(accounts?.[0] || {});

	useEffect(() => {
		if (account) {
			//token silent
			const accessToken = instance
				.acquireTokenSilent({
					...tokenRequest,
					account: account,
				})
				.then((response) => {
					if (response.accessToken) {
						setToken(response.accessToken);
					} else {
						console.log("Error: ", response.error);
					}
				})
				.catch((error) => {
					console.error("Error in token acquisition: " + error);
				});
		} else {
			//token redirect
			const accessToken = instance
				.acquireTokenRedirect({
					...tokenRequest,
				})
				.then((response) => {
					if (response.accessToken) {
						setToken(response.accessToken);
					} else {
						console.log("Error: ", response.error);
					}
				})
				.catch((error) => {
					console.error("Error in token acquisition: " + error);
				});
		}
	}, []);

	return null;
};

export default UserToken;
