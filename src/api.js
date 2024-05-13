// api.js
import axios from "axios";

export const fetchData = async () => {
	try {
		const response = await axios.get(
			"https://725c969ce31249e38fa9ab7e80808602.api.mockbin.io/"
		);
		console.log(response);
		return response;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // Propagate the error
	}
};
