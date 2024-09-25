import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { UserInfo } from "./routes/UserInfo"
import { Root } from "./routes/crmRoot"
import { DatabaseLayouts } from "./components/dbLayouts"
import { SnackLayout } from "./components/snackLayout"
import { useEffect, useState } from "react"
import ucatmun from "./assets/ucatmun.png"
import "./styles/auth.css"
import { supabase } from "./supabaseClient"




const router = createBrowserRouter(
    createRoutesFromElements(
      
        <>
            <Route path="/" >
              <Route path="/"element={<Root/>}>
                <Route index element={<Navigate to="IUPsyS" />}/>
                <Route path=":Comite" element={<DatabaseLayouts/>}/>
              </Route>
              <Route path="/Refrigerios" element={<Root/>}>
                <Route index element={<Navigate to="IUPsyS" />}/>
                <Route path=":Comite" element={<SnackLayout/>}/>
              </Route>
              <Route path="/Delegado/:cedula" element={<UserInfo/>} />       
            </Route>
        </>
    )
)

export default function App() {

  const [session, setSession] = useState(null)
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      //@ts-ignore
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      //@ts-ignore
      setSession(session)
      
    

    })

    return () => subscription.unsubscribe()
  }, [])

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user,
      password: password,
    })

    if (error) {
      console.log(error)
      alert("Hubo un error de auntentificación")
      return
    }
  }

  if(!session){
      return ( 
      <div className="auth_mainContainer">
         <div className="auth_container">
            <img src={ucatmun} alt="ucatmun"/>
            <div className="auth_inputContainer">
              <h3>Correo</h3>
              <input 
                placeholder="correo@email.com"
                type="text"
                onChange={(e) => setUser(e.target.value)}/>
            </div>
            <div className="auth_inputContainer">
              <h3>Contraseña</h3>
              <input 
                placeholder="123321" 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button  
              className="auth_button"
              onClick={()=>signInWithEmail()}>Ingresar</button>
         </div>
         
      </div>)
  }
  else{

    return <RouterProvider router={router} />
  }
}