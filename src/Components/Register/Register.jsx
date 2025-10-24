import React, { useContext, useEffect, useState } from 'react'
import Style from "./Register.module.css"
import { Formik, useFormik } from 'formik'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/userContext';
import { ThemeContext } from '../../Context/ThemeContext';
export default function Register() {
    let { setUserLogin,setUserName } = useContext(UserContext)
    let{currentTheme}=useContext(ThemeContext)
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    let navigate = useNavigate()
    let registerValidate = Yup.object().shape({
        name: Yup.string().min(3, 'minlength is 3').max(12, 'maxlength is 10').required('name is required'),
        email: Yup.string().email('email is invalid'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number").required("phone number is required"),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must be at least 6 characters, include one uppercase letter, one lowercase letter, and one number.'),
        rePassword: Yup.string().oneOf([Yup.ref("password")], 'password not match')
    })
    async function handleRegister(formeValues) {
        setIsLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formeValues)
            .then((apiResponse) => {
                if (apiResponse.data.message === 'success') {
                    navigate('/')
                    localStorage.setItem('userToken', apiResponse.data.token)
                    setUserLogin(apiResponse.data.token)
                    localStorage.setItem('userName', apiResponse.data.user.name)
                    setUserName(apiResponse.data.user.name)
                    setIsLoading(false)
                    setApiError('')
                    console.log(apiResponse);
                }
            })
            .catch((apiResponse) => {
                setIsLoading(false)
                setApiError(apiResponse?.response?.data?.message)
            })
    }
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            rePassword: ""
        },
        validationSchema: registerValidate,
        onSubmit: handleRegister
    })
    return (
        <>
            <form className="container col-md-6 col-12" onSubmit={formik.handleSubmit}>
                <div className="row g-3">
                    <div className="header col-12">
                        <h2 className='text-primary'>Register Now</h2>
                    </div>
                    {apiError ? <div className="alert alert-danger" role="alert">{apiError}</div> : null}
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">name</label>
                        <input type="text" className="form-control" id="inputName" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    {formik.errors.name && formik.touched.name ? <div class="alert alert-danger" role="alert">
                        {formik.errors.name}
                    </div> : null}
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger" role="alert">
                        {formik.errors.email}
                    </div> : null}
                    <div className="col-12">
                        <label htmlFor="inputPhone" className="form-label">Phone</label>
                        <input type="tel" className="form-control" id="inputPhone" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    {formik.errors.phone && formik.touched.phone ? <div class="alert alert-danger" role="alert">
                        {formik.errors.phone}
                    </div> : null}
                    <div className="col-12">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    {formik.errors.password && formik.touched.password ? <div class="alert alert-danger" role="alert">
                        {formik.errors.password}
                    </div> : null}
                    <div className="col-12">
                        <label htmlFor="inputRePassword4" className="form-label">rePassword</label>
                        <input type="password" className="form-control" id="inputRePassword4" name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger" role="alert">
                        {formik.errors.rePassword}
                    </div> : null}
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        {isLoading == false ? <button type="submit" className="btn btn-outline-primary me-3">Register</button> : <button type="submit" className="btn btn-light" disabled ><i className='fas fa-spinner fa-spin'></i> Register</button>}
                        <span>Have already account? <NavLink className={currentTheme==="light"?'text-dark':'text-body'} to="/login">Login here</NavLink></span>
                    </div>
                </div>
            </form>
        </>
    )
}
