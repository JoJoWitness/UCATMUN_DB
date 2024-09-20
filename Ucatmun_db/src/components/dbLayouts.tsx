import { useState } from "react"
import "../styles/database.css" 
import check from "../assets/save.svg"
import edit from "../assets/edit.svg"

export const DatabaseLayouts = () => {

  const userData = 
    {
      country: "Dinamarca",
      name: "John Doe",
      charge: "Delegado",
      id: "123456789",
      age: 20,
      email: "johnDoe@gmail.com",
      phone: "0414-1234567",
      delegation: "MUNET",
      alergies: "Ninguna",
      phone_rep: ""
    }

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
      <UserDataOdd {...userData}/>
      <UserDataEven {...userData}/>
      <UserDataOdd {...userData}/>
      <UserDataEven {...userData}/>
    
    </div>
  )
}

interface UserDataProps {
  country: string;
  name: string;
  charge: string;
  id: string;
  age: number;
  email: string;
  phone: string;
  delegation: string;
  alergies: string;
  phone_rep: string;
}

const UserDataOdd: React.FC<UserDataProps> = ({country, name, charge, id, age, email, phone, delegation, alergies, phone_rep}) => {
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <div className="user_data_odd">
      <p  className="user_data_large">{country}</p>
      <div className="database_separator"/>
      <p  className="user_data_xlarge">{charge}</p>
      <div className="database_separator"/>
      <p  className="user_data_large">{name}</p>
      <div className="database_separator"/>
      <p className="user_data_mid">{id}</p>
      <div className="database_separator"/>
      <p className="user_data_small">{age}</p>
      <div className="database_separator"/>
      <p  className="user_data_large">{email}</p>
      <div className="database_separator"/>
      <p className="user_data_mid">{phone}</p>
      <div className="database_separator"/>
      <p className="user_data_small">{delegation}</p>
      <div className="database_separator"/>
      <p className="user_data_xlarge">{alergies}</p>
      <div className="database_separator"/>
      <p className="user_data_mid">{phone_rep}</p>
      <div className="user_edit_odd">
        <button className="user_edit_button" onClick={() => setIsEditing(!isEditing)}>
          {(isEditing) ? <img src={check}/> : <img src={edit}/>}
        </button>
      </div>
     
    </div>
  );
}
const UserDataEven: React.FC<UserDataProps> = ({country, name, charge, id, age, email, phone, delegation, alergies, phone_rep}) => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className="user_data_even">
      <p  className="user_data_large">{country}</p>
      <div className="database_separator_even"/>
      <p  className="user_data_xlarge">{charge}</p>
      <div className="database_separator_even"/>
      <p  className="user_data_large">{name}</p>
      <div className="database_separator_even"/>
      <p className="user_data_mid">{id}</p>
      <div className="database_separator_even"/>
      <p className="user_data_small">{age}</p>
      <div className="database_separator_even"/>
      <p className="user_data_large">{email}</p>
      <div className="database_separator_even"/>
      <p className="user_data_mid">{phone}</p>
      <div className="database_separator_even"/>
      <p className="user_data_small">{delegation}</p>
      <div className="database_separator_even"/>
      <p className="user_data_xlarge">{alergies}</p>
      <div className="database_separator_even"/>
      <p className="user_data_mid">{phone_rep}</p>
      <div className="user_edit_even">
        <button className="user_edit_button" onClick={() => setIsEditing(!isEditing)}>
          {(isEditing) ? <img src={check}/> : <img src={edit}/>}
        </button>
      </div>
    </div>
  );
}