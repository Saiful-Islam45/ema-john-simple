import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useAuth } from '../User-auth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    
    const { register, handleSubmit, errors } = useForm();
    const [shipInfo, setShipInfo] = useState(null);
    const[orderId, setOrderId] = useState(null);
    const stripePromise = loadStripe('pk_test_YYcvOjDJI8MD9GhRuUDPpEkF00eTZ20BpQ');
    const auth = useAuth();
    const onSubmit = data => {
        setShipInfo(data);
        //TODO:move after payment
       
    }
    const handlePlaceOrder = (paymentMethod)=>{
        const saveCart = getDatabaseCart();
        const orderInfo = {
            email: auth.user.email,
            cart: saveCart,
            Shipment: shipInfo,
            paymentMethod: paymentMethod
        };
        fetch('https://agile-beach-69705.herokuapp.com/placeOrder', {
            method: 'POST',
            body: JSON.stringify(orderInfo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(order => {
                setOrderId(order._id);
               //clear local shopping cart
               processOrder();

            })
    }
    return (

        <div className="container">
            <div className="row">
                <div style={{display: shipInfo && 'none'}} className="col-md-6">
                    <h3>Shipment Information</h3>
                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                        <input name="name" defaultValue={auth.user.name} placeholder="ex. Elen Morgan" ref={register({ required: true })} />
                        {errors.name && <span className="error">Name is required</span>}

                        <input name="email" defaultValue={auth.user.email} placeholder="test@alo.com" ref={register({ required: true })} />
                        {errors.email && <span className="error">Email is required</span>}

                        <input name="addressLine1" placeholder="Shampain" ref={register({ required: true })} />
                        {errors.addressLine1 && <span className="error">Address is required</span>}
                        <input name="addressLine2" placeholder="additional address line" ref={register} />

                        <input name="city" placeholder="Dhaka" ref={register({ required: true })} />
                        {errors.city && <span className="error">City is required</span>}

                        <input name="country" placeholder="Bangladesh" ref={register({ required: true })} />
                        {errors.country && <span className="error">Country is required</span>}

                        <input name="zipcode" placeholder="1205" ref={register({ required: true })} />
                        {errors.zipcode && <span className="error">zipcode is required</span>}

                        <input type="submit" />
                    </form >
                </div>
                <div style={{display: shipInfo?'block':'none'}} className="col-md-6 mt-4">
                    <h3>Payment Information</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
                    </Elements>
                    {
                        orderId && <div>
                            <h3>Thank you for shopping</h3>
                    <p>Your Oder Id Is:{orderId}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Shipment;