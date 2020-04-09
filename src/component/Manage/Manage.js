import React from 'react';

const Manage = () => {
    const handleInventory=()=>{
       //add new product
    }
    return (
        <div>
            <h1>This is manage.</h1>
            <button className="btn-primary btn" onClick={handleInventory}>Add Inventory</button>
        </div>
    );
};

export default Manage;