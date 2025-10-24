import { useState } from 'react'
import './App.css'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import UserContextProvider from './Context/userContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ThemeContextProvider from './Context/ThemeContext'
import ProductDetails from './Components/ProductDetails/ProductDetails'
let Router = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <ErrorPage /> }
    ]
  }
])
function App() {


  return <UserContextProvider>
    <ThemeContextProvider>
      <RouterProvider router={Router}></RouterProvider>
    </ThemeContextProvider>
  </UserContextProvider>

}

export default App
