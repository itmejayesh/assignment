import {useAppContext} from "../../context/AppContext";
import {BsArrowUpSquareFill} from "react-icons/bs";
import ChatHistory from "./ChatHistory";
import CustomButton from "../CustomButton";
import {useState} from "react";

const ChatBot = () => {
	const {input, setInput, showResult, sendPrompt, searchInput} = useAppContext();
	const [activeButton, setActiveButton] = useState(null);

	const handleClick = (title) => {
		setActiveButton(title === activeButton ? null : title);
	};

	return (
		<div className="h-[72.8vh]">
			<nav className="flex flex-col justify-center items-center p-2 overflow-hidden">
				<p className="text-sm font-bold line-clamp-2 pr-1">{`${
					searchInput ? searchInput : "Company Name"
				} : socicalMedia "Social Media Sentiment Timeline" data - "30 days" by week`}</p>
			</nav>
			<div className="border-b-2 border-gray-400 mb-2"></div>

			<div className="container mx-auto mb-2">
				<h4 className="font-semibold">Select LLM</h4>
				<CustomButton
					title="FasterLLM"
					onClick={handleClick}
					isActive={activeButton === "FasterLLM"}
				/>
				<CustomButton
					title="Secure LLM"
					onClick={handleClick}
					isActive={activeButton === "Secure LLM"}
				/>
				<CustomButton
					title="Public LLM"
					onClick={handleClick}
					isActive={activeButton === "Public LLM"}
				/>
				<CustomButton
					title="Longcontext"
					onClick={handleClick}
					isActive={activeButton === "Longcontext"}
				/>
				<CustomButton
					title="LargeLLM"
					onClick={handleClick}
					isActive={activeButton === "LargeLLM"}
				/>
			</div>

			<div className="container mx-auto h-full ">
				<div className="h-full bg-gray-100 flex justify-center p-5 overflow-hidden">
					{!showResult ? <div>Welcome here</div> : <ChatHistory />}
				</div>

				<div className="overflow-hidden">
					<div className="flex justify-center w-full items-center relative">
						<input
							type="text"
							value={input}
							placeholder="Enter a prompt here"
							className="flex justify-center items-center outline-none pr-12 text-gray-600 w-full bg-transparent rounded-xl border-2
                            border-gray-400 focus:border-gray-600 m-1 p-2"
							onChange={(e) => setInput(e.target.value)}
						/>
						<BsArrowUpSquareFill
							className={`absolute right-3 ${
								!input ? "text-gray-400" : "text-gray-600"
							}`}
							size={30}
							onClick={() => sendPrompt()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatBot;
