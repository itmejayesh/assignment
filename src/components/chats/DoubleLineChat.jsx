/* eslint-disable react/prop-types */
import {useEffect, useRef} from "react";
import Highcharts from "highcharts";

const DoubleLineChart = ({ChartType, title, seriesData}) => {
	const chartRef = useRef(null);

	useEffect(() => {
		// Create chart when component mounts
		const chart = Highcharts.chart(chartRef.current, {
			// Highcharts configuration options
			chart: {
				type: ChartType,
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
				title: {text: "Subscriber Count"},
			},
			tooltip: {
				crosshairs: true,
				shared: true,
			},
			title: {
				text: title,
			},
			series: seriesData,
		});

		// Return a cleanup function to destroy the chart when component unmounts
		return () => {
			chart.destroy();
		};
	}, [ChartType, seriesData, title]);

	return <div ref={chartRef}></div>;
};

export default DoubleLineChart;
