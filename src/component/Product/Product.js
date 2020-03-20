import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props);

    const { name, img, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div className="p-4">
                <img className="rounded border border-warning" src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name"><Link to={"/product/" + key}>{name}</Link></h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stack - Order Soon</small></p>
                <br />
                {props.showAddToCart && <button onClick={() => props.handleAddProduct(props.product)} className="main-button"><FontAwesomeIcon icon={faShoppingCart} />Add to Cart</button>}
            </div>
        </div>
    );
};

export default Product;