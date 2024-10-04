import "../styles/snacks.css";
import flag from "../assets/Flag_of_Denmark.svg.png"
import { UserSnackContainer, UserTextContainer } from "./userAtoms";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useLocation } from "react-router-dom";
import { useViewport } from "../hooks/customHooks";

export const SnackLayout = () => {
  
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allDelegados, setAllDelegado] = useState<any[]>([]);
  const location = useLocation();
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
  id: number;
  nombre: string;
  representacion: string;
  refrigerios: number;
}

const UserSnack = ({ id, nombre, representacion, refrigerios}: UserSnackProps) =>{
  const [snackCount, setSnackCount] = useState(refrigerios);
  const [idS] = useState(id)
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [representacionS] = useState(representacion);

  const { width } = useViewport();
  const breakpoint = 620;



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
  
  async function fetchImage() {
    const { data } = await supabase
      .storage
      .from('flags')
      .getPublicUrl(`${representacion}.png`)  
    if (!data) {
      console.error("Error fetching image");
    } else {
      setImageUrl(data.publicUrl);;
    }
  }
 



  useEffect(() => {
    handleSave();
  }, [snackCount]);

 useEffect(() => {
  fetchImage();
  console.log(representacionS)
 }, [representacionS]); 


 if(width > breakpoint){
  return(
    <div className="snacks_user_container">
      <div className="snacks_flag_container">
        <img className="snacks_flag" src={imageUrl ?? ''} alt="flag" />
      </div>
     
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
else{
  return(
    <div className="snacks_user_container_mobile">
      <div className="snacks_flag_container_mobile">
        <img className="snacks_flag_mobile" src={imageUrl ?? ''} alt="flag" />
     
        <div className="snacks_p_mobile">
          <p className="m-0">
           {nombre}
          </p>
        </div>
      </div>
      <UserSnackContainer
        snacks={snackCount}/>

      <div className="snack_counter_controls">
        <button onClick={() => decrementSnackCount()}>-</button>
        <button onClick={() => incrementSnackCount()}>+</button>
      </div>
    </div>
  )
}
}