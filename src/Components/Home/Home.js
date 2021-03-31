import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import AllProduct from '../AllProduct/AllProduct';

const Home = () => {
    const { productsData } = useContext(UserContext);
    const [products, setProducts] = productsData;
    // console.log(products);
    useEffect(() => {
        fetch('https://arcane-tor-01112.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div className="row">
            {
                products.length === 0 && <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {
                products.map(product => <AllProduct product={product}></AllProduct>)
            }
        </div>
    );
};

export default Home;