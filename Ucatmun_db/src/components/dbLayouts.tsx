import { useEffect, useState } from "react"
import "../styles/database.css" 
import check from "../assets/save.svg"
import edit from "../assets/edit.svg"
import { supabase } from "../supabaseClient"
import { useLocation } from "react-router-dom"

export const DatabaseLayouts = () => {

  const [allDelegados, setAllDelegado] = useState<any[]>([]);
  const location = useLocation();
  const [dataFetched, setDataFetched] = useState(false);
  const lastPathSegment = location.pathname.split('/').filter(Boolean).pop();

  const userData = 
    {
      representacion: "Dinamarca",
      name: "John Doe",
      cargo: "Delegado",
      id: "123456789",
      edad: 20,
      correo: "johnDoe@gmail.com",
      telefono: "0414-1234567",
      delegacion: "MUNET",
      alergias: "Ninguna",
      numero_rep: ""
    }

    const fetchAllDelegados = async () =>{
      const { data: delegados, error } = await supabase
      .from("ucatmun_delegados")
      .select()
      .eq("comite",lastPathSegment)
      .order('id')
  
      if (error) {
        console.error("Error fetching tweets:", error);
      } else {
        setAllDelegado(delegados)
        setDataFetched(true);
      }
      
    }
    
    useEffect(() => {
      fetchAllDelegados();
  
      return () => {
      
        setAllDelegado([]);
      };
    }, [lastPathSegment]);

    console.log('aqui')


  return (
    <div className="database_container">
      <div className="database_header">
        <p className="user_data_large">Representación</p>
        <div className="database_separator"/>
        <p  className="user_data_xlarge">Cargo</p>
        <div className="database_separator"/>
        <p  className="user_data_large">Nombre</p>
        <div className="database_separator"/>
        <p className="user_data_mid">Cedula</p>
        <div className="database_separator"/>
        <p className="user_data_small">Edad</p>
        <div className="database_separator"/>
        <p  className="user_data_large">Correo</p>
        <div className="database_separator"/>
        <p className="user_data_mid">Telefono</p>
        <div className="database_separator"/>
        <p className="user_data_small">Delegación</p>
        <div className="database_separator"/>
        <p className="user_data_xlarge">Alergia</p>
        <div className="database_separator"/>
        <p className="user_data_mid">Numero Rep</p>
        <div className="user_invisible"/>
      </div>
      {allDelegados.map((delegado, index) => (
        index % 2 === 0 ? (
          <UserDataEven key={index} {...delegado} />
        ) : (
          <UserDataOdd key={index} {...delegado} />
        )
      ))}
    
    </div>
  )
}

interface UserDataProps {
  representacion: string;
  nombre: string;
  cargo: string;
  cedula: string;
  edad: number;
  correo: string;
  telefono: string;
  delegacion: string;
  alergias: string;
  numero_rep: string;
}

const UserDataOdd: React.FC<UserDataProps> = ({representacion, nombre, cargo, cedula, edad, correo, telefono, delegacion, alergias, numero_rep}) => {
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <div className="user_data_odd">
      <p  className="user_data_large">{representacion}</p>
      <div className="database_separator"/>
      <p  className="user_data_xlarge">{cargo}</p>
      <div className="database_separator"/>
      <p  className="user_data_large">{nombre}</p>
      <div className="database_separator"/>
      <p className="user_data_mid">{cedula}</p>
      <div className="database_separator"/>
      <p className="user_data_small">{edad}</p>
      <div className="database_separator"/>
      <p  className="user_data_large">{correo}</p>
      <div className="database_separator"/>
      <p className="user_data_mid">{telefono}</p>
      <div className="database_separator"/>
      <p className="user_data_small">{delegacion}</p>
      <div className="database_separator"/>
      <p className="user_data_xlarge">{alergias}</p>
      <div className="database_separator"/>
      <p className="user_data_mid">{numero_rep}</p>
      <div className="user_edit_odd">
        <button className="user_edit_button" onClick={() => setIsEditing(!isEditing)}>
          {(isEditing) ? <img src={check}/> : <img src={edit}/>}
        </button>
      </div>
     
    </div>
  );
}
const UserDataEven: React.FC<UserDataProps> = ({representacion, nombre, cargo, cedula, edad, correo, telefono, delegacion, alergias, numero_rep}) => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className="user_data_even">
      <p  className="user_data_large">{representacion}</p>
      <div className="database_separator_even"/>
      <p  className="user_data_xlarge">{cargo}</p>
      <div className="database_separator_even"/>
      <p  className="user_data_large">{nombre}</p>
      <div className="database_separator_even"/>
      <p className="user_data_mid">{cedula}</p>
      <div className="database_separator_even"/>
      <p className="user_data_small">{edad}</p>
      <div className="database_separator_even"/>
      <p className="user_data_large">{correo}</p>
      <div className="database_separator_even"/>
      <p className="user_data_mid">{telefono}</p>
      <div className="database_separator_even"/>
      <p className="user_data_small">{delegacion}</p>
      <div className="database_separator_even"/>
      <p className="user_data_xlarge">{alergias}</p>
      <div className="database_separator_even"/>
      <p className="user_data_mid">{numero_rep}</p>
      <div className="user_edit_even">
        <button className="user_edit_button" onClick={() => setIsEditing(!isEditing)}>
          {(isEditing) ? <img src={check}/> : <img src={edit}/>}
        </button>
      </div>
    </div>
  );
}