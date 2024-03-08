import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement/Announcement';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { mobile } from '../responsive';

//icon import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { /* faMinusCircle, faPlusCircle, */ faShoppingBag, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";

const KEY = "pk_test_51KRggmDnRo04eT00SKiwtDaQunHgbp2DquzdtJgOf9sbBsTMUF8LxWOa2fznPEmkhMczrcKOY1KuRSAbtm9qjuE3008Zk5OqKb";


const Container = styled.div`
    cursor: default;
    color: #222024
`;

const Wrapper = styled.div`
    color: #222024;
    padding: 20px;

    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 2px;

    text-align: center;

    color: #222024;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px;
`;

const TopButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 13px;

    font-weight: 600;
    font-size: 10px;

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
    font-size: 15px;

    margin-right: ${(props) => props.type === "filled" ? "0px" : "15px"};
    margin-left: ${(props) => props.type === "filled" ? "15px" : "0px"};
`


const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;

const TopText = styled.a`
    display: flex;
    
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 20px;

    color: #222024;

    transition: all 0.3s ease;

    &:hover {
        color: black;
    }
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
    cursor: default;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;

    margin-top: 15px;
    margin-bottom: 5px;

    border-bottom: 3px solid #ebebeb;

    ${mobile({ flexDirection: "column" })}
`;

const ProductDetails = styled.div`
    display: flex;
    flex: 2;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px;
`;

const ProductName = styled.span`
    ${mobile({ fontSize: "13px" })}
`;

const ProductId = styled.span`
    ${mobile({ fontSize: "13px" })}
`;

const ProductColorCircle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #ebebeb;

    margin-left: 13px;

    background-color: ${(props) => props.color};
`;

const ProductColor = styled.div`
    display: flex;
    ${mobile({ fontSize: "13px" })}
`;


const ProductSize = styled.span`
    ${mobile({ fontSize: "13px" })}
`;

const PriceDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    flex: 1;

`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    
    margin-bottom: 20px;

    ${mobile({ margin: "10px 0px" })}
`;

const Icon = styled.div`
    font-size: 23px;
    cursor: pointer;
    margin-right: 5px;
    margin-left: 5px;

    transition: all 0.3s ease;

    :hover {
        opacity: 0.83;
    }

    &:active {
        transform: scale(1.1);
        transition-duration: 0s;
    }

    ${mobile({ fontSize: "20px" })}
`;

const Amount = styled.div`
    font-size: 24px;
    margin: 2px 17px;
    padding: 2px 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 2px solid teal;

    ${mobile({ fontSize: "20px", width: "25px", height: "25px" })}
`;

const ProductPrice = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 30px;
    font-weight: 200;

    ${mobile({ margin: "13px 0px" })}
`;

const Hr = styled.hr`
    background-color: lightgray;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 3px solid #ebebeb;
    /* border: 0.5px solid lightgrey; */
    border-radius: 10px;
    padding: 20px;

    height: 55vh;
    cursor: default;

    &:hover {
        color: black;
    }
`;

const SummaryTitle = styled.h1`
    display: flex;
    justify-content: center;
    font-weight: 200;
`;

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;

    margin: 30px 0px;

    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "25px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const SummaryButton = styled.button`
    width: 100%;

    background-color: #222024;
    color: white;

    font-weight: 600;
    font-size: 20px;

    border: none;
    padding: 13px 0px;
    margin-top: 5px;

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
`;

const cartBtnLinkStyle = {
    textDecoration: "none",
};

const Cart = () => {

    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const [amountToBePayed, setamountToBePayed] = useState(0);
    const navigate = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    }

    /* const setAmount = (e) => {
        setamountToBePayed(cart.total);
    }; */

    useEffect(() => {
        const makeRequest = async () => {
            try {
                setamountToBePayed(cart.total);

                const res = await userRequest.post("/checkout/payment",
                    {                       
                        tokenId: stripeToken.id,
                        amount: amountToBePayed*100,
                    } 
                );
                navigate("/success", {data: res.data});
                console.log(res.data);
            }
            catch(err) {
                console.log(err);
            }
        };

        if(stripeToken && cart.total >= 1) {
            makeRequest();
        }
        
    }, [amountToBePayed, stripeToken, cart.total, navigate])

    return (
        <Container>
            <Navbar/>
            <Announcement/>
    
            <Wrapper>
                <Title> VAŠA KORPA </Title>
                <Top>
                    <Link to="/products/all" style={cartBtnLinkStyle}>
                        <TopButton>
                            <IconSmall>
                                <FontAwesomeIcon icon={ faShoppingBag } />
                            </IconSmall>
                                NASTAVITE SA KUPOVINOM
                        </TopButton>                        
                    </Link>
                    <TopTexts>
                        <TopText>
                            Lista želja (7)
                        </TopText>
                    </TopTexts>
                    <Link to="/pay" style={cartBtnLinkStyle}>
                        <TopButton type="filled">
                            PREĐITE NA PLAĆANJE
                            <IconSmall type="filled">
                                <FontAwesomeIcon icon={ faShoppingBasket } />
                            </IconSmall>
                        </TopButton>
                    </Link>
                </Top>
                <Bottom>
                    <Info>


                        { cart.products?.map((product) => 

                        <Product key={product._id}>

                            <ProductDetails>
                                
                                <Image src={product.img}/>
                                <Details>
                                    <ProductName> <b>Proizvod:</b> {product.title} </ProductName>
                                    <ProductId> <b>ID:</b> {product._id} </ProductId>
                                    <ProductColor> <b>Boja:</b> <ProductColorCircle color={product.color}/> </ProductColor>
                                    <ProductSize> <b>Veličina:</b> {product.size} </ProductSize>
                                </Details>

                            </ProductDetails>
                                
                            <PriceDetails>

                                <ProductAmountContainer>
                                    <Icon>
                                        {/* <FontAwesomeIcon icon={ faPlusCircle } /> */}
                                        BROJ KOMADA:
                                    </Icon>
                                    <Amount>
                                        {product.quantity}
                                    </Amount>       
                                    {/* <Icon>
                                        <FontAwesomeIcon icon={ faMinusCircle } />
                                    </Icon> */}
                                </ProductAmountContainer>
                                <ProductPrice>
                                    ${product.price * product.quantity}
                                </ProductPrice>

                            </PriceDetails>

                        <Hr/>

                        </Product> 

                        )}

                    </Info>
                    <Summary>

                        <SummaryTitle>
                            VAŠA PORUDŽBINA
                        </SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Cena proizvoda:</SummaryItemText>
                            <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Cena dostave:</SummaryItemText>
                            <SummaryItemPrice>$17</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText><i>Online</i> kupovina:</SummaryItemText>
                            <SummaryItemPrice>-$17</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Ukupno:</SummaryItemText>
                            <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                        </SummaryItem>

                        <StripeCheckout 
                            name="SHOPAPP."
                            image="https://i.ibb.co/8dqSZnH/logo.jpg"
                            billingAddress
                            shippingAddress
                            description={`UKUPNO: $${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={KEY}
                            >
                            <SummaryButton> PLATI </SummaryButton>
                        </StripeCheckout>

                    </Summary>
                </Bottom>

            </Wrapper>

            <Footer/>
        </Container>
    )
};

export default Cart;
