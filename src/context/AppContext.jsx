/* eslint-disable react/prop-types */
import {createContext, useContext, useState} from "react";
import runChat from "../config/AiBot";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [data, setData] = useState("");
	const [input, setInput] = useState("");
	const [recentPrompt, setRecentPrompt] = useState("");
	const [chatHistory, setChatHistory] = useState([]);
	const [response, setResponse] = useState("");

	const processResponse = (response) => {
		let responseArray = response.split("**");
		let newResponse = "";
		for (let i = 0; i < responseArray.length; i++) {
			if (i === 0 || i % 2 !== 1) {
				newResponse += responseArray[i];
			} else {
				// Escape backticks here
				newResponse += "<b>" + responseArray[i].replace(/`/g, "\\`") + "</b>";
			}
		}
		let newResponse2 = newResponse.split("*").join("</br>");
		return newResponse2;
	};

	const delayTyping = (index, nextWord) => {
		setTimeout(function () {
			setResponse((prev) => prev + nextWord);
		}, 75 * index);
	};

	const displayResponse = (response) => {
		let newResponseArray = response.split(" ");
		for (let i = 0; i < newResponseArray.length; i++) {
			const newWord = newResponseArray[i];
			delayTyping(i, newWord + " ");
		}
	};

	const sendPrompt = async () => {
		try {
			setLoading(true);
			setShowResult(true);
			setRecentPrompt(input);
			const response = await runChat(input);

			if (response) {
				let newResponse = processResponse(response);
				displayResponse(newResponse);
				setChatHistory((prev) => [...prev, {prompt: input, response: newResponse}]); // Store the prompt-response pair
			} else {
				console.log("Empty response received");
			}
		} catch (error) {
			console.log("Error sending prompt:", error.message);
		} finally {
			setLoading(false);
			setInput("");
		}
	};

	return (
		<AppContext.Provider
			value={{
				data,
				setData,
				loading,
				setLoading,
				input,
				setInput,
				recentPrompt,
				setRecentPrompt,
				response,
				setResponse,
				showResult,
				setShowResult,
				sendPrompt,
				chatHistory,
				searchInput,
				setSearchInput,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
