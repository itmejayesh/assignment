import {useAppContext} from "../../context/AppContext";
import {FaUserCircle} from "react-icons/fa";
import {BsRobot} from "react-icons/bs";
import {LuLoader} from "react-icons/lu";

const ChatHistory = () => {
	const {loading, chatHistory} = useAppContext();
	return (
		<div className="px-2 overflow-y-auto no-scrollbar w-full">
			{chatHistory.map(({prompt, response}, index) => (
				<div key={index}>
					<div className="flex gap-5 items-start pb-4">
						<FaUserCircle size={25} />
						<p>{prompt}</p>
					</div>

					<div className="flex gap-5 items-start pb-4">
						<BsRobot className="size-7" />
						{index === chatHistory.length - 1 && loading && <LuLoader size={25} />}
						<p className="w-[100%]" dangerouslySetInnerHTML={{__html: response}}></p>
					</div>
				</div>
			))}
		</div>
	);
};

export default ChatHistory;
