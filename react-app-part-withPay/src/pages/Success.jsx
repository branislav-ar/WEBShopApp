/* import { useLocation } from "react-router"; */
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Container = styled.div`
    cursor: default;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
`;

const Text1 = styled.span` 
    font-size: 30px;
    margin-bottom: 20px;
`

const Image1 = styled.img`
    width: 70px;
    height: 70px;
    margin-bottom: 50px;
`

const Text2 = styled.span` 
    margin: 5px;
    font-size: 15px;
`
const Image2 = styled.img`
    margin: 5px;
    width: 25px;
    height: 25px;
`

const ReturnBackDiv = styled.div`
    cursor: pointer;

    padding: 7px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all 0.2s ease;

    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 2.5px 2.5px 5px 1px rgba(0, 0, 255, 0.2);

    &:hover {
        opacity: 0.9;
    }

    &:active {
        transform: translateY(2px);
        transition-duration: 0s;
    }
`

const Success = () => {
    /* const location = useLocation();

    console.log(location); */

    return (
        <Container>
            <Text1> USPEŠNO STE IZVRŠILI PORUČIVANJE! </Text1>
            <Image1 src="https://i.ibb.co/61kMHZS/handshake.png"/>
            <Link to="/" style={{color: "black", textDecoration: "none"}}>
                <ReturnBackDiv> 
                    <Text2> Nazad na početnu stranu </Text2>
                    <Image2 src="https://i.ibb.co/44qVZzJ/back.png"/>
                </ReturnBackDiv>
            </Link>
        </Container>
    )
}

export default Success;