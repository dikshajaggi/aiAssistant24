import { createContext, useState } from "react";

const MainContext = createContext()

const MainContextProvider = (props) => {
    const [signedUp, setSignedUp] = useState(true)
    const [isSubscribed, setIsSubscribed] = useState(false)

    return (
       <MainContext.Provider value ={{
            signedUp,
            setSignedUp,
            isSubscribed,
            setIsSubscribed
        }}
       >
        {props.children}
       </MainContext.Provider>
    )
}

export {MainContextProvider, MainContext}