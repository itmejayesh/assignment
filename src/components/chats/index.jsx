import Charts from "./Charts";
import DoubleLineChart from "./DoubleLineChat";
import {useAppContext} from "../../context/AppContext";

function Index() {
	const {data} = useAppContext();
	const twitterFollowers = data?.twitter?.follower_count;
	const instagramFollowers = data?.instagram?.follower_count;
	const youtubeSubscribers = data?.youtube?.subscriber_count;
	const tiktokFollowers = data?.tiktok?.follower_count;
	const seriesData = [
		{
			type: "",
			name: "YouTube",
			data: youtubeSubscribers,
		},

		{
			type: "",
			name: "Tiktok",
			data: tiktokFollowers,
		},
	];

	return (
		<>
			{data && (
				<>
					<h4 className="text-xl font-bold text-center justify-center p-5 underline underline-offset-8">
						See What&apos;s possible with haix
					</h4>
					<div className="grid grid-cols-1 xl:grid-cols-2 p-2 gap-5">
						<Charts
							ChartType="line"
							data={instagramFollowers}
							title={`Instagram Follower Count`}
							seriesType={`column`}
							seriesName={`Trend of Instagram followers over the time`}
						/>
						<Charts
							ChartType="line"
							data={twitterFollowers}
							title={`Twitter Follower Count`}
							seriesType={``}
							seriesName={`Trend of Twitter followers over the time`}
						/>
						<DoubleLineChart
							ChartType="line"
							title="YouTube vs. Tiktok Subscribers Base"
							seriesData={seriesData}
						/>
						<DoubleLineChart
							ChartType="area"
							title="YouTube vs. Tiktok Subscribers Base"
							seriesData={seriesData}
						/>
					</div>
				</>
			)}
		</>
	);
}

export default Index;
