import "./App.css";
import {useState} from "react";
import {MdCancel} from "react-icons/md";
import {TbMessageChatbot} from "react-icons/tb";

import SearchBar from "./components/searchBar/SearchBar";
import Split from "react-split";
import Index from "./components/chats";
import {useAppContext} from "./context/AppContext";
import ChatBot from "./components/chatBot/ChatBot";

function App() {
	const [collapsedIndex, setCollapsedIndex] = useState(1);
	const [splitSizes, setSplitSizes] = useState([100, 0]);
	const {data} = useAppContext();

	const togglePanelVisibility = (index) => {
		if (index === collapsedIndex) {
			setCollapsedIndex(null);
			setSplitSizes([100, 0]);
		} else {
			setCollapsedIndex(index);
			setSplitSizes(index === 0 ? [80, 20] : [20, 80]);
		}
	};

	return (
		<main className={`bg-slate-100 min-h-screen`}>
			<SearchBar />
			<div>
				<Split
					sizes={splitSizes}
					className="flex"
					minSize={[1000, 0]}
					cursor="row-resize"
					collapsed={collapsedIndex}
				>
					<div className="relative">
						{data && (
							<TbMessageChatbot
								className="absolute right-2 top-1 text-red-500 hover:text-red-400"
								size={35}
								onClick={() => togglePanelVisibility(0)}
							/>
						)}
						<Index />
					</div>
					{/* chat bot panel */}
					<div
						className={`bg-gray-200 relative ${
							collapsedIndex === 0 ? "block" : "hidden"
						}`}
					>
						{collapsedIndex !== 1 && data && (
							<MdCancel
								className="absolute right-2 top-1 text-red-600 hover:text-red-400"
								size={25}
								onClick={() => togglePanelVisibility(1)}
							/>
						)}
						<ChatBot />
					</div>
				</Split>
			</div>
		</main>
	);
}

export default App;
