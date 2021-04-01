import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { log } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = log;
    useEffect(() => {
        fetch('https://arcane-tor-01112.herokuapp.com/info?email=' + loggedIn.email)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [orders])


    let total = 0;
    for (let i = 0; i < orders.length; i++) {
        const product = orders[i];
        total = (total + product.product?.price * 1);
    }

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h1 className="text-danger mt-3 justify-content-center align-items-center d-flex rounded-3">Order Details</h1>
            <div className="row">
                <div className="col-md-6 bg-warning text-danger mt-3 justify-content-center align-items-center d-flex rounded-3">
                    <div className="mt-3">
                        <h6 className="justify-content-center align-items-center d-flex">Total Orders: {orders.length}</h6>
                        <h3 className="justify-content-center align-items-center d-flex">User Information :</h3>
                        <p className="justify-content-center align-items-center d-flex">Name: {loggedIn.name}</p>
                        <p className="justify-content-center align-items-center d-flex">Email: {loggedIn.email}</p>
                    </div>
                </div>


                <div className="col-md-6">
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Weight</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Order Time</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                orders.map((order) => (
                                    <tr>
                                        <td>{order.product?.name}</td>
                                        <td>{order.product?.weight}</td>
                                        <td>1</td>
                                        <td>$ {order.product?.price}</td>
                                        <td>{(new Date(order.orderTime).toDateString('dd/MM/yyyy'))}</td>
                                    </tr>
                                ))


                            }
                            <tr>
                                <td>Total</td>
                                <td></td>
                                <td></td>
                                <td>$ {formatNumber(total)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default Orders;