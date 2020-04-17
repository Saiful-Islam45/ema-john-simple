import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetails = () => {
    const { productKey } = useParams();
    const [product,setProduct] = useState(null);
    useEffect(()=>{
        fetch('https://agile-beach-69705.herokuapp.com/product/'+productKey)
        .then(res=>res.json())
        .then(data=>{
            setProduct(data);
        })
    },[productKey])
    
    return (
        <div>
            <h1>Product Details: {productKey}</h1>
            {
                product && <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetails;