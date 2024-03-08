import React from 'react';
import styled from 'styled-components';

//icon import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faMap, faPhone, faMailBulk } from "@fortawesome/free-solid-svg-icons";

import { mobile } from '../../responsive';
import { Link } from "react-router-dom";

const linkFooterStyle = {

    width: "50%",

    textDecoration: "none",

    transition: "all 0.4s ease",
    cursor: "pointer",
    
    color: "#0A0A0B",
};

const Container = styled.div`
    display: flex;
    cursor: default;

    ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;    
    flex: 1;
    padding: 20px;

    color: #222024;
`;

const Logo = styled.h1``;

const Description = styled.p`
    text-align: justify;
    margin: 10px 0px;
`;

const SocialContainer = styled.div`
    display: flex;

    cursor: pointer;

    transition: all 0.4s ease;

    padding: 10px 15px;

    :hover {
        background-color: #E5E5E5;
    }

    &:active {
        transform: scale(1.03);
        transition-duration: 0s;
    }
`;

const SocialIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 10px;

    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #222024;
    color: white;

`;

const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: bold;

    ${mobile({ fontSize: "12px" })}
`

const Center = styled.div`
    flex: 1;
    padding: 20px;

    color: #222024;

    ${mobile({ display: "none" })}
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    pargin: 0;
    padding: 0;
    list-style: none;

    font-weight: 400;

    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 20px;

    textDecoration: "none";

    transition: all 0.4s ease;
    cursor: pointer;

    :hover {
        color: black;
    }

    &:active {
        transform: scale(1.03);
        transition-duration: 0s;
    }
`;

const Right = styled.div`
    color: 
    flex: 1;
    padding: 20px;

    color: #222024;

    ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
    margin-bottom: 30px;
    display: flex;
    align-items: center;

    transition: all 0.3 ease;
    cursor: pointer;

    :hover {
        color: black;
    }
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
  <Container>
        <Left>
            <Logo> SHOPAPP. </Logo>
            <Description>
            SHOPPAPP. je pokrenut 2017. godine sa jasnom međunarodnom misijom i sa namerom da oblači mlade ljude koji se bave svojom okolinom, koji žive u zajednici i povezani su jedni sa drugima. Mladi ljudi koji imaju osećaj za ležerno oblačenje, koji izbegavaju stereotipe i koji žele da se osećaju dobro u svemu što nose.
            </Description>
            <SocialContainer>
                <SocialIcon>
                    <FontAwesomeIcon icon={faHashtag} />
                </SocialIcon>
                <Text>
                    POSETITE NAŠE DRUŠTVENE MREŽE!
                </Text>
            </SocialContainer>
      </Left>
      <Center>
        <Title>
            Korisni linkovi
        </Title>
        <List>
            <Link to="/" style={linkFooterStyle}>
                <ListItem>Početna</ListItem>
            </Link>
            <Link to="/cart" style={linkFooterStyle}>
                <ListItem>Korpa</ListItem>
            </Link>
            <Link to="/products/man" style={linkFooterStyle}>
                <ListItem>Muškarci</ListItem>
            </Link>
            <ListItem>Pratite porudžbinu</ListItem>
            <Link to="/products/woman" style={linkFooterStyle}>
                <ListItem>Žene</ListItem>
            </Link>
            <ListItem>Moj nalog</ListItem>
            <Link to="/products/all" style={linkFooterStyle}>
                <ListItem>Sve</ListItem>
            </Link>
            <ListItem>Lista želja</ListItem>
        </List>
      </Center>
      <Right>
            <Title>
                Kontakt info
            </Title>
            <ContactItem>
                <FontAwesomeIcon icon={ faMap } style={{marginRight:"18px"}} />
                7707 South Elmwood Avenue Benton, MI 49022
            </ContactItem>
            <ContactItem>
                <FontAwesomeIcon icon={ faPhone } style={{marginRight:"18px"}} />
                +1 234 567 890
            </ContactItem>
            <ContactItem>
                <FontAwesomeIcon icon={ faMailBulk } style={{marginRight:"18px"}} />
                info-contact@shopapp.com
            </ContactItem>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
  </Container>
  );
};

export default Footer;
