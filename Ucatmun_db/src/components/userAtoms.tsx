import food_dim from '../assets/lunch_dim.svg'
import food_lit from '../assets/lunch_lit.svg'


type UserTextContainerProps = {
  title: string;
  content: string;

};

type UserSnackContainerProps ={
  snacks: number
}

export const UserTextContainer: React.FC<UserTextContainerProps> = ({ title, content }) => {

  return(
    <div className="user_text_container">
      <h3>{title}</h3>
      <div className="user_text_bubble">
        <p>{content}</p>  
      </div>
    </div>
  )
}


export const UserSnackContainer:  React.FC<UserSnackContainerProps> = ({snacks }) =>{
  
  const staticSnacks = Array(6).fill(false);
 
  for (let i = 0; i < snacks && i < 6; i++) {
    staticSnacks[i] = true;
  }

  return(
    <div className="user_snack_container">
      <h3>Refrigerios</h3>
      <div className="user_snack_img">
        {staticSnacks.map((snack, index) => (
            snack ? <img key={index} src={food_lit}/> : <img key={index} src={food_dim}/>
          ))}
      </div>
    </div>
  )
}



