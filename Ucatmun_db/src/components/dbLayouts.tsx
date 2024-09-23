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
        <p  className="user_data_large">Cargo</p>
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
        <p className="user_data_large">Alergia</p>
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
  id: number
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

const UserDataOdd: React.FC<UserDataProps> =  (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [id, setId] = useState(props.id)
  const [representacion, setRepresentacion] = useState(props.representacion);
  const [nombre, setNombre] = useState(props.nombre);
  const [cargo, setCargo] = useState(props.cargo);
  const [cedula, setCedula] = useState(props.cedula);
  const [edad, setEdad] = useState(props.edad);
  const [correo, setCorreo] = useState(props.correo);
  const [telefono, setTelefono] = useState(props.telefono);
  const [delegacion, setDelegacion] = useState(props.delegacion);
  const [alergias, setAlergias] = useState(props.alergias);
  const [numeroRep, setNumeroRep] = useState(props.numero_rep);


  async function handleSave(){
   
    setIsEditing(!isEditing)
 
    const { data, error } = await supabase
      .from("ucatmun_delegados")
      .update({ 
        nombre: nombre,
        cedula: cedula,
        edad: edad,
        correo: correo,
        telefono: telefono,
        delegacion: delegacion,
        alergias: alergias,
        numero_rep: numeroRep,})
      .eq("id", id); 

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      console.log("Profile updated successfully:", data);

    }
  }


  return (
    <div className="user_data_odd">
      <p  className="user_data_large">{representacion}</p>
      <div className="database_separator"/>
      <p  className="user_data_large">{cargo}</p>
      <div className="database_separator"/>
      {isEditing ? (
        <>
          <input className="user_data_large" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <div className="database_separator"/>
          <input className="user_data_mid" type="number" value={cedula} onChange={(e) => setCedula(e.target.value)} />
          <div className="database_separator"/>
          <input className="user_data_small" type="number" value={edad} onChange={(e) => setEdad(Number(e.target.value))} />
          <div className="database_separator"/>
          <input className="user_data_large" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          <div className="database_separator"/>
          <input className="user_data_mid" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          <div className="database_separator"/>
          <input className="user_data_small" value={delegacion} onChange={(e) => setDelegacion(e.target.value)} />
          <div className="database_separator"/>
          <input className="user_data_large" value={alergias} onChange={(e) => setAlergias(e.target.value)} />
          <div className="database_separator"/>
          <input className="user_data_mid" value={numeroRep} onChange={(e) => setNumeroRep(e.target.value)} />
        </>
      ) : (
        <>
          <p className="user_data_large">{nombre}</p>
          <div className="database_separator"/>
          <p className="user_data_mid">{cedula}</p>
          <div className="database_separator"/>
          <p className="user_data_small">{edad}</p>
          <div className="database_separator"/>
          <p className="user_data_large">{correo}</p>
          <div className="database_separator"/>
          <p className="user_data_mid">{telefono}</p>
          <div className="database_separator"/>
          <p className="user_data_small">{delegacion}</p>
          <div className="database_separator"/>
          <p className="user_data_large">{alergias}</p>
          <div className="database_separator"/>
          <p className="user_data_mid">{numeroRep}</p>
        </>
      )}
      <div className="user_edit_odd">
        {
          (isEditing) ? 
          <button className="user_edit_button" onClick={() => handleSave()}>
            <img src={check}/>
          </button> :
          <button className="user_edit_button" onClick={() => setIsEditing(!isEditing)}>
            <img src={edit}/>
          </button>
        }
      </div>
     
    </div>
  );
}
const UserDataEven: React.FC<UserDataProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [id, setId] = useState(props.id)
  const [representacion, setRepresentacion] = useState(props.representacion);
  const [nombre, setNombre] = useState(props.nombre);
  const [cargo, setCargo] = useState(props.cargo);
  const [cedula, setCedula] = useState(props.cedula);
  const [edad, setEdad] = useState(props.edad);
  const [correo, setCorreo] = useState(props.correo);
  const [telefono, setTelefono] = useState(props.telefono);
  const [delegacion, setDelegacion] = useState(props.delegacion);
  const [alergias, setAlergias] = useState(props.alergias);
  const [numeroRep, setNumeroRep] = useState(props.numero_rep);


  async function handleSave() {
   
    setIsEditing(!isEditing)
 
    const { data, error } = await supabase
      .from("ucatmun_delegados")
      .update({ 
        nombre: nombre,
        cedula: cedula,
        edad: edad,
        correo: correo,
        telefono: telefono,
        delegacion: delegacion,
        alergias: alergias,
        numero_rep: numeroRep,})
      .eq("id", id); 

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      console.log("Profile updated successfully:", data);
      // setUserImgUrl(imageUrl);
    
    }
  }


  return (
    <div className="user_data_even">
      <p  className="user_data_large">{representacion}</p>
      <div className="database_separator_even"/>
      <p  className="user_data_large">{cargo}</p>
      <div className="database_separator_even"/>
      {isEditing ? (
        <>
          <input className="user_data_large" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <div className="database_separator_even"/>
          <input className="user_data_mid" type="number" value={cedula} onChange={(e) => setCedula(e.target.value)} />
          <div className="database_separator_even"/>
          <input className="user_data_small" type="number" value={edad} onChange={(e) => setEdad(Number(e.target.value))} />
          <div className="database_separator_even"/>
          <input className="user_data_large" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          <div className="database_separator_even"/>
          <input className="user_data_mid" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          <div className="database_separator_even"/>
          <input className="user_data_small" value={delegacion} onChange={(e) => setDelegacion(e.target.value)} />
          <div className="database_separator_even"/>
          <input className="user_data_large" value={alergias} onChange={(e) => setAlergias(e.target.value)} />
          <div className="database_separator_even"/>
          <input className="user_data_mid" value={numeroRep} onChange={(e) => setNumeroRep(e.target.value)} />
        </>
      ) : (
        <>
           <p className="user_data_large">{nombre}</p>
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
          <p className="user_data_large">{alergias}</p>
          <div className="database_separator_even"/>
          <p className="user_data_mid">{numeroRep}</p>
        </>
      )}

      <div className="user_edit_even">
      {
          (isEditing) ? 
          <button className="user_edit_button" onClick={() => handleSave()}>
            <img src={check}/>
          </button> :
          <button className="user_edit_button" onClick={() => setIsEditing(!isEditing)}>
            <img src={edit}/>
          </button>
        }
      </div>
    </div>
  );
}