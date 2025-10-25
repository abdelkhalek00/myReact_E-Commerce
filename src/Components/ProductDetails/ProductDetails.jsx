import React, { useEffect, useState } from 'react'
import Style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';


export default function ProductDetails() {
    let { id } = useParams();
    console.log(id);
    const [productDetails, setProductDetails] = useState()
    function getProductDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
                console.log(data);
                setProductDetails(data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getProductDetails(id)
    }, [id])
    return (
        <>
            <h2 className='text-danger'>ProductDetails</h2>
            <div className="row justify-content-center align-items-center py-3">
                <div className="col-9 col-md-4 col-lg-3 mb-3 mb-md-0">
                    <div className="productImage">
                        <img className='w-100 rounded-4' src={productDetails?.imageCover} alt={productDetails?.title} />
                    </div>
                </div>
                <div className="col-10 col-md-7">
                    <div className="aboutProduct px-3">
                        <span className='d-block text-danger fs-5 fw-bolder'>{productDetails?.category.name}</span>
                        <h2 className='fw-bold my-3'>{productDetails?.title}</h2>
                        <p className='fw-medium'>{productDetails?.description}</p>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='fw-medium'>{productDetails?.price + " EGP"}</span>
                            <span className='fw-medium'>{productDetails?.ratingsAverage} <i className='fas fa-star text-warning'></i></span>
                        </div>
                        <div className="row justify-content-start my-3 g-3">
                            {productDetails?.images?.map((image, index) => {
                                return <>
                                    <div className="col-4 col-lg-3" key={index}>
                                        <img className='w-100 rounded-4' src={image} alt={`similar-${index}`} />
                                    </div>
                                </>

                            })}
                        </div>
                        <button className={`btn w-100 btn-outline-danger mt-3`}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}
