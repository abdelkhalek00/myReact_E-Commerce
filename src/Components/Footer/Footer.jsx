import React, { useEffect, useState } from 'react'
import Style from "./Footer.module.css"


export default function Footer() {
    const [counter, setCounter] = useState(0)
    useEffect(() => {

    }, [])
    return (
        <>
            <h2>Footer</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, harum.</p>
        </>
    )
}
