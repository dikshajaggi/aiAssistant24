import { RouterProvider } from "react-router-dom"
import router from "./routes/routes"
import { MainContextProvider } from "./context/MainContext"
import { ToastContainer } from "react-toastify"
import { LayoutProvider } from "./context/LayoutContext"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import OnboardingTour from "./pages/OnboardingTour"
import ErrorBoundary from "./components/ErrorBoundary"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <div className='bg-white dark:bg-slate-900 overflow-hidden'>
          <MainContextProvider>
            <LayoutProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
              <RouterProvider router={router} />
              <ToastContainer newestOnTop />
              {/* <OnboardingTour /> */}
              </LocalizationProvider>
            </LayoutProvider>
          </MainContextProvider>
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
