import { Outlet } from "react-router-dom";
import { Navbar, Navbar_Mobile } from "../components/navbar";
import { useViewport } from "../hooks/customHooks";



export const Root = () => {
    const { width } = useViewport();
  const breakpoint = 620;

    return (
        <>
           {width > breakpoint ? <Navbar /> : <Navbar_Mobile/>} 
            <main style={{ width: "100%", height: "100%" }}>
                <Outlet />
            </main>
        </>
    )
}
