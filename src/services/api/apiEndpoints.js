import apiClient from "./apiClient";

const getNewBoard = (config) =>
	apiClient.get("/SudokuGenerator/GetNewGame", config);

const solveBoard = (data, config) =>
	apiClient.post("/SudokuSolver/SolveBoard", data, config);
const validateBoard = (data, config) =>
	apiClient.post("/SudokuSolver/ValidateBoard", data, config);
const isPossible = (data, config) =>
	apiClient.post("SudokuSolver/IsPossible", data, config);

const saveGame = (data, config) =>
	apiClient.post("/SudokuGame/SaveGame", data, config);

const getGameById = (config) =>
	apiClient.get("/SudokuGame/GetGameById", config);

const getGameHistoryByUser = (config) =>
	apiClient.get("/SudokuGame/GetGameHistoryByUser", config);
const getScoreBoard = (config) =>
	apiClient.get("/SudokuGame/getScoreBoard", config);

export default {
	getNewBoard,
	solveBoard,
	validateBoard,
	isPossible,
	saveGame,
	getGameHistoryByUser,
	getScoreBoard,
	getGameById,
};
