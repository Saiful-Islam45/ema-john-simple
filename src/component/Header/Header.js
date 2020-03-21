import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { useAuth } from '../User-auth';


const Header = () => {

    const auth = useAuth();
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage Inventory</a>
                {
                    auth.user && <span style={{ color: 'white', fontWeight: 400 }}> Welcome {auth.user.name}</span>
                }
                {
                    auth.user ? <a href="/login"> Sign out</a> : <a href="/login">Sign in</a>
                }
            </nav>
        </div>
    );
};

export default Header;