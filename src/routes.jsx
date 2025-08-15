import { createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Pricing from "./pages/Pricing"
import BookDemo from "./pages/BookDemo"
import NotFound from "./pages/NotFound"
import Walkthrough from "./pages/Walkthrough"
import Privacy from "./pages/Privacy"
import Features from "./pages/Features"
import About from "./pages/About"
import Contact from "./pages/Contact"
import TermsOfService from "./pages/TermsOfService"
import AuthLayout from "./layouts/AuthLayout"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {index: true, element: <Home />},
            {path: "/pricing", element: <Pricing />},
            {path: "/bookdemo", element: <BookDemo />},
            {path: "/walkthrough", element: <Walkthrough />},
            {path: "/privacy", element: <Privacy />},
            {path: "/terms", element: <TermsOfService />},
            {path: "/about", element: <About />},
            {path: "/contact", element: <Contact />},
            {path: "/features", element: <Features />},
            //other routes having header and footer....
        ]
    },
    {
        path: "/login",
        element: (
            <AuthLayout>
                <Login />
            </AuthLayout>
        )
    },
    {
        path: "/signup",
        element: (
            <AuthLayout>
                <SignUp />
            </AuthLayout>
        )
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router