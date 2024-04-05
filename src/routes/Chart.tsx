import { useQuery } from "react-query";
import { fetchCoinChart } from "./api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";


interface IData{
	time_open: number;
	time_close: number;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	market_cap: number;
}

interface ChartProps{
	coinId:string;
}

function Chart({coinId}:ChartProps){
	const isDark= useRecoilValue(isDarkAtom)
	const {isLoading,data} =useQuery<IData[]>(["ohlcv",coinId],()=>fetchCoinChart(coinId),{
		refetchInterval:10000,
	})
	return (
		<div>
			{isLoading? "Loading char..." 
			:	(<ApexChart 
					type="line"
					series={[
						{	name:"price",
							data: data?.map(price=>parseFloat(price.close))??[]
						}
					]	
					}
					options={{
						theme:{
							mode: isDark? "dark" : "light"
						},
						chart:{
							height:300,
							width:500,
							toolbar:{show:false},
							background:"transparent"
						},
						grid:{show:false},
						stroke:{
							curve:"smooth",
							width:4.
						},
						yaxis:{show:false},
						xaxis:{
							axisBorder:{show:false},
							axisTicks:{show:false},
							labels:{show:false},
							type:"datetime",
							categories: data?.map(price=>price.time_close)??[]
						},
						fill:{ type: "gradient", gradient:{gradientToColors:["#6c5ce7"],stops:[0,100]}},
						colors: ["#fdcb6e"],
						tooltip:{
							y:{formatter:(value)=>`${value.toFixed(3)}`},
						}
					}}/>
				)}</div>
			)
}

export default Chart;