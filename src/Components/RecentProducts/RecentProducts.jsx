import React, { useContext, useEffect, useState } from 'react'
import Style from "./RecentProducts.module.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../Context/ThemeContext'


export default function RecentProducts() {
    let { currentTheme } = useContext(ThemeContext)
    const [recentProducts, setRecentProducts] = useState([])
    const [myRecentProducts, setMyRecentProducts] = useState([])
    function getRecentProducts() {
        axios.get("https://ecommerce.routemisr.com/api/v1/products")
            .then(({ data }) => {
                console.log(data);
                setRecentProducts(data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getRecentProducts();
    }, [])
    return (
        <>
            <div className="row g-4 py-3">
                {recentProducts.map((product) => <div className="col-sm-12 col-md-4 col-lg-3 col-xl-2">
                    <div className={`overflow-hidden py-2 ${Style.product}`}>
                        <Link to={`/productDetails/${product._id}`} className={currentTheme === 'light' ? `text-dark` : `text-light`}>
                            <img className={`w-100 rounded-4 mb-2 ${Style.image}`} src={product.imageCover} alt={product.title} />
                            <span className='d-block text-danger'>{product.category.name}</span>
                            <h5 className='fw-bold my-2'>{product.title.split(" ").slice(0, 3).join(" ")}</h5>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span>{product.price + " EGP"}</span>
                                <span>{product.ratingsAverage} <i className='fas fa-star text-warning'></i></span>
                            </div>
                            <button className={`btn btn-outline-danger mt-3 w-100 ${Style.btn}`}>Add to Cart</button>
                        </Link>
                    </div>
                </div>)}

            </div>
        </>
    )
}
