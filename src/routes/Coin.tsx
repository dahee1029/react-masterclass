import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet-async"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

interface RouteParams{
	coinId:string;
}

const Title = styled.h1`
	font-size: 48px;
	color:${props=>props.theme.accentColor};
	font-weight:bold; 
	`

const Container= styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header= styled.header`
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const HomeBtn=styled.div`
	display :flex;
	width: 80px;
	height: 40px;
	align-items: center;
	justify-content: center;
	padding-bottom: 5px;
	:first-child{
		padding-right: 3px;
	}
`

const Loader= styled.span`
	text-align: center;
	display: block;
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(230,150,210,0.5);
	padding: 10px 20px;
	border-radius: 10px;

`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	
	:first-child{
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
	`;
const Description = styled.p`
	margin: 20px 0px;
`

const Tabs= styled.div`
	display: flex;
	align-items: center;
	width: auto;
	height: 60px;
	justify-content: space-between;
	margin-top: 10px;
`
const Tab= styled.span<{isActive: boolean}>`
	width: 200px;
	height: 30px;
	background-color: rgba(230,150,210,0.5);
	border-radius: 10px;
	text-align: center;
	align-content: center;
	color: ${props=>props.isActive? props.theme.accentColor: props.theme.textColor};
	:first-child{
		font-size: 15px;
	}
`

const Nav =styled.div`
	display: flex;
	justify-content: space-between;
`

interface RouteState{
	name: string;
}

interface ITag{
	id: string;
	name: string;
	coin_counter: number;
	ico_counter: number;
}

interface InfoData{
	id:string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: 	boolean;
	type: string;
	logo: string;
	tags: ITag[];
	team: object;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	links: object;
	links_extended: object;
	whitepaper: object;
	first_data_at: string;
	last_data_at: string;
};

interface PriceData{
	id:string;
	name: string;
	symbol: string;
	rank: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD:{
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;

		}
	}
	};


function Coin(){
	const setDarkAtom=useSetRecoilState(isDarkAtom);
	const toggleDrakAtom= ()=>setDarkAtom(prev=>!prev);
	const {coinId}= useParams<RouteParams>();
	const {state}=useLocation<RouteState>();
	const priceMatch= useRouteMatch("/:coinId/price");
	const chartMatch= useRouteMatch("/:coinId/chart")

	const {isLoading:infoLoading, data:infoData}= useQuery<InfoData>(["CoinInfo",coinId],()=>fetchCoinInfo(coinId));
	const {isLoading:tickerLoading, data:tickersData}= useQuery<PriceData>(["tickers",coinId],()=>fetchCoinTickers(coinId),{
		refetchInterval:10000,
	});
	const loading= infoLoading||tickerLoading;

	return(
		<Container>
			<Helmet>
				<title>
				{state?.name ? state.name: loading? "Loading...": infoData?.name}
				</title>
			</Helmet>
			<Header>
				<Title>{state?.name ? state.name: loading? "Loading...": infoData?.name}</Title>
			</Header>
			<Nav>
				<Link to={"/"}>
					<HomeBtn>
							<span>Home</span><FontAwesomeIcon icon="home"/>
					</HomeBtn>
				</Link>
				<button onClick={toggleDrakAtom}>Toggle Mode</button>
			</Nav>
			{loading? (
				<Loader>Loading</Loader>
			):(
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>{infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Open Source:</span>
							<span>{infoData?.open_source? "⭕": "❌"}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
					</Overview>
					<Description>
						{infoData?.description}
					</Description>
					<Overview>
						<OverviewItem>
							<span>Price(USD):</span>
							<span>{tickersData?.quotes.USD.price}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !==null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab isActive={priceMatch !==null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>
					<Switch>
						<Route path={`/:coinId/price`}>
							<Price/>
						</Route>
						<Route path={`/:coinId/chart`}>
							<Chart  coinId={coinId}/>
						</Route>
					</Switch>
				</>	
			)}
		</Container>
		
	)
}

export default Coin;