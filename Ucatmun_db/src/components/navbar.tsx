import { Link, useLocation } from 'react-router-dom';
import Ucatmun from '../assets/ucatmun.png'
import Psi from '../assets/IUPsyS.png'
import Oit from '../assets/ILO.png'
import Cop16 from '../assets/cop16.png'
import Onu from '../assets/Emblem_of_the_United_Nations.svg'
import caef_omc from '../assets/CAEF-OMC.png'
import UEFA from '../assets/uefa.png'
import "../styles/navbar.css"
import Bilderberg from '../assets/Bilderberg.png'
import Prensa from '../assets/prensa.png'
import Protoclo from '../assets/protocolo.svg'

import { useEffect, useState } from 'react';



export const Navbar = () => {
    const location = useLocation();
    const lastPathSegment = location.pathname.split('/').filter(Boolean).pop();
    const pathSegments = location.pathname.split('/').filter(Boolean);
  
   
    useEffect(() => {

        if(pathSegments[0] == 'Refrigerios'){
            setSnack(true)
        }else{
            setSnack(false)
        }
    }, [pathSegments]);

    const [snack, setSnack] = useState(false)
 
         return (
            <nav className="navbar">
                <img className='logo_container' src={Ucatmun} alt="Logo" />
                <div className='navbar_container_buttons'>
                    <NavbarButton comitte_logo={Psi} comitte_name='IUPsyS' comitte_route='IUPsyS' bg={false} active={lastPathSegment === 'IUPsyS'}/>
                    <NavbarButton comitte_logo={Oit} comitte_name='OIT' comitte_route='OIT' active={lastPathSegment === 'OIT'}  bg={false}/>
                    <NavbarButton comitte_logo={Cop16} comitte_name='Cop16' comitte_route='COP16' active={lastPathSegment === 'COP16'}  bg={false}/>
                    <NavbarButton comitte_logo={Onu} comitte_name='GEGNU' comitte_route='GEGNU'bg={true} active={lastPathSegment === 'GEGNU'}/>
                    <NavbarButton comitte_logo={caef_omc} comitte_name='CAEF-OMC' comitte_route='CAEF-OMC'bg={true} active={lastPathSegment === 'CAEF-OMC'}/>
                    <NavbarButton comitte_logo={UEFA} comitte_name='UEFA' comitte_route='UEFA' bg={false} active={lastPathSegment === 'UEFA'} />
                    <NavbarButton comitte_logo={Bilderberg} comitte_name='Bilderberg' comitte_route='Bilderberg' active={lastPathSegment === 'Bilderberg'} bg={true}/>
                    <NavbarButton comitte_logo={Prensa} comitte_name='Prensa' comitte_route='Prensa' bg={true} active={lastPathSegment === 'Prensa'} />
                    <NavbarButton comitte_logo={Ucatmun} comitte_name='Mesas' comitte_route='Mesas' bg={false} active={lastPathSegment === 'Mesas'} />
                    <NavbarButton comitte_logo={Protoclo} comitte_name='Protocolo' comitte_route='Protocolo' bg={false} active={lastPathSegment === 'Protocolo'} />
                </div>
                <div className='navbar_switch'>
                    <button className={'navbar_switch_button ' + ((!snack) ? ' navbar_switch_button_selected' : " ")} >
                        <Link to="/" >Datos</Link>
                    </button>
                    <button className={'navbar_switch_button ' + ((snack) ? ' navbar_switch_button_selected' : " ")} >
                        <Link to="/Refrigerios" >Refrigerios</Link>
                    </button>
                </div>
            </nav>

        )
    

}

type NavbarButtonProps ={
    comitte_logo: string,
    comitte_name: string,
    comitte_route: string,
    bg: boolean,
    active: boolean
}

const NavbarButton: React.FC<NavbarButtonProps> = ({comitte_logo, comitte_name, comitte_route, bg, active}) =>{
    return(
        <button className={`navbar_button ${active ? 'navbar_button_active' : ''}`}>
            <img className={bg ? "navbar_button_bg" : ""} src={comitte_logo}/>
            <Link to={comitte_route} relative='route'>{comitte_name}</Link>
        </button>
    )
}


// eslint-disable-next-line react-refresh/only-export-components
export const Navbar_Mobile = () => {
    const location = useLocation();
    const lastPathSegment = location.pathname.split('/').filter(Boolean).pop();
    
  
 
  
 
        return (
            <nav className="navbar navbar_mobile navbar-expand-lg m-0 p-0 p-3">
            <div className="container-fluid">
              <button className="navbar-toggler" style={{border: "none"}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon "></span>
              </button>
              <div className="collapse navbar-collapse mt-3" id="navbarNav">
                 <div className='navbar_container_buttons'>
                     <NavbarButton comitte_logo={Psi} comitte_name='IUPsyS' comitte_route='IUPsyS' bg={false} active={lastPathSegment === 'IUPsyS'}/>
                     <NavbarButton comitte_logo={Oit} comitte_name='OIT' comitte_route='OIT' active={lastPathSegment === 'OIT'}  bg={false}/>
                     <NavbarButton comitte_logo={Cop16} comitte_name='Cop16' comitte_route='COP16' active={lastPathSegment === 'COP16'}  bg={false}/>
                     <NavbarButton comitte_logo={Onu} comitte_name='GEGNU' comitte_route='GEGNU'bg={true} active={lastPathSegment === 'GEGNU'}/>
                     <NavbarButton comitte_logo={caef_omc} comitte_name='CAEF-OMC' comitte_route='CAEF-OMC'bg={true} active={lastPathSegment === 'CAEF-OMC'}/>
                     <NavbarButton comitte_logo={UEFA} comitte_name='UEFA' comitte_route='UEFA' bg={false} active={lastPathSegment === 'UEFA'} />
                     <NavbarButton comitte_logo={Bilderberg} comitte_name='Bilderberg' comitte_route='Bilderberg' active={lastPathSegment === 'Bilderberg'} bg={true}/>
                     <NavbarButton comitte_logo={Prensa} comitte_name='Prensa' comitte_route='Prensa' bg={true} active={lastPathSegment === 'Prensa'} />
                     <NavbarButton comitte_logo={Ucatmun} comitte_name='Mesas' comitte_route='Mesas' bg={false} active={lastPathSegment === 'Mesas'} />
                     <NavbarButton comitte_logo={Protoclo} comitte_name='Protocolo' comitte_route='Protocolo' bg={false} active={lastPathSegment === 'Protocolo'} />
                 </div>
              </div>
            </div>
          </nav>

        )

}