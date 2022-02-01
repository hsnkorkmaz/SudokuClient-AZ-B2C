import { useState } from "react";

const useApi = (apiFunction) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const request = async () => {
		setLoading(true);
		try {
			const result = await apiFunction();
			setData(result.data);
		} catch (err) {
			setError(err.message || "Unexpected Error!");
		} finally {
			setLoading(false);
		}
	};

	return {
		data,
		error,
		loading,
		request,
	};
};

export default useApi;
