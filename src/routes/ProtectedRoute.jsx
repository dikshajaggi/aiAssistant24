import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem("smileLytics.aiLoginToken")

    if (!isLoggedIn) {
        return <Navigate to="/login" replace state={{ message: "You must log in to access this page." }} />
    }

    return children
}

export default ProtectedRoute
