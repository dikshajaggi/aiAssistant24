import { RouterProvider } from "react-router-dom"
import router from "./routes/routes"
import { MainContextProvider } from "./context/MainContext"
import { ToastContainer } from "react-toastify"
import { LayoutProvider } from "./context/LayoutContext"

function App() {
  return (
    <div className='bg-white overflow-hidden'>
      <MainContextProvider>
        <LayoutProvider>
          <RouterProvider router={router} />
          <ToastContainer newestOnTop />
        </LayoutProvider>
      </MainContextProvider>
    </div>
  )
}

export default App
