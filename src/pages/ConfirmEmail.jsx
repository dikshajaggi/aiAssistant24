"use client"
import { SupabaseClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export default function ConfirmEmail() {
  const [status, setStatus] = useState("loading")
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    console.log(params, window.location.search, "window.location.search" )
    const access_token = params.get("access_token")
    const refresh_token = params.get("refresh_token")
    const type = params.get("type")

    if (!access_token || !refresh_token || type !== "signup") {
      setStatus("invalid")
      return
    }

    SupabaseClient.auth
      .setSession({ access_token, refresh_token })
      .then(async ({ error }) => {
        if (error) {
          setStatus("error")
          return
        }

        const { data: { user }, error: userError } = await SupabaseClient.auth.getUser()
        if (userError || !user) {
          setStatus("error")
          return
        }

        if (user.email_confirmed_at) {
          setStatus("success")
          setTimeout(() => navigate("/login"), 3000)
        } else {
          setStatus("notConfirmed")
        }
      })
  }, [navigate])

  const renderIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-16 h-16 text-success mx-auto animate-bounce" />
      case "error":
        return <XCircle className="w-16 h-16 text-alert mx-auto animate-pulse" />
      case "invalid":
      case "notConfirmed":
        return <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto animate-pulse" />
      default:
        return null
    }
  }

  const renderMessage = () => {
    switch (status) {
      case "loading":
        return <p className="text-gray-100 text-lg mt-4 animate-pulse">Verifying your email...</p>
      case "success":
        return (
          <>
            <h1 className="text-3xl font-bold text-white mt-4">Email Verified!</h1>
            <p className="text-gray-200 mt-2">Redirecting to login in 3 seconds...</p>
          </>
        )
      case "error":
        return (
          <>
            <h1 className="text-3xl font-bold text-white mt-4">Verification Failed</h1>
            <p className="text-gray-200 mt-2">Something went wrong. Please try again.</p>
          </>
        )
      case "invalid":
        return (
          <>
            <h1 className="text-3xl font-bold text-white mt-4">Invalid Link</h1>
            <p className="text-gray-200 mt-2">This confirmation link is invalid or expired.</p>
          </>
        )
      case "notConfirmed":
        return (
          <>
            <h1 className="text-3xl font-bold text-white mt-4">Not Confirmed</h1>
            <p className="text-gray-200 mt-2">We couldn’t confirm your email. Please request a new one.</p>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-scrren min-w-screen flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary via-primary to-neutral px-4">
      <div className="bg-textdark/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">
        {renderIcon()}
        {renderMessage()}

        {(status === "notConfirmed" || status === "invalid" || status === "error") && (
          <button
            onClick={() => navigate("/resend-confirmation")}
            className="mt-6 px-6 py-3 bg-white text-secondary font-semibold rounded-full shadow-lg hover:bg-purple-50 transition-all cursor-pointer"
          >
            Resend Confirmation
          </button>
        )}
      </div>
    </div>
  )
}
