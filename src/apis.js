import axios from "axios"
import { toast } from "react-toastify"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("smileLytics.aiLoginToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On 401 clear token and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("smileLytics.aiLoginToken")
      window.location.replace("/login")
    }
    return Promise.reject(error)
  }
)



//-----------------------------------------------------------------------------

export const getMyProfile = async () => {
    const res = await api.get("/me/profile")
    return res
}
// -------------------- patients --------------------------------------

export const addPatients = async (data) => {
    const res = await api.post("/add_patient", data)
    return res
}

export const getAllPatients = async () => {
    const res = await api.get("/get_patients")
    return res
}

export const getPatientByPhone = async (phone) => {
    const res = await api.get(`/get_patients_by_phone/${phone}`)
    return res
}

export const editPatientData = async (patient_id, data) => {
  const res = await api.patch(`/edit_patient/${patient_id}`, data)
  return res
}

export const deletePatient = async (patient_id) => {
  const res = await api.delete(`/delete_patient/${patient_id}`)
  return res
}

// -------------------- visits --------------------------------------

export const addVisit = async (data) => {
  const res = await api.post("/add_visit", data)
  return res
}

export const getAllVisits = async () => {
  const res = await api.get("/get_visits")
  return res
}

export const specificPatientVisitData = async (patient_id) => {
  const res = await api.get(`/get_visits/${patient_id}`)
  return res
}

export const editPatientVisitData = async (visit_id, data) => {
  const res = await api.patch(`/edit_visit/${visit_id}`, data)
  return res
}

export const deletePatientVisit = async (visit_id) => {
  const res = await api.delete(`/delete_visit/${visit_id}`)
  return res
}

// -------------------- onboarding ----------------------------------

export const onboard = async () => {
  const res = await api.post("/onboard")
  return res
}

// -------------------- others --------------------------------------

export const dashboardData = async () => {
  const res = await api.get("/dashboard")
  return res
}

export const remindPatient = async (data) => {
  const res = await api.post("/remind_patient", data)
  return res
}

export const scheduleFollowUp = async (data) => {
  const res = await api.post("/schedule_followup", data)
  return res
}

export const getClinicProfile = async () => {
    const res = await api.get("/clinic_profile")
    return res
}

export const updateClinicProfile = async (data) => {
    const res = await api.put("/clinic_profile", data)
    return res
}

// -------------------- analytics ----------------------------------

export const getAnalyticsRevenue = async (period) => {
  const res = await api.get(`/analytics/revenue?period=${period}`)
  return res
}

export const getAnalyticsRevenueByTreatment = async () => {
  const res = await api.get("/analytics/revenue-by-treatment")
  return res
}

export const getAnalyticsRetention = async () => {
  const res = await api.get("/analytics/retention")
  return res
}

export const getAnalyticsTopTreatments = async () => {
  const res = await api.get("/analytics/top-treatments")
  return res
}

export const getAnalyticsSeasonalTrends = async () => {
  const res = await api.get("/analytics/seasonal-trends")
  return res
}

export const getAnalyticsBusySlots = async () => {
  const res = await api.get("/analytics/busy-slots")
  return res
}

// -------------------- prescriptions ----------------------------------

export const generatePrescription = async (data) => {
  try {
    const res = await api.post("/generate_prescription_pdf", data, {
      responseType: "blob",
    })
    const contentType = res.headers["content-type"] || ""
    if (contentType.includes("application/pdf")) {
      const url = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }))
      window.open(url, "_blank")
      toast.success("Prescription generated successfully!")
    } else {
      const text = await res.data.text()
      const json = JSON.parse(text)
      if (json.download_url) {
        window.open(json.download_url, "_blank")
      }
      toast.success(json.message || "Prescription generated!")
    }
    return res
  } catch (err) {
    const errData = err.response?.data
    let message = "Failed to generate prescription"
    if (errData instanceof Blob) {
      try {
        const text = await errData.text()
        const json = JSON.parse(text)
        message = json.message || json.detail || message
      } catch {}
    } else {
      message = errData?.message || errData?.detail || message
    }
    toast.error(message)
    throw err
  }
}
