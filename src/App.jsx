import { RouterProvider } from "react-router-dom"
import router from "./routes"
import { MainContextProvider } from "./context/MainContext"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <div className='bg-neutral overflow-hidden'>
      <MainContextProvider>
        <RouterProvider router={router} />
        <ToastContainer newestOnTop />
      </MainContextProvider>
    </div>
  )
}

export default App
