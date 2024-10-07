import { useEffect, useRef, useState } from "react"
import "../styles/database.css" 
import check from "../assets/save.svg"
import edit from "../assets/edit.svg"
import { supabase } from "../supabaseClient"
import { Link, useLocation } from "react-router-dom"
import Upload from "../assets/Upload.svg"
import trash from "../assets/trash.svg"

export const DatabaseLayouts = () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allDelegados, setAllDelegado] = useState<any[]>([]);
  const location = useLocation();

  const lastPathSegment = location.pathname.split('/').filter(Boolean).pop();



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
      }
      
    }
    
    useEffect(() => {
      fetchAllDelegados();
  
      return () => {
      
        setAllDelegado([]);
      };
    }, [lastPathSegment]);



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
        <p className="user_data_mid">Numero Emer</p>
        <div className="user_upload_invisible"/>
        <div className="user_invisible"/>
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
  const [id] = useState(props.id)
  const [representacion] = useState(props.representacion);
  const [nombre, setNombre] = useState(props.nombre);
  const [cargo] = useState(props.cargo);
  const [cedula, setCedula] = useState(props.cedula);
  const [edad, setEdad] = useState(props.edad);
  const [correo, setCorreo] = useState(props.correo);
  const [telefono, setTelefono] = useState(props.telefono);
  const [delegacion, setDelegacion] = useState(props.delegacion);
  const [alergias, setAlergias] = useState(props.alergias);
  const [numeroRep, setNumeroRep] = useState(props.numero_rep);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userImg, setUserImg] = useState<File>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUserImg(file);
    
    }
  };

  async function uploadFile() {
    if(userImg){
      const { error } = await supabase
        .storage
        .from('users_image')
        .upload(`${cedula}`,  userImg,{
        upsert: true,
        
      })
      if (error) {
        console.error("Error updating user image:", error);
      } 
    }
  }


  async function handleSave(){
   
    setIsEditing(!isEditing)

    if (userImg) {
      uploadFile();
    }

 
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
      setNombre("")
      setCedula("")
      setEdad(0)
      setCorreo("")
      setDelegacion("")
      setNumeroRep("")
      setTelefono("")
      setAlergias("")

      console.log("Profile updated successfully:", data);

    }
  }

  async function handleDelete(){
   
    setIsEditing(!isEditing)

  
    const { data, error } = await supabase
      .from("ucatmun_delegados")
      .update({ 
        nombre: null,
        cedula: null,
        edad: null,
        correo: null,
        telefono: null,
        delegacion: null,
        alergias: null,
        numero_rep: null,})
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
          <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
          <div className="user_upload_invisible">
            <img src={Upload} onClick={() => fileInputRef.current?.click()}/>
            <p>{userImg?.name}</p>
          </div>
          
        </>
      ) : (
        <>
          <Link to={"/Delegado/" + cedula} className="user_data_large">{nombre}</Link>
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
          <div className="user_upload_invisible"/>
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
      <div className="user_edit_odd">
        {
          (isEditing) ? 
          <button className="user_edit_button" onClick={() => handleDelete()}>
            <img src={trash}/>
          </button>
          :
          null
        }
      </div>
      

     
    </div>
  );
}
const UserDataEven: React.FC<UserDataProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [id] = useState(props.id)
  const [representacion] = useState(props.representacion);
  const [nombre, setNombre] = useState(props.nombre);
  const [cargo] = useState(props.cargo);
  const [cedula, setCedula] = useState(props.cedula);
  const [edad, setEdad] = useState(props.edad);
  const [correo, setCorreo] = useState(props.correo);
  const [telefono, setTelefono] = useState(props.telefono);
  const [delegacion, setDelegacion] = useState(props.delegacion);
  const [alergias, setAlergias] = useState(props.alergias);
  const [numeroRep, setNumeroRep] = useState(props.numero_rep);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userImg, setUserImg] = useState<File>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUserImg(file);
    
    }
  };

  async function uploadFile() {
    if(userImg){
      const { error } = await supabase
        .storage
        .from('users_image')
        .upload(`${cedula}`,  userImg,{
        upsert: true,
        
      })
      if (error) {
        console.error("Error updating user image:", error);
      } 
    }
  }

  async function handleSave() {
   
    setIsEditing(!isEditing)
    
    if (userImg) {
      uploadFile();
    }


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

  async function handleDelete(){
   
    setIsEditing(!isEditing)

  
    const { data, error } = await supabase
      .from("ucatmun_delegados")
      .update({ 
        nombre: null,
        cedula: null,
        edad: null,
        correo: null,
        telefono: null,
        delegacion: null,
        alergias: null,
        numero_rep: null,})
      .eq("id", id); 

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      console.log("Profile updated successfully:", data);
      setNombre("")
      setCedula("")
      setEdad(0)
      setCorreo("")
      setDelegacion("")
      setNumeroRep("")
      setTelefono("")
      setAlergias("")

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
          <div className="database_separator_even"/>
          <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
          <div className="user_upload_invisible">
            <img src={Upload} onClick={() => fileInputRef.current?.click()}/>
            <p>{userImg?.name}</p>
          </div>
         
        </>
      ) : (
        <>
          <Link to={"/Delegado/" + cedula} className="user_data_large">{nombre}</Link>
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
          <div className="user_upload_invisible"/>
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
      <div className="user_edit_even">
        {
          (isEditing) ? 
          <button className="user_edit_button" onClick={() => handleDelete()}>
            <img src={trash}/>
          </button>
          :
          null
        }
      </div>
    </div>
  );
}