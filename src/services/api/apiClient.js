import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://localhost:44323/api",
});

export default apiClient;
