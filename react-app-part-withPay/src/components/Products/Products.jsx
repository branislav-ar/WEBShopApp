import React from 'react';
import styled from 'styled-components';
import ProductsItem from './ProductsItem';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    justify-content: space-between;
`

const Products = ({ cat, filters, sort }) => {
  
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get( cat ? `http://localhost:5000/shop/products?category=${cat}`
                                                 : `http://localhost:5000/shop/products`
                                            );
                setProducts(res.data);
            }
            catch(err) {}
        };
        getProducts();
    }, [cat]);

    useEffect(() => {
        cat &&
            setFilteredProducts(
                products.filter((item) => 
                    Object.entries(filters).every(([key, value]) => 
                        item[key].includes(value)
                    )
                )
            );
    }, [products, cat, filters]);

    useEffect(() => {
        if(sort === "newest") {
            setFilteredProducts(prev => 
                [...prev].sort((a,b) => a.createdAt - b.createdAt)
            );
        }
        else if(sort === "asc") {
            setFilteredProducts(prev => 
                [...prev].sort((a,b) => a.price - b.price)
            );
        }
        else {
            setFilteredProducts(prev => 
                [...prev].sort((a,b) => b.price - a.price)
            );
        }
    }, [sort])

  return (
  <Container>
      { cat
            ? filteredProducts.map((item) => 
                <ProductsItem item={item} key={item._id}/>)
            :
              products.slice(0, 8).map((item) => 
                <ProductsItem item={item} key={item._id}/>)
      }
  </Container>
  );
};

export default Products;
