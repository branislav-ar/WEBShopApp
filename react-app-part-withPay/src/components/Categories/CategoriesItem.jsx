//'rafce'
//basic imports
import React from 'react';
import styled from "styled-components";
import { mobile } from '../../responsive';
import { Link } from "react-router-dom";


const Container = styled.div`
  cursor: default;

  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "45vh" })}

`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
`

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`

const Button = styled.button`
    border: none;
    padding: 10px;

    background-color: white;
    color: gray;

    cursor: pointer;
    font-weight: 600;

    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 2.5px 2.5px 5px 1px rgba(255, 255, 255, 0.2);

    transition: all 0.3s ease;

    &:hover {
      color: black;
      background-color: #EDEDEC;
      transform: scale(1.1)
    }

    &:active {
      transform: translateY(1px);
      transition-duration: 0s;
    }
`



const CategoriesItem = ({item}) => {
  return (
      <Container>
        <Link to={`/products/${item.cat}`}>
            <Image src={item.img} />
            <Info>
              <Title> {item.naslov} </Title>
              <Button> KUPI ODMAH </Button>
            </Info>
        </Link>
      </Container>
  );
};

export default CategoriesItem;
