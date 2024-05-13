import {useAppContext} from "../../context/AppContext";
import {IoSearch} from "react-icons/io5";
import {FaInstagramSquare} from "react-icons/fa";
import {IoLogoTiktok} from "react-icons/io5";
import {FaTwitter} from "react-icons/fa";
import {FaYoutubeSquare} from "react-icons/fa";
import {debounce} from "lodash";
import {fetchData} from "../../api";
import {useCallback, useMemo} from "react";
import {TbLoader2} from "react-icons/tb";

const SearchBar = () => {
	const {loading, setLoading, data, setData, searchInput, setSearchInput} =
		useAppContext();

	const sendRequest = useCallback(
		async (value) => {
			try {
				console.log("API call with search value:", value);
				const response = await fetchData();
				const data = response.data;
				setData(data);
			} catch (error) {
				console.error("error:", error);
			} finally {
				setLoading(false);
			}
		},
		[setLoading, setData]
	);

	const debouncedSendRequest = useMemo(() => {
		return debounce(sendRequest, 2000);
	}, [sendRequest]);

	const handleInputChange = (e) => {
		const {value} = e.target;
		setLoading(true);
		setSearchInput(value);
		if (value.trim() !== "") {
			debouncedSendRequest(value);
		} else {
			// If input is empty, clear any pending debounce calls
			debouncedSendRequest.cancel();
			setLoading(false);
		}
	};

	return (
		<section className="flex justify-center items-center p-5 flex-col">
			<h2 className="p-2 text-xl font-semibold text-green-700">
				Social insights Dashboard
			</h2>
			<p className="mb-3 font-medium">
				Stay Ahead with Real-time insights on Social Media & Web
			</p>
			<div className="relative w-full">
				<input
					type="text"
					value={searchInput}
					className="w-full p-2 rounded-full px-10 shadow-lg outline-none 
                focus:ring-offset-2 focus:ring-green-500 ring-2 ring-white relative"
					placeholder="Start typing any topic/company name"
					onChange={handleInputChange}
				/>

				<IoSearch
					className={`z-50 cursor-pointer size-9 absolute right-2 top-0.5 text-gray-500 ${
						searchInput ? "text-green-500 transition-colors duration-300" : ""
					}`}
					size={25}
				/>
			</div>
			<div className="p-2 my-4 flex gap-8 justify-center items-center font-mono font-semibold">
				{loading ? (
					<p>
						<TbLoader2 className="animate-spin" size={20} />
					</p>
				) : (
					<>
						<div className="flex flex-col justify-center items-center">
							<FaInstagramSquare size={40} className="text-red-800 cursor-pointer" />
							<p>{data?.instagram?.follower_count?.[11]}</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<IoLogoTiktok size={40} className="text-black cursor-pointer" />
							<p>{data?.tiktok?.follower_count?.[11]}</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<FaTwitter size={40} className="text-blue-900 cursor-pointer" />
							<p>{data?.twitter?.follower_count?.[11]}</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<FaYoutubeSquare size={40} className="text-red-900 cursor-pointer" />
							<p>{data?.youtube?.subscriber_count?.[11]}</p>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default SearchBar;
