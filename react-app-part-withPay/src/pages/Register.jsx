import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    cursor: default;
    
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
        ),
        url("https://i.ibb.co/sjgxtNW/register-bg.jpg") center;
    background-size: cover;
`;

const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;

    color: #222024;

    ${mobile({ width: "70%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 2px;

    ${mobile({ fontSize: "18px" })}
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;

    color: #222024;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;

    outline: none;

    margin: 20px 10px 0px 0px;
    padding: 10px;

    ${mobile({ fontSize: "12px", margin: "10px 10px 2px 2px" })}
`;

const Agreement = styled.span`
    font-size: 14px;
    margin: 20px 0px;
    text-align: justify;
    margin-right: 15px;

    ${mobile({ fontSize: "10px" })}
`;

const Button = styled.button`
    width: 40%;
    border: none;
    outline: none;

    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;

    margin-bottom: 10px;

    font-weight: 700;
    letter-spacing: 1px;

    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 2.5px 2.5px 5px 1px rgba(0, 0, 0, 0.2);

    transition: all 0.3s ease;

    &:hover {
        opacity: 0.9;
    }

    &:active {
        transform: translateY(2px);
        transition-duration: 0s;
    }

    ${mobile({ width: "100%" })}
`;

const Link = styled.a`
    font-size: 12px;
    text-decoration: underline;
    margin: 3px 0px;
    cursor: pointer;

    color: #222024;

    transition: all 0.3s ease;

    &:hover {
        color: black;
    }

    &:active {
        transform: translateY(1px);
        transition-duration: 0s;
    }
`;

const BTN_LINK = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`


const Register = () => {
    return (
        <Container>
            <Wrapper>
                <Title> NAPRAVI NALOG </Title>
                <Form>
                    <Input placeholder="Ime..."/>
                    <Input placeholder="Prezime..."/>
                    <Input placeholder="E-mail adresa..."/>
                    <Input placeholder="Korisničko ime..."/>
                    <Input placeholder="Lozinka..."/>
                    <Input placeholder="Potvrdite lozinku..."/>
                    <Agreement>
                        Kreiranjem naloga pristajem na obradu mojih ličnih podataka u skladu sa našom <b>POLITIKOM PRIVATNOSTI</b>.
                    </Agreement>
                    <BTN_LINK>
                        <Button> KREIRAJ PROFIL </Button>
                        <Link> Već imate nalog? Prijavite se! </Link>
                    </BTN_LINK>
                </Form>
            </Wrapper>
        </Container>
    )
};

export default Register;