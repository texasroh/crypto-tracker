import styled from "styled-components";

const Container = styled.div``;

const Header = styled.header``;

const CoinsList = styled.ul``;

const Coin = styled.li``;

const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
`;

function Coins() {
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            <CoinsList>
                <Coin></Coin>
            </CoinsList>
        </Container>
    );
}

export default Coins;
