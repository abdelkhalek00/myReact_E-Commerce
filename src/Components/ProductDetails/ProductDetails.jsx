import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import Style from "./ProductDetails.module.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { ThemeContext } from '../../Context/ThemeContext';

export default function ProductDetails() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    let { currentTheme } = useContext(ThemeContext)
    let { id, category } = useParams();
    // console.log(id);
    // console.log(category);
    const [productDetails, setProductDetails] = useState()
    const [relatedProducts, setRelatedProducts] = useState([])
    function getProductDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
                // console.log(data);
                setProductDetails(data.data)
            })
            .catch((error) => {
                // console.log(error);
            })
    }
    function getRelatedProducts(category, id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let allProducts = data.data;
                let myRelatedProducts = allProducts.filter((product) => product.category.name == category)
                setRelatedProducts(myRelatedProducts)
            })
            .catch((error) => {
                // console.log(error);
            })
    }
    useEffect(() => {
        getProductDetails(id)
        getRelatedProducts(category)
    }, [id, category])
    return (
        <>
            {productDetails == null ? (
                <div className={Style.spinner}>
                    <div className={Style.doubleBounce1}></div>
                    <div className={Style.doubleBounce2}></div>
                </div>
            ) : <>
                <h2 className='text-danger'>ProductDetails</h2>
                <div className="row justify-content-center align-items-center py-3">
                    <div className="col-9 col-md-4 col-lg-3 mb-3 mb-md-0">
                        <div className="productImage">
                            <Slider {...settings}>
                                {productDetails?.images.map((imageSrc) => <img className='w-100 rounded-4' src={imageSrc} alt={productDetails?.title} />)}
                            </Slider>
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
                                {productDetails?.images?.map((image, index) => <div className="col-4 col-lg-3" key={index}>
                                    <img className='w-100 rounded-4' src={image} alt={`similar-${index}`} />
                                </div>)}
                            </div>
                            <button className={`btn w-100 btn-outline-danger mt-3`}>Add to Cart</button>
                        </div>
                    </div>
                    <div className="row py-5 g-4">
                        <h2 className='text-danger'>Related Products</h2>
                        {relatedProducts.map((product, index) => <div key={index} className="col-6 col-md-4 col-lg-3 col-xl-2">
                            <Link className={currentTheme === 'light' ? 'text-dark' : 'text-light'} to={`/productDetails/${product._id}/${product.category.name}`}>
                                <div className={`overflow-hidden ${Style.item}`}>
                                    <img className='w-100 rounded-4' src={product?.imageCover} alt="" />
                                    <span className='d-block text-danger'>{product.category.name}</span>
                                    <h5 className='fw-bold my-2'>{product.title.split(" ").slice(0, 3).join(" ")}</h5>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>{product.price + " EGP"}</span>
                                        <span>{product.ratingsAverage} <i className='fas fa-star text-warning'></i></span>
                                    </div>
                                    <button className={`btn btn-outline-danger mt-3 w-100 ${Style.btn}`}>Add to Cart</button>
                                </div>
                            </Link>
                        </div>
                        )}
                    </div>
                </div>
            </>}
        </>
    )
}
