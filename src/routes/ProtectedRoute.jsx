// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    // const isLoggedIn = !!localStorage.getItem("smileLytics.aiLoginToken")  // or use context/Auth provider
    // // const role = localStorage.getItem("smileLytics.aiClinic_role")

    // console.log(localStorage.getItem("smileLytics.aiLoginToken"), "isLoggedIn")
    // if (!isLoggedIn) {
    //     return <Navigate to="/login" replace state={{ message: "You must log in to access this page." }} />

    // }

    return children
}

export default ProtectedRoute
