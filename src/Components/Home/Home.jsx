import React, { useEffect, useState } from 'react'
import Style from "./Home.module.css"
import RecentProducts from '../RecentProducts/RecentProducts'


export default function Home() {
    const [counter, setCounter] = useState(0)
    useEffect(() => {

    }, [])
    return (
        <>
            <div>
                <h3 className='text-danger'>Home Section</h3>
                <RecentProducts/>
            </div>
        </>
    )
}
