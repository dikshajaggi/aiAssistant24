import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"
import Pricing from "../pages/Pricing"
import BookDemo from "../pages/BookDemo"
import NotFound from "../pages/NotFound"
import Walkthrough from "../pages/Walkthrough"
import Privacy from "../pages/Privacy"
import Features from "../pages/Features"
import About from "../pages/About"
import Contact from "../pages/Contact"
import TermsOfService from "../pages/TermsOfService"
import AuthLayout from "../layouts/AuthLayout"
import PublicRoute from "./PublicRoute"
import Dashboard from "../pages/Dashboard"
import Patients from "../pages/Patients"
import Appointments from "../pages/Appointments"
import Analytics from "../pages/Analytics"
import DashboardLayout from "../layouts/DashboardLayout"
import ConfirmEmail from "../pages/ConfirmEmail"
import ProtectedRoute from "./ProtectedRoute"
import Reminders from "@/pages/Reminders"
import AiAnalysis from "@/pages/AIAnalysis"
import Prescriptions from "@/pages/Prescriptions"
import Profile from "@/pages/Profile"


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {index: true, element: <PublicRoute><Home /></PublicRoute>},
            {path: "/pricing", element: <Pricing />},
            {path: "/bookdemo", element: <BookDemo />},
            {path: "/walkthrough", element: <Walkthrough />},
            {path: "/privacy", element: <Privacy />},
            {path: "/terms", element: <TermsOfService />},
            {path: "/about", element: <About />},
            {path: "/contact", element: <Contact />},
            {path: "/features", element: <Features />},
            {path: "/confirmation", element: <ConfirmEmail />}
            //other routes having header and footer....
        ]
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            { path: "patients", element: <Patients /> },
            { path: "appointments", element: <Appointments /> },
            { path: "prescriptions", element: <Prescriptions /> },
            { path: "reminders", element: <Reminders /> },
            { path: "analytics", element: <Analytics /> },
            { path: "ai-analysis", element: <AiAnalysis /> },
            { path: "profile", element: <Profile /> },
        ],
    },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <AuthLayout>
                    <Login />
                </AuthLayout>
            </PublicRoute>
        )
    },
    {
        path: "/signup",
        element: (
            <PublicRoute>
                <AuthLayout>
                    <SignUp />
                </AuthLayout>
            </PublicRoute>
        )
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router