import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../User-auth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { console.log(data) }
    const auth = useAuth();
    return (

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
    )
};

export default Shipment;