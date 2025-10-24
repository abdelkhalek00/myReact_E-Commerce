import React, { useEffect, useState } from 'react'
import Style from "./ErrorPage.module.css"


export default function ErrorPage() {
    const [counter, setCounter] = useState(0)
    useEffect(() => {

    }, [])
    return (
        <>
            <h2>ErrorPage</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, harum.</p>
        </>
    )
}
