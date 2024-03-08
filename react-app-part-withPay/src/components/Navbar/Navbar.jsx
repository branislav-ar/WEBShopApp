//'rafce'
//basic imports
import React from 'react';
//icon import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
//mui
import { Badge } from '@mui/material';
import { mobile } from '../../responsive';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { emptyCart, logout } from '../../redux/apiCalls';

import { useDispatch } from 'react-redux';

const Container = styled.div`
    height: 60px;
    ${mobile({ display: "flex", height: "100px", backgroundColor: "#f5fafd" })}
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    ${mobile({ flexWrap: "wrap", flex: 1, padding: "10px 0px", justifyContent: "space-around" })}
`;

const Left = styled.div`
    display: flex;
    flex: 2;
    align-items: center;
    color: #222024;
`;

const Language = styled.span`
    display: flex;
    font-size: 16px;
    transition: all 0.3s ease;

    flex: 1;

    &:hover {
        color: #0A0A0B;
        cursor: pointer;
        transform: scale(1.1);
    }

    ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
    display: flex;
    flex: 12;
    justify-content: space-between;
    border: 0.5px solid lightgray;

    margin-left: 30px;

    color: #222024;

    & FontAwesomeIcon {
        color: gray;
        font-size: 16px;
    }
`;

const Input = styled.input`
    border: none;
    outline: none;

    padding: 5px;

    font-size: 14px;

    transition: all 0.3s ease;

    ${mobile({ width: "70px" })}
`;

const Button = styled.button`
    flex: 1;

    border: none;
    outline: none;

    font-size: 18px;
    color: white;

    padding: 5px;

    background-color: rgba(gray, 0.9);
    color: gray;

    cursor: pointer;

    transition: all 0.3s ease;

    &:hover {
        background-color: #DCDCDC;
    }

    &:active {
        background-color: #E5E5E5;
    }
`;

const Center = styled.div`
    display: flex;
    flex: 6;

    justify-content: center;
    color: #222024;
`;

const Logo = styled.h1`
    font-weight: bold;

    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        color: #0A0A0B;
        transform: scale(1.08);
    }

    &:active {
        transform: scale(1.03);
        transition-duration: 0s;
    }

    ${mobile({ fontSize: "22px" })}
`;

const Right = styled.div`
    display: flex;
    flex: 2;

    align-items: center;
    justify-content: flex-end;

    ${mobile({ flex: 2, justifyContent: "space-around" })}
`;

const MenuItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 25px;
    margin-right: 15px;

    font-size: 14px;
    cursor: pointer;

    transition: all 0.3s ease;
        
    &:hover {
        color: #0A0A0B;
        transform: scale(1.08);
    }

    &:active {
        transform: scale(1.03);
        transition-duration: 0s;
    }

    ${mobile({ fontSize: "13px", marginLeft: "10px" })}
`;

const linkStyle = {
    textDecoration: "none",
    color: "#0A0A0B",
};

const Navbar = () => {

    const quantity = useSelector(state => state.cart.quantity);

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        logout(dispatch);
        emptyCart(dispatch);
    }

    return (    
        <Container>
            <Wrapper>
                <Left>
                    <Language> EN </Language>
                    <SearchContainer>
                        
                        <Input placeholder="Pretraži..."/>
                        <Button>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>

                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={linkStyle}>
                        <Logo> SHOPAPP. </Logo>
                    </Link>
                </Center>
                <Right>

                    {/* REGISTER funkcionalnost na Client strani! */}
                    {/* <Link to="/register" style={linkStyle}>
                        <MenuItem>
                            REGISTER
                        </MenuItem>
                    </Link> */}

                    <Link to="/login" style={linkStyle}>
                        <MenuItem>
                            LOG IN
                        </MenuItem>
                    </Link>
                    <Link to="/" style={linkStyle} onClick={handleClick}>
                        <MenuItem>
                            LOG OUT
                        </MenuItem>
                    </Link>
                    <Link to="/cart" style={linkStyle}>
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;