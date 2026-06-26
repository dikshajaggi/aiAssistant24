import { createContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const MainContext = createContext()

const MainContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [signedUp, setSignedUp] = useState(null)
    const [patients, setPatients] = useState([])
    const [isSubscribed, setIsSubscribed] = useState(true)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("smileLytics.aiLoginToken")) setIsLoggedIn(true)
    }, [])

    useEffect(() => {
        if (!isLoggedIn) return;
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) setSignedUp(user);
        });
    }, [isLoggedIn])

    const logout = () => {
        localStorage.removeItem("smileLytics.aiLoginToken")
        setIsLoggedIn(false)
        setSignedUp(null)
        setPatients([])
    }

    return (
       <MainContext.Provider value ={{
            isLoggedIn,
            setIsLoggedIn,
            signedUp,
            setSignedUp,
            isSubscribed,
            setIsSubscribed,
            patients,
            setPatients,
            logout,
            isSearchOpen,
            setIsSearchOpen,
        }}
       >
        {props.children}
       </MainContext.Provider>
    )
}

export {MainContextProvider, MainContext}