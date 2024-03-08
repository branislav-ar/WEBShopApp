import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import Announcement from '../components/Announcement/Announcement';
import Newsletter from '../components/Newsletter/Newsletter';
import Footer from '../components/Footer/Footer';

//icon import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

const Container = styled.div`
    cursor: default;
`;

const Wrapper = styled.div`
    display: flex;
    padding: 50px;
    ${mobile({ flexDirection: "column", padding: "10px" })}

`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;

    ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;

    color: #222024;

    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 400;
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 300;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;

    width: 50%;
    margin: 30px 0px;

    ${mobile({ width: "100%", flexDirection: "column" })}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
    margin-right: 30px;

    ${mobile({ margin: "10px 4px" })}
`;

const FilterTitleColor = styled.span`
    font-size: 20px;
    font-weight: 200;
    margin-right: 10px;
`;

const FilterColor = styled.div`
    border: 2px solid #ebebeb;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;

    cursor: pointer;
    transition: all 0.3s ease;

    :hover {
        opacity: 0.83;
    }

    &:active {
        transform: scale(1.1);
        transition-duration: 0s;
    }
`;

const FilterTitleSize = styled.span`
    font-size: 20px;
    font-weight: 200;
    margin-left: 10px;
    /* margin: 0px 10px; */

    ${mobile({ marginLeft: "0px" })}
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 8px;
`;

const FilterSizeOption = styled.option`
`;

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 50%;

    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Icon = styled.div`
    font-size: 24px;
    cursor: pointer;
    margin-right: 15px;

    transition: all 0.3s ease;

    :hover {
        opacity: 0.83;
    }

    &:active {
        transform: scale(1.1);
        transition-duration: 0s;
    }
`;

const Amount = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 2px solid teal;

    margin-right: 15px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;

    font-weight: 500;

    transition: all 0.4s ease;

    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 2.5px 2.5px 5px 1px rgba(0, 0, 255, 0.2);

    :hover {
        background-color: #f8f4f4;
    }

    &:active {
        transform: scale(1.02);
        transition-duration: 0s;
    }
`;


const Product = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);

    const [color, setcolor] = useState("");
    const [size, setSize] = useState("");

    const dispatch = useDispatch();



    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
            }
            catch {}
        };

        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if(type==="dec") {
            quantity>1 && setQuantity(quantity-1);
        }
        else {
            setQuantity(quantity+1);
        }
    }

    const handleClick = () => {
        dispatch(addProduct({ ...product, quantity, color, size }));
    };

    return (
        <Container>
            <Navbar/>
            <Announcement/>

            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>

                    <Title>
                        {product.title}
                    </Title>
                    <Description>
                        {product.desc}
                    </Description>
                    <Price>
                        ${product.price}
                    </Price>

                    <FilterContainer>
                        <Filter>
                            <FilterTitleColor> BOJA: </FilterTitleColor>
                            {product.color?.map((c) => 
                                <FilterColor color={c} key={c} onClick={()=>setcolor(c)}> </FilterColor>
                            )}
                            
                        </Filter>
                        <Filter>
                            <FilterTitleSize> VELIČINA: </FilterTitleSize>
                            <FilterSize onChange={(e)=>setSize(e.target.value)}>
                                {product.size?.map((size) => 
                                    <FilterSizeOption key={size}> {size} </FilterSizeOption>
                                )}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>

                    <AddContainer>
                        <AmountContainer>
                            <Icon onClick={() => handleQuantity("dec")}>
                                <FontAwesomeIcon icon={ faMinusCircle } />
                            </Icon>
                            <Amount>
                                {quantity}
                            </Amount>
                            <Icon onClick={() => handleQuantity("inc")}>
                                <FontAwesomeIcon icon={ faPlusCircle } />
                            </Icon>
                        </AmountContainer>
                        <Button onClick={handleClick}> DODAJ U KORPU </Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>

            <Newsletter/>
            <Footer/>
        </Container>
    );
};

export default Product;
