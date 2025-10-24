import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(0)
export default function UserContextProvider(props) {

    const [userLogin, setUserLogin] = useState(null)
    const [userName, setUserName] = useState()


    useEffect(() => {
        if (localStorage.getItem("userToken") !== null) {
            setUserLogin(localStorage.getItem("userToken"))
        }
        if (localStorage.getItem("userName") !== null) {
            setUserName(localStorage.getItem("userName"))
        }
    }, [])
    return <UserContext.Provider value={{ userLogin, setUserLogin, setUserName, userName }}>
        {props.children}
    </UserContext.Provider>
}
