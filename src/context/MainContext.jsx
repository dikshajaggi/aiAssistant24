import { createContext, useEffect, useState } from "react";

const MainContext = createContext()

const MainContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [signedUp, setSignedUp] = useState(null)
    const [patients, setPatients] = useState([
        {
            "id": 534672354,
            "name": "Aarav Mehta",
            "age": 32,
            "gender": "male",
            "appointment_date": "2025-09-05",
            "treatment": "Dental Cleaning"
        },
        {
            "id": 98908099,
            "name": "Priya Sharma",
            "age": 27,
            "gender": "female",
            "appointment_date": "2025-09-06",
            "treatment": "Root Canal"
        },
        {
            "id": 213123123,
            "name": "Rohan Gupta",
            "age": 45,
            "gender": "male",
            "appointment_date": "2025-09-07",
            "treatment": "Tooth Extraction"
        },
        {
            "id": 656435675,
            "name": "Simran Kaur",
            "age": 36,
            "gender": "female",
            "appointment_date": "2025-09-08",
            "treatment": "Braces Consultation"
        },
        {
            "id": 1268789753,
            "name": "Aditya Verma",
            "age": 52,
            "gender": "male",
            "appointment_date": "2025-09-09",
            "treatment": "Dental Implant"
        }
        ])
    const [isSubscribed, setIsSubscribed] = useState(false)


    useEffect(() => {
        if (localStorage.getItem("token")) setIsLoggedIn(true)
    }, [])

    return (
       <MainContext.Provider value ={{
            isLoggedIn,
            setIsLoggedIn,
            signedUp,
            setSignedUp,
            isSubscribed,
            setIsSubscribed,
            patients,
            setPatients
        }}
       >
        {props.children}
       </MainContext.Provider>
    )
}

export {MainContextProvider, MainContext}