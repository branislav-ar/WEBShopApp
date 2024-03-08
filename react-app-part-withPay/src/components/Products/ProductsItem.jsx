import React from 'react';
import styled from 'styled-components';
//icon import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background-color: #f2f2f2;

    margin: 5px;

    min-width: 280px;
    height: 350px;

    position: relative;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        z-index: 2;
    }
`

const Info = styled.div`
    opacity: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;

    transition: all 0.5s ease;

    &:hover {
        opacity: 1;
    }
`

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 10px;

    width: 40px;
    height: 40px;

    border-radius: 50%;
    background-color: white;

    transition: all 0.3s ease;
    cursor: pointer;

    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 2.5px 2.5px 5px 1px rgba(255, 255, 255, 0.1);

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1)
    }

    &:active {
        transform: translateY(1px);
        transition-duration: 0s;
    }
`

const linkStyle = {
    textDecoration: "none",
    color: "#0A0A0B",
};

const ProductsItem = ({item}) => {
    return (
        <Container>
            <img src={ item.img } alt='' />
            <Info>
                <Icon>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`} style={linkStyle}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>
                </Icon>
                <Icon>
                    <FontAwesomeIcon icon={faHeart} />
                </Icon>
            </Info>
        </Container>
    );
};

export default ProductsItem;
