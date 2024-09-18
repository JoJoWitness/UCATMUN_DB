import "../styles/database.css" 

export const DatabaseLayouts = () => {

  const userData = 
    {
      country: "Dinamarca",
      name: "John Doe",
      id: "123456789",
      age: 20,
      email: "johnDoe@gmail.com",
      phone: "0414-1234567",
      delegation: "MUNET",
      alergies: "Ninguna",
      rep: "",
      phone_rep: ""
    }

    const userDataMinor = 
    {
      country: "Dinamarca",
      name: "John Doe",
      id: "123456789",
      age: 20,
      email: "johnDoe@gmail.com",
      phone: "0414-1234567",
      delegation: "MUNET",
      alergies: "Ninguna",
      rep: "Jane Doe",
      phone_rep: "0424-1234567"
    }

  return (
    <div className="database_container">
      <div className="database_header">
        <p >Representación</p>
        <div className="database_separator"/>
        <p>Nombre</p>
        <div className="database_separator"/>
        <p>Cedula</p>
        <div className="database_separator"/>
        <p>Edad</p>
        <div className="database_separator"/>
        <p >Correo</p>
        <div className="database_separator"/>
        <p >Telefono</p>
        <div className="database_separator"/>
        <p>Delegación</p>
        <div className="database_separator"/>
        <p >Alergia</p>
        <div className="database_separator"/>
        <p>Representante</p>
        <div className="database_separator"/>
        <p>Numero Rep</p>
     
      </div>
      <UserDataOdd {...userData}/>
      <UserDataEven {...userData}/>
      <UserDataOdd {...userData}/>
      <UserDataEven {...userDataMinor}/>
      <UserDataOdd {...userData}/>
      <UserDataEven {...userData}/>
      <UserDataOdd {...userDataMinor}/>
      <UserDataEven {...userData}/>
      <UserDataOdd {...userData}/>
      <UserDataEven {...userDataMinor}/>
      <UserDataOdd {...userData}/>
      <UserDataEven {...userData}/>
      <UserDataOdd {...userData}/>
      <UserDataEven {...userData}/>
      <UserDataOdd {...userDataMinor}/>
      <UserDataEven {...userData}/>
      <UserDataOdd {...userData}/>
      <UserDataEven {...userDataMinor}/>
      <UserDataOdd {...userData}/>
      <UserDataEven {...userData}/>
    </div>
  )
}

interface UserDataProps {
  country: string;
  name: string;
  id: string;
  age: number;
  email: string;
  phone: string;
  delegation: string;
  alergies: string;
  rep: string;
  phone_rep: string;
}

const UserDataOdd: React.FC<UserDataProps> = ({country, name, id, age, email, phone, delegation, alergies, rep, phone_rep}) => {
  return (
    <div className="user_data_odd">
      <p>{country}</p>
      <div className="database_separator"/>
      <p>{name}</p>
      <div className="database_separator"/>
      <p>{id}</p>
      <div className="database_separator"/>
      <p>{age}</p>
      <div className="database_separator"/>
      <p>{email}</p>
      <div className="database_separator"/>
      <p>{phone}</p>
      <div className="database_separator"/>
      <p>{delegation}</p>
      <div className="database_separator"/>
      <p>{alergies}</p>
      <div className="database_separator"/>
      <p>{rep}</p>
      <div className="database_separator"/>
      <p>{phone_rep}</p>
    </div>
  );
}
const UserDataEven: React.FC<UserDataProps> = ({country, name, id, age, email, phone, delegation, alergies, rep, phone_rep}) => {
  return (
    <div className="user_data_even">
      <p>{country}</p>
      <div className="database_separator_even"/>
      <p>{name}</p>
      <div className="database_separator_even"/>
      <p>{id}</p>
      <div className="database_separator_even"/>
      <p>{age}</p>
      <div className="database_separator_even"/>
      <p>{email}</p>
      <div className="database_separator_even"/>
      <p>{phone}</p>
      <div className="database_separator_even"/>
      <p>{delegation}</p>
      <div className="database_separator_even"/>
      <p>{alergies}</p>
      <div className="database_separator_even"/>
      <p>{rep}</p>
      <div className="database_separator_even"/>
      <p>{phone_rep}</p>
    </div>
  );
}