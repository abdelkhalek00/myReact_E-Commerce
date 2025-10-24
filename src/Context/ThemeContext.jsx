import { createContext, useEffect, useState } from "react";
export let ThemeContext=createContext()
export default function ThemeContextProvider(props){

    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme")||"light")

    useEffect(() => {
    document.body.setAttribute('data-bs-theme', currentTheme)
        localStorage.setItem("theme",currentTheme)
        // console.log(currentTheme);
        
  }, [currentTheme])

    return <ThemeContext.Provider value={{currentTheme,setCurrentTheme}}>
        {props.children}
    </ThemeContext.Provider>
}