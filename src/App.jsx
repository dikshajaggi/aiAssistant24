import { RouterProvider } from "react-router-dom"
import router from "./routes/routes"
import { MainContextProvider } from "./context/MainContext"
import { ToastContainer } from "react-toastify"
import { LayoutProvider } from "./context/LayoutContext"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


function App() {
  return (
    <div className='bg-white overflow-hidden'>
      <MainContextProvider>
        <LayoutProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
          <RouterProvider router={router} />
          <ToastContainer newestOnTop />
          </LocalizationProvider>
        </LayoutProvider>
      </MainContextProvider>
    </div>
  )
}

export default App
