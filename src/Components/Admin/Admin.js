import React, { useContext, useEffect, useState } from 'react';
import './Admin.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { UserContext } from '../../App';
import { Redirect} from 'react-router';
// import { Link } from 'react-router-dom';




const Admin = (props) => {
    const { productsData } = useContext(UserContext);
    const [products, setProducts] = productsData;
    // console.log(products)

    

    const [showProduct, setShowProduct] = useState(true);

    const { register, handleSubmit, } = useForm();
    const [imageURL, setImageURL] = useState(null);


    const onSubmit = data => {
        const eventData = {
            name: data.name,
            weight: data.weight,
            price: data.price,
            imageURL: imageURL
        }
        const url = `https://arcane-tor-01112.herokuapp.com/addProducts`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(res => {
                if (res) {
                    alert('Your event has been added successfully');
                }
            })
    };


    const handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '7684772cfe35d7b1d344467f4a18bdba');
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    const deleteEvent = (id) =>{
        fetch(`https://arcane-tor-01112.herokuapp.com/delete/${id}`, {
            method: 'DELETE',
        })
        .then(res => {
            if(res){
                alert('Your event deleted successfully');
                // history.go(0);
                // window.location.reload();
               props.history.push('/home');
            }
        })
    }

    return (
        <div id="viewport">
            <div id="sidebar">
                <header>
                    <h1 className="text-white">Daily Needs</h1>
                </header>
                <ul className="nav">
                    <li>
                        <button onClick={() => setShowProduct(true)} className="btn btn-primary">
                            Manage Product
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setShowProduct(false)} className="btn btn-primary mt-3">
                            Add Product
                        </button>
                    </li>
                </ul>
            </div>

            <div id="content">
                <div className="container-fluid">
                    {
                        showProduct ?

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Weight</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((product) => (
                                            <tr key={product._id}>
                                                <td>{product.name}</td>
                                                <td>{product.weight}</td>
                                                <td>$ {product.price}</td>
                                                <td><button onClick= {() => deleteEvent(product._id)} className="btn btn-primary">Delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            :
                            <form className=" justify-content-center align-item-center d-flex mt-5 bg-primary rounded" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-5">
                                    <div className="mb-3">
                                        <label for="name" className="form-label text-white">Product Name</label>
                                        <input name="name" className="form-control" defaultValue="Product Name" ref={register} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="weight" className="form-label text-white">Weight</label>
                                        <input name="weight" type="text" className="form-control" defaultValue="1 KG" ref={register} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="price" className="form-label text-white">Add Price</label>
                                        <input name="price" type="number" className="form-control" defaultValue="20" ref={register} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleRequired" className="form-label text-white">Choose a Picture</label>
                                        <input name="exampleRequired" onChange={handleImageUpload} className="form-control" type="file" />
                                    </div>

                                    <div className="mb-3 justify-content-center align-item-center d-flex">
                                        <input className="btn btn-warning" type="submit" />
                                    </div>
                                </div>

                            </form>
                    }
                </div>
            </div>
        </div>
    );
};

export default Admin;