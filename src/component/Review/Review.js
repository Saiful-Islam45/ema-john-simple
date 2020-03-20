import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlacedOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();

    }

    const removeProduct = (productKey) => {
        console.log("remove clicked", productKey);
        const newCartItem = cart.filter(pd => pd.key !== productKey);
        setCart(newCartItem);
        removeFromDatabaseCart(productKey);

    }
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find((pd) => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProducts);

    }, []);
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="" />;
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9">
                        {
                            cart.map(pd => <ReviewItems
                                key={pd.key}
                                product={pd}
                                removeProduct={removeProduct}
                            ></ReviewItems>)
                        }
                        {
                            thankYou
                        }
                    </div>
                    <div className="col-md-3">
                        <Cart cart={cart}>
                            <button onClick={handlePlacedOrder} className="main-button">Place Order</button>
                        </Cart>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Review;