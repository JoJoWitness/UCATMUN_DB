import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { UserInfo } from "./routes/UserInfo"
import { Root } from "./routes/crmRoot"
import { DatabaseLayouts } from "./components/dbLayouts"
import { SnackLayout } from "./components/snackLayout"

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" >
              <Route element={<Root/>}>
                <Route  path="/" element={<DatabaseLayouts/>}/>
                <Route  path="/Refrigerios" element={<SnackLayout/>}/>
              </Route>
              <Route path="Delegado" element={<UserInfo/>} />       
            </Route>
        </>
    )
)

export default function App() {
    return <RouterProvider router={router} />
}