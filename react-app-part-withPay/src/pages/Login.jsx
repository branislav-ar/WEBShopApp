import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch } from 'react-redux';
import { login } from '../redux/apiCalls';
import { useSelector } from 'react-redux';

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
        url("https://i.ibb.co/VCH7qKW/login-bg1.jpg") center;
    background-size: cover;
    `;

const Wrapper = styled.div`
    padding: 20px;
    width: 25%;
    background-color: white;

    color: #222024;

    ${mobile({ width: "75%" })}

`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 2px;

    color: #222024;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 15px;

    color: #222024;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    
    outline: none;

    margin: 10px 0px;
    padding: 10px;
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

    transition: all 0.4s ease;

    &:hover {
        opacity: 0.9;
    }

    &:active {
        transform: translateY(2px);
        transition-duration: 0s;
    }

    ${mobile({ width: "100%" })}

`;

const Error = styled.span`
    margin: 3px 0px;
    font-size: 15px;
    color: red;
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


    const Login = () => {

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const dispatch = useDispatch();
        const { error } = useSelector((state) => state.user);

        const handleClick = (e) => {
            e.preventDefault();
            login(dispatch, {username, password});
        }

        return (
            <Container>
                <Wrapper>
                    <Title> PIJAVI SE </Title>
                    <Form>
                        <Input 
                            placeholder="Korisničko ime..."
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input 
                            placeholder="Lozinka..."
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={handleClick}> PRIJAVI SE </Button>
                        { error && <Error>Došlo je do greške!</Error> }
                        <Link> Zaboravili ste lozinku? </Link>
                        <Link> Napravite novi nalog! </Link>
                    </Form>
                </Wrapper>
            </Container>
        )
    };

export default Login;
