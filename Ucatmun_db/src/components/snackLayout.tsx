import "../styles/snacks.css";
import flag from "../assets/Flag_of_Denmark.svg.png"
import { UserSnackContainer, UserTextContainer } from "./userAtoms";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useLocation } from "react-router-dom";

export const SnackLayout = () => {

  const [allDelegados, setAllDelegado] = useState<any[]>([]);
  const location = useLocation();
  const [dataFetched, setDataFetched] = useState(false);
  const lastPathSegment = location.pathname.split('/').filter(Boolean).pop();



    const fetchAllDelegados = async () =>{
      const { data: delegados, error } = await supabase
      .from("ucatmun_delegados")
      .select()
      .eq("comite",lastPathSegment)
      .not("nombre", "is", null)
      .neq("nombre", "")
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


  return (
    <div className="snacks_container">
      {allDelegados.map((delegado, index) => (
         <UserSnack
         flag={flag}
         key={index} {...delegado}/>
      ))}
    
       
    </div>
  );
}

interface UserSnackProps {
  flag: string;
  id: number;
  content: string;
  snacks: number;
}

const UserSnack = ({flag, id, nombre, refrigerios}: UserSnackProps) =>{
  const [snackCount, setSnackCount] = useState(refrigerios);
  const [idS, setIdS] = useState(id)
  
  function incrementSnackCount(){
    setSnackCount((prevCount: number) => Math.min(prevCount + 1, 6));
    
  };


  function decrementSnackCount(){
    setSnackCount((prevCount: number) => Math.max(prevCount - 1, 0));
 
  };
  async function handleSave(){
  const { data, error } = await supabase
      .from("ucatmun_delegados")
      .update({ 
        refrigerios: snackCount})
      .eq("id", idS); 

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      console.log("Profile updated successfully:", data);

    }
  }
  
  useEffect(() => {
    handleSave();
  }, [snackCount]);

  return(
    <div className="snacks_user_container">
      <img className="snacks_flag" src={flag} alt="flag" />
      <UserTextContainer 
        title="Nombre"
        content={nombre}
      />
      <UserSnackContainer
        snacks={snackCount}/>

      <div className="snack_counter_controls">
        <button onClick={() => decrementSnackCount()}>-</button>
        <button onClick={() => incrementSnackCount()}>+</button>
      </div>
    </div>
  )
}