import React from 'react';
import { Link } from 'react-router-dom';

const AllProduct = ({product}) => {
    // console.log(product._id);
    return (
        <div className="col-md-3 mt-3">
            <div className="card bg-primary rounded" style={{width: "18rem"}}>
                <img src={product.imageURL} style={{width: "300px"}} className="img-fluid card-img-top" alt="" />
                <div class="card-body text-white">
                    <h5 className="card-title text-center">{product.name} -{product.weight}</h5>
                    <div className="d-flex mt-3">
                        <h5>${product.price}</h5>
                        <Link to={`/product/${product._id}`} className="btn btn-warning ms-auto">Buy Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProduct;