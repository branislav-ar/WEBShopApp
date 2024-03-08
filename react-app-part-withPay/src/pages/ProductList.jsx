import React from 'react';
import styled from 'styled-components';

import Announcement from '../components/Announcement/Announcement';
import Navbar from '../components/Navbar/Navbar';
import Newsletter from '../components/Newsletter/Newsletter';
import Footer from '../components/Footer/Footer';
import Products from '../components/Products/Products';
import { mobile } from '../responsive';

import { useLocation } from 'react-router-dom';
import { useState } from 'react';


const Container = styled.div`
    cursor: default;
`;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;

    ${mobile({ marginRight: "0px", fontSize: "12px" })}
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;

    ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option`
    
`;

const ProductList = () => {

    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    
    const [filters, setFilters] = useState({});
    
    const [sort, setSort] = useState("najnovije");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Title> {cat} </Title>
            <FilterContainer>
                <Filter>
                    <FilterText> Filtriraj proizvode: </FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>
                            boja
                        </Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>yellow</Option>
                        <Option>green</Option>
                        <Option>pink</Option>
                        <Option>purple</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled>
                            veličina
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText> Sortiraj proizvode: </FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="najnovije">najnovije</Option>
                        <Option value="asc">cena (rastuće)</Option>
                        <Option value="desc">cena (opadajuće)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
            <Newsletter/>
            <Footer/>
        </Container>
    );
};

export default ProductList;
