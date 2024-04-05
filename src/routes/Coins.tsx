import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet-async";


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

const ConinList= styled.ul`
	padding: 0px 10px;
`;

const Coin= styled.li`
	background-color: white;
	color: ${props=>props.theme.textColor};
	margin-bottom: 10px;
	padding: 20px;
	border-radius: 15px;
	a{	display:flex;
		align-items: center;
		transition: color 0.2s ease-in;
	}
	&:hover{
		a{
			color:${props=>props.theme.accentColor}
		}
	}
`;

const Img= styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`

const Loader= styled.span`
	text-align: center;
	display: block;
`;

const Title = styled.h1`
	font-size: 48px;
	color:${props=>props.theme.accentColor};
	font-weight: bold;
`


interface CoinInterface{
	"id": string,
	"name":string ,
	"symbol":string ,
	"rank": number,
	"is_new": boolean,
	"is_active": boolean,
	"type": string
}

function Coins(){
	const{isLoading ,data}= useQuery<CoinInterface[]>(["allCoins"],fetchCoins);

	return(
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title>코인</Title>
			</Header>

			{isLoading? (<Loader>Loading</Loader>): (<ConinList>
				{data?.slice(0,100).map(coin=> {
					return <Coin key={coin.id}>
						<Link to={{
							pathname: `/${coin.id}`,
							state: { name: coin.name }
						}}>
							<Img src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`} />{coin.name} &rarr;
						</Link>
					</Coin>;
				}) }
			</ConinList>)}
		</Container>
	)
}
export default Coins;