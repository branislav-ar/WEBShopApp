import React from 'react';

//icon import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { mobile } from '../../responsive';

import styled from "styled-components";

const Container = styled.div`
    cursor: default;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: #222024;

    height: 60vh;
    background-color: #fcf5f5;
    transition: all 0.2s ease;

    &:hover {
        color: #0A0A0B;
    }
`;

const Title = styled.h1`
    font-size: 70px;
    margin: 20px;

    ${mobile({ fontSize: "50px" })}
`;

const Description = styled.div`
    font-size: 24px;
    font-weight: 200;
    margin-bottom: 20px;

    ${mobile({ textAlign: "center", fontSize: "14px" })}

`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;

    width: 50%;
    height: 40px;
    background-color: white;

    border: 1px lightgray solid;

    transition: all 0.3s ease;

/*     :hover {
        border: 0.5px teal solid;
    } */

    ${mobile({ width: "80%" })}
`;

const Input = styled.input`
    flex: 11;

    border: none;
    outline: none;

    font-size: 16px;
    padding-left: 20px;

    :focus {
        border: 0.5px teal solid;
    }

`;

const Button = styled.button`
    flex: 1;

    border: 0.5px teal solid;

    font-size: 22px;
    color: white;

    background-color: teal;

    cursor: pointer;

    &:hover {
        opacity: 0.92;
    }

    &:active {
        opacity: 0.87;
    }
`;

const Newsletter = () => {
  return (
    <Container>
        <Title>
            Newsletter
        </Title>
        <Description>
            Budite u toku sa najnovijim trendovima i popustima! 
        </Description>
        <InputContainer>
            <Input placeholder="Vaša e-mail adresa..."/>
            <Button>
                <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
        </InputContainer>
    </Container>
  );
};

export default Newsletter;
