import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";



export const Root = () => {
    return (
        <>
            <Navbar />
            <main style={{ width: "100%", height: "100%" }}>
                <Outlet />
            </main>
        </>
    )
}
