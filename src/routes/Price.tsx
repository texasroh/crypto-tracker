import styled from "styled-components";
import { IPriceData } from "./Coin";

interface ChartProps {
    coinId: string;
    usd: IPriceData["quotes"]["USD"];
}

const Wrapper = styled.ul``;

const Title = styled.h2`
    font-size: 1.3rem;
    font-weight: 600;
`;

const PriceItem = styled.li`
    display: flex;
    justify-content: space-between;
`;

const ItemTitle = styled.span``;
const ItemValue = styled.span``;

function Price({ coinId, usd }: ChartProps) {
    return (
        <Wrapper>
            <PriceItem>
                <ItemTitle>Market Capital</ItemTitle>
                <ItemValue>{usd.market_cap}</ItemValue>
            </PriceItem>
            <PriceItem>
                <ItemTitle>Market Capital change 24h</ItemTitle>
                <ItemValue>{usd.market_cap_change_24h}%</ItemValue>
            </PriceItem>
            <hr />
            <Title>Price Change</Title>
            <PriceItem>
                <ItemTitle>15 min</ItemTitle>
                <ItemValue>{usd.percent_change_15m}%</ItemValue>
            </PriceItem>
            <PriceItem>
                <ItemTitle>30 min</ItemTitle>
                <ItemValue>{usd.percent_change_30m}%</ItemValue>
            </PriceItem>
            <PriceItem>
                <ItemTitle>1 hour</ItemTitle>
                <ItemValue>{usd.percent_change_1h}%</ItemValue>
            </PriceItem>
            <PriceItem>
                <ItemTitle>6 hours</ItemTitle>
                <ItemValue>{usd.percent_change_6h}%</ItemValue>
            </PriceItem>
            <PriceItem>
                <ItemTitle>12 hours</ItemTitle>
                <ItemValue>{usd.percent_change_12h}%</ItemValue>
            </PriceItem>
            <PriceItem>
                <ItemTitle>24 hours</ItemTitle>
                <ItemValue>{usd.percent_change_24h}%</ItemValue>
            </PriceItem>
            <PriceItem>
                <ItemTitle>7 days</ItemTitle>
                <ItemValue>{usd.percent_change_7d}%</ItemValue>
            </PriceItem>
            <PriceItem>
                <ItemTitle>30 days</ItemTitle>
                <ItemValue>{usd.percent_change_30d}%</ItemValue>
            </PriceItem>
            <PriceItem>
                <ItemTitle>1 year</ItemTitle>
                <ItemValue>{usd.percent_change_1y}%</ItemValue>
            </PriceItem>
        </Wrapper>
    );
}

export default Price;
