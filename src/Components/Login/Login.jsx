
import React, { useContext, useEffect, useState } from 'react'
import Style from "./Login.module.css"
import { Formik, useFormik } from 'formik'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/userContext';
import { ThemeContext } from '../../Context/ThemeContext';
export default function Login() {
    let { userLogin, setUserLogin ,setUserName} = useContext(UserContext)
    let{currentTheme}=useContext(ThemeContext)
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    let navigate = useNavigate()
    let loginValidate = Yup.object().shape({
        email: Yup.string().email('invalid email').required("email is required"),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must be at least 6 characters, include one uppercase letter, one lowercase letter, and one number.').required("password is required")
    })
    async function handleLogin(formeValues) {
        setIsLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formeValues)
            .then((apiResponse) => {
                if (apiResponse.data.message === 'success') {
                    navigate("/")
                    setIsLoading(false)
                    setApiError('')
                    console.log(apiResponse);
                    localStorage.setItem('userToken', apiResponse.data.token)
                    setUserLogin(apiResponse.data.token)
                    localStorage.setItem('userName', apiResponse.data.user.name)
                    setUserName(apiResponse.data.user.name)
                    
                }
            })
            .catch((apiResponse) => {
                setIsLoading(false)
                setApiError(apiResponse.response.data.message)
            })
    }
    let formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValidate,
        onSubmit: handleLogin
    })
    useEffect(() => {

    }, [])
    return (
        <>

            <form className="container col-md-6 col-12" onSubmit={formik.handleSubmit}>
                <div className="row g-3">
                    <div className="header col-12">
                        <h2 className='text-success'>Login Now</h2>
                    </div>
                    {apiError ? <div className="alert alert-danger" role="alert">{apiError}</div> : null}
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger" role="alert">
                        {formik.errors.email}
                    </div> : null}

                    <div className="col-12">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger" role="alert">
                        {formik.errors.password}
                    </div> : null}

                    <div className="col-12 d-flex justify-content-between align-items-center">
                        {isLoading == false ? <button type="submit" className="btn btn-outline-success me-3">Login</button> : <button type="submit" className="btn btn-light" disabled ><i className='fas fa-spinner fa-spin'></i> Login</button>}
                        <span>Don't Have an account? <NavLink className={`${currentTheme==="light"?'text-dark ':'text-body'} text-decoration-underline`} to="/register">Sign up</NavLink></span>
                    </div>
                </div>
            </form>

        </>
    )
}
