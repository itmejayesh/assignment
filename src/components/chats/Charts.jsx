/* eslint-disable react/prop-types */
import {useEffect, useRef} from "react";
import Highcharts from "highcharts";

const Chart = ({ChartType, title, data, seriesType, seriesName}) => {
	const chartRef = useRef(null);

	useEffect(() => {
		// Create chart when component mounts
		const chart = Highcharts.chart(chartRef.current, {
			// Highcharts configuration options
			chart: {
				type: ChartType,
			},
			accessibility: {
				description:
					"This chart displays the trend of Instagram followers over time, showing the growth or decline in follower count.",
			},
			xAxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				],
			},
			yAxis: {
				title: {text: "Follower Count"},
			},
			tooltip: {
				crosshairs: true,
				shared: true,
			},
			title: {
				text: title,
			},
			series: [
				{
					type: seriesType,
					name: seriesName,
					//
					data: data?.reverse(),
				},
			],
		});

		// Return a cleanup function to destroy the chart when component unmounts
		return () => {
			chart.destroy();
		};
	}, [ChartType, seriesType, data, seriesName, title]);

	return <div ref={chartRef}></div>;
};

export default Chart;
