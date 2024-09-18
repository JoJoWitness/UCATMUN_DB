import { Link } from 'react-router-dom';
import Ucatmun from '../assets/ucatmun.png'
import "../styles/navbar.css"
import { useState } from 'react';

export const Navbar = () => {

    const [snack, setSnack] = useState(false)
 
        return (
            <nav className="navbar">
                <img className='logo_container' src={Ucatmun} alt="Logo" />
                <div className='navbar_container_buttons'>
                    <NavbarButton comitte_logo={Ucatmun} comitte_name='Inicio' comitte_route='/'/>
                    <NavbarButton comitte_logo={Ucatmun} comitte_name='Inicio' comitte_route='/'/>
                    <NavbarButton comitte_logo={Ucatmun} comitte_name='Inicio' comitte_route='/'/>
                    <NavbarButton comitte_logo={Ucatmun} comitte_name='Inicio' comitte_route='/'/>
                    <NavbarButton comitte_logo={Ucatmun} comitte_name='Inicio' comitte_route='/'/>
                    <NavbarButton comitte_logo={Ucatmun} comitte_name='Inicio' comitte_route='/'/>
                    <NavbarButton comitte_logo={Ucatmun} comitte_name='Inicio' comitte_route='/'/>
                    <NavbarButton comitte_logo={Ucatmun} comitte_name='Inicio' comitte_route='/'/>
                </div>
                <div className='navbar_switch'>
                    <button className={'navbar_switch_button ' + ((!snack) ? ' navbar_switch_button_selected' : " ")} onClick={() => setSnack(false)}>
                        <Link to="/" >Datos</Link>
                    </button>
                    <button className={'navbar_switch_button ' + ((snack) ? ' navbar_switch_button_selected' : " ")} onClick={() => setSnack(true)}>
                        <Link to="/Refrigerios" >Refrigerios</Link>
                    </button>
                </div>
            </nav>

        )

}

type NavbarButtonProps ={
    comitte_logo: string,
    comitte_name: string
    comitte_route: string
}

const NavbarButton: React.FC<NavbarButtonProps> = ({comitte_logo, comitte_name, comitte_route}) =>{
    return(
        <button className='navbar_button'>
            <img src={comitte_logo}/>
            <Link to={comitte_route} >{comitte_name}</Link>
        </button>
    )
}