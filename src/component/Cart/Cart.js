import React from 'react';

//import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

const Cart = (props) => {
    const cart = props.cart;

    const total = cart.reduce((total, prd) => total + prd.price * prd.quantity, 0)
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 10) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }
    const tax = total * 10 / 100;
    const grandTotal = total + shipping + tax;
    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4>Order Summary :</h4>
            <p>Item Ordered : {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p>(+)10% tax : {formatNumber(tax)}</p>
            <p><small>(+)Shipping Cost: {shipping}</small></p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
            <br />
            {
                props.children
            }

        </div>
    );
};

export default Cart; 