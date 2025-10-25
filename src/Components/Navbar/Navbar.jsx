import React, { useContext, useEffect, useState } from 'react'
import Style from "./Navbar.module.css"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from "../../assets/cristiano-ronaldo-cr7-seeklogo.png"
import { UserContext } from '../../Context/userContext'
import { ThemeContext } from '../../Context/ThemeContext'
export default function Navbar() {
    let navigate = useNavigate()
    let { userLogin, setUserLogin} = useContext(UserContext)
    let{currentTheme,setCurrentTheme}=useContext(ThemeContext)
    
    useEffect(() => {

    }, [])

    function handleLogout() {
        localStorage.removeItem("userToken")
        setUserLogin(null)
        localStorage.removeItem("userName")
        navigate('./login')

    }
    return (
        <>
            <nav className={`navbar navbar-expand-lg ${currentTheme==='light'?'navbar-light bg-light':'navbar-dark bg-dark'} position-sticky top-0 ${Style.zIndex}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3" to="/"><img src={logo} alt="" className={Style.image} /><span>Brand</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " to="cart">Cart</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " to="products">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " to="brands">Brands</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " to="categories">Categories</NavLink>
                            </li>
                        </ul>
                        {currentTheme==="light"?<i className="fa-solid fa-moon text-dark me-3 fs-5" onClick={()=>{setCurrentTheme("dark")}}></i>:<i className="fa-solid fa-sun text-warning me-3 fs-5" onClick={()=>{setCurrentTheme("light")}}></i>} 
                        {userLogin !== null ? <form className="d-flex align-items-center justify-content-center">
                            <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
                        </form> : <form className="d-flex align-items-center justify-content-center">
                            <Link to="register"><button className='btn btn-outline-primary me-3'>Register</button></Link>
                            <Link to="login"><button className='btn btn-outline-success'>Login</button></Link>
                        </form>}    
                    </div>
                </div>
            </nav>
        </>
    )
}
