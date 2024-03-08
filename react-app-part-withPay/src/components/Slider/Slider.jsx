//'rafce'
//basic imports
import React from 'react';
/* import styles from './Slider.module.scss'; */
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { sliderItems } from '../../data';
import { mobile } from '../../responsive';
import styled from "styled-components";

import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    
    width: 100%;
    height: 100vh;
    
    position: relative;
    overflow: hidden;

    ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 50px;

    background-color: #fff7f7;
    border-radius: 50%;

    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;

    cursor: pointer;

    opacity: 0.8;
    z-index: 2;

    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};

    transition: all 0.3s ease;
    cursor: pointer;

    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 2.5px 2.5px 5px 1px rgba(0, 0, 255, 0.2);

    &:hover {
        opacity: 1;
        background-color: white;
    }

    &:active {
        transform: scale(1.1);
        transition-duration: 0s;
    }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  
  transition: all 1.5s ease;

  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    display: flex;

    width: 100vw;
    height: 100vh;
    
    align-items: center;

    background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
    padding-top: 20px;
    height: 100%;
    flex: 1;
`;

const Image = styled.img`
    margin-left: 30px;
    height: 100%;
`;


const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
    color: #222024;

    &:hover {
        color: #0A0A0B;
        cursor: pointer;
    }        
`;

const Title = styled.h1`
    font-size: 70px;
`;

const Description = styled.p`
    margin: 50px 0px;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 3px;
`;

const Button = styled.button`
    font-weight: 600;
    font-size: 20px;

    border: none;
    padding: 20px;

    background-color: #222024;
    color: white;

    cursor: pointer;
    transition: all 0.2s ease;

    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 2.5px 2.5px 5px 1px rgba(0, 0, 255, 0.2);

    &:hover {
        background-color: #0A0A0B;
        transform: scale(1.03)
    }

    &:active {
        transform: translateY(2px);
        transition-duration: 0s;
    }
`;

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction) => {
        if(direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 1);
        }
        else {
            setSlideIndex(slideIndex < 1 ? slideIndex + 1 : 0);
        }
    }

    return (
    <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </Arrow>

            <Wrapper slideIndex={slideIndex}>

                {sliderItems.map((item) => (
          
                    <Slide bg={item.bg} key={item.id}>
                        
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title> {item.naslov} </Title>
                            <Description>
                                {item.opisPT1} <br/>
                                {item.opisPT2} 
                            </Description>
                            <Link to="/products/all">
                                <Button> KUPI SADA! </Button>
                            </Link>
                        
                        </InfoContainer>
                    </Slide>

                ))}
            </Wrapper>
        
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </Arrow>
  </Container>
  )
};

export default Slider;