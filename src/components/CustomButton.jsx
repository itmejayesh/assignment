/* eslint-disable react/prop-types */
const CustomButton = ({title, isActive, onClick}) => {
	const handleClick = () => {
		onClick(title);
	};
	return (
		<button
			className={`${
				isActive ? "bg-green-500 text-white" : "bg-white text-black"
			} p-2 m-1 rounded-md border-gray-400 border`}
			onClick={handleClick}
		>
			{title}
		</button>
	);
};

export default CustomButton;
