import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
    Link,
    Route,
    Routes,
    useLocation,
    useMatch,
    useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const OverView = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;

const BackBtn = styled.span`
    padding: 10px 20px;
    margin-right: 20px;
    border-radius: 10px;
    border: 1px solid white;
    background-color: ${(props) => props.theme.cardBgColor};
`;

interface Params {
    coinId: string;
}

interface RouteState {
    state: { name: string };
}

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

export interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
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
        };
    };
}

interface ICoinProps {}

function Coin({}: ICoinProps) {
    const { coinId } = useParams<string>();
    const { state } = useLocation() as RouteState;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
        ["info", coinId],
        () => fetchCoinInfo(coinId!),
        {
            refetchInterval: 6000,
        }
    );
    const { isLoading: tickersLoading, data: tickersData } =
        useQuery<IPriceData>(
            ["tickers", coinId],
            () => fetchCoinTickers(coinId!),
            {
                refetchInterval: 6000,
            }
        );
    // const [loading, setLoading] = useState(true);
    // const [info, setInfo] = useState<IInfoData>();
    // const [priceInfo, setPriceInfo] = useState<IPriceData>();

    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         const priceData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // }, [coinId]);
    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "Loading..."
                        : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Link to={`${process.env.PUBLIC_URL}/`}>
                    <BackBtn>Back</BackBtn>
                </Link>
                <Title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "Loading..."
                        : infoData?.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <OverView>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>
                                ${tickersData?.quotes.USD.price.toFixed(2)}
                            </span>
                        </OverviewItem>
                    </OverView>
                    <Description>{infoData?.description}</Description>
                    <OverView>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </OverView>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to="chart">Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to="price">Price</Link>
                        </Tab>
                    </Tabs>
                    <Routes>
                        <Route
                            path="price"
                            element={
                                <Price
                                    coinId={coinId!}
                                    usd={tickersData!.quotes.USD}
                                />
                            }
                        />
                        <Route
                            path="chart"
                            element={<Chart coinId={coinId!} />}
                        />
                    </Routes>
                </>
            )}
        </Container>
    );
}

export default Coin;
