import { RouterProvider } from "react-router-dom"
import router from "./routes"
import { MainContextProvider } from "./context/MainContext"

function App() {
  return (
    <div className='bg-neutral overflow-hidden'>
      <MainContextProvider>
        <RouterProvider router={router} />
      </MainContextProvider>
    </div>
  )
}

export default App
