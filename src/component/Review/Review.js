import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../User-auth';

const Review = () => {
    const auth = useAuth();
    const [cart, setCart] = useState([]);
    //const [orderPlaced, setOrderPlaced] = useState(false);

    const removeProduct = (productKey) => {
        console.log("remove clicked", productKey);
        const newCartItem = cart.filter(pd => pd.key !== productKey);
        setCart(newCartItem);
        removeFromDatabaseCart(productKey);

    }
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        fetch('https://agile-beach-69705.herokuapp.com/getProductsByKey',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>{
            const cartProducts = productKeys.map(key => {
                const product = data.find((pd) => pd.key === key);
                product.quantity = saveCart[key];
                return product;
            });
            setCart(cartProducts);
        })

    }, []);
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
                            !cart.length && <h4 style={{ color: 'red' }}>Ooops,Still you have nothing to proceed!!!!<a href="/shop">Buy Now</a></h4>
                        }
                    </div>
                    <div className="col-md-3">
                        <Cart cart={cart}>
                            <Link to="shipment">
                                {
                                    auth.user ?
                                        <button className="main-button">Proceed Checkout </button> : <button className="main-button">Login to Proceed</button>
                                }
                            </Link>
                        </Cart>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Review;