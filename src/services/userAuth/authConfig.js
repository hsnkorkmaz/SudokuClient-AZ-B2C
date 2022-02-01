import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
	auth: {
		clientId: process.env.REACT_APP_ADB2C_CLIENT_ID,
		authority: process.env.REACT_APP_ADB2C_AUTHORITY,
		redirectUri: process.env.REACT_APP_ADB2C_REDIRECT_URI,
		scopes: process.env.REACT_APP_ADB2C_LOGIN_SCOPES.split(','),
		clientSecret: process.env.REACT_APP_ADB2C_CLIENT_SECRET,
		knownAuthorities: process.env.REACT_APP_ADB2C_KNOWN_AUTHORITIES.split(","),
		postLogoutRedirectUri: process.env.REACT_APP_ADB2C_REDIRECT_URI,
	},
	cache: {
		cacheLocation: "localStorage",
		storeAuthStateInCookie: false,
	},
	system: {
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case LogLevel.Error:
						console.error(message);
						return;
					case LogLevel.Info:
						console.info(message);
						return;
					case LogLevel.Verbose:
						console.debug(message);
						return;
					case LogLevel.Warning:
						console.warn(message);
						return;
				}
			},
		},
	},
};

export const loginRequest = {
	scopes: process.env.REACT_APP_ADB2C_LOGIN_SCOPES.split(','),
};

export const tokenRequest = {
	scopes: process.env.REACT_APP_ADB2C_TOKEN_SCOPES.split(','),
	forceRefresh: false,
};

export const editProfile = {
	authority: "",
};

export const policyNames = {
	signUpSignIn: process.env.REACT_APP_ADB2C_SIGNUP_SIGNIN_POLICY,
};

export const graphConfig = {
	graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me",
};
