import React from 'react';

const ReviewItems = (props) => {

    const { name, quantity, key, price } = props.product;

    return (
        <div>
            <div className="product-item mb-4 pb-4 pl-5">
                <h5 className="product-name">{name}</h5>
                <p>Quantity: {quantity}</p>
                <p>Price: ${price}</p>
                <button
                    className="main-button"
                    onClick={() => props.removeProduct(key)}>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItems;