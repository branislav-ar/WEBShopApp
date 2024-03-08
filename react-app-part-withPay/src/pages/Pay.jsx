import React from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement/Announcement';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { mobile } from '../responsive';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useState, useEffect } from 'react';
/* import { useHistory } from 'react-router'; */

//icon import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const KEY = "pk_test_51KRggmDnRo04eT00SKiwtDaQunHgbp2DquzdtJgOf9sbBsTMUF8LxWOa2fznPEmkhMczrcKOY1KuRSAbtm9qjuE3008Zk5OqKb";
/* const history = useHistory(); */


const Container = styled.div`
    cursor: default;
    color: #222024;

`;

const Wrapper = styled.div`
    color: #222024;
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 78vh;

    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 2px;

    text-align: center;

    color: #222024;

    margin: 30px 0px;
`;

const TopButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 13px;
    margin: 15px 0px;

    font-weight: 500;
    font-size: 15px;

    border: 1px solid #222024;
    color: #222024;

    border: ${(props) => props.type === "filled" && "none"};
    color: ${(props) => props.type === "filled" && "white"};
    background-color: ${(props) => props.type === "filled" ? "#222024" : "rgba(lightgray, 0.2)"};

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

    ${mobile({ margin: "5px 10px" })}
`;

const IconSmall = styled.div`
    font-size: 20px;
    margin-top: 6px;
`

const Pay = () => {

    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post("http://localhost:5000/shop/checkout/payment",
                    {                       
                        tokenId: stripeToken.id,
                        amount: 2000,
                    } 
                );
                console.log(res.data);
                /* history.push("/seccess") */
            }
            catch(err) {
                console.log(err);
            }
        };

        if(stripeToken) {
            makeRequest();
        }
        
    }, [stripeToken])

    return (
        <Container>
            <Navbar/>
            <Announcement/>
    
            <Wrapper>

                <Title> ZAVRŠILI STE SA KUPOVINOM? </Title>
                {stripeToken ? 
                (
                    <span>Procesiranje plaćanja. Molimo Vas sačekajte...</span>
                ) : (
                    <StripeCheckout 
                        name="SHOPAPP."
                        image="https://i.ibb.co/8dqSZnH/logo.jpg"
                        billingAddress
                        shippingAddress
                        description='UKUPNO: $20'
                        amount={2000}
                        token={onToken}
                        stripeKey={KEY}
                        >
                        <TopButton type="filled">
                            PREĐITE NA PROCES PLAĆANJA!
                                <IconSmall type="filled">
                                    <FontAwesomeIcon icon={ faShoppingBasket } />
                                </IconSmall>
                        </TopButton>
                    </StripeCheckout>
                )}
            </Wrapper>

            <Footer/>
        </Container>
    )
};

export default Pay;
