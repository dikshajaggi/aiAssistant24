import { Navigate } from "react-router-dom"

const PublicRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem("smileLytics.aiLoginToken")

    if (isLoggedIn) {
        return <Navigate to="/dashboard" replace />
    }

    return children
}

export default PublicRoute
