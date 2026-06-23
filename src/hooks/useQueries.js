import { useQuery } from "@tanstack/react-query"
import { getAllPatients, getAllVisits, dashboardData, getClinicProfile } from "../apis"

export const usePatients = () =>
  useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const res = await getAllPatients()
      const d = res.data
      return Array.isArray(d) ? d : d?.data || d?.patients || []
    },
    staleTime: 5 * 60 * 1000,
  })

export const useVisits = () =>
  useQuery({
    queryKey: ["visits"],
    queryFn: async () => {
      const res = await getAllVisits()
      const d = res.data
      return Array.isArray(d) ? d : d?.data || d?.visits || []
    },
    staleTime: 2 * 60 * 1000,
  })

export const useDashboard = () =>
  useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await dashboardData()
      return res.data
    },
    staleTime: 5 * 60 * 1000,
  })

export const useClinicProfile = () =>
  useQuery({
    queryKey: ["clinicProfile"],
    queryFn: async () => {
      const res = await getClinicProfile()
      return res.data
    },
    staleTime: 30 * 60 * 1000,
  })

// Requires getAutomationSettings to be added to apis.js before enabling
export const useAutomationSettings = () =>
  useQuery({
    queryKey: ["automationSettings"],
    queryFn: () => Promise.resolve(null),
    staleTime: 30 * 60 * 1000,
    enabled: false,
  })
