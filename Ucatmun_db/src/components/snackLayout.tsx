import "../styles/snacks.css";
import flag from "../assets/Flag_of_Denmark.svg.png"
import { UserSnackContainer, UserTextContainer } from "./userAtoms";

export const SnackLayout = () => {
  return (
    <div className="snacks_container">
      <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
      <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
      <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
      <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
      <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
      <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
         <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
      <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
      <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
      <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
      <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
      <UserSnack
        flag={flag}
        content={"John Doe"}
        snacks={[true, false, false]}/>
    </div>
  );
}

interface UserSnackProps {
  flag: string;
  content: string;
  snacks: boolean[];
}

const UserSnack = ({flag, content, snacks}: UserSnackProps) =>{
  return(
    <div className="snacks_user_container">
      <img className="snacks_flag" src={flag} alt="flag" />
      <UserTextContainer 
        title="Nombre"
        content={content}
      />
      <UserSnackContainer
        snacks={snacks}/>
    </div>
  )
}