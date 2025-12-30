import axios from "axios"

const baseUrl = "https://dental-marketing-assistant.onrender.com/"

const api = axios.create({
  baseURL: baseUrl,
})

// attaching token automatically to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


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

export const addVisit = async (data) => {
  const res = await api.post("/add_visit", data)
  return res
}

export const specificPatientVisitData = async (patient_id) => {
  const res = await api.get(`/get_visits/${patient_id}`)
  return res
}

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

export const sendReminder = async(data) => {
  const res = await api.post("/", data)
  return res
}