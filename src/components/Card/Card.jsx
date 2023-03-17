import styles from '../CardsStyles.module.css';
import { Link } from "react-router-dom";

function Card({ id, name, species, gender, image, onClose }) {
  
   return (
      <div className={styles.Card}>
         <button onClick={() => onClose(id)} className={styles.boton}>
            X
         </button>
         <img  src={image} alt=""/>
         <Link to={`/detail/${id}`}>
         <h2>Name:{name}</h2>
         </Link>
         
         <h2>Species:{species}</h2>
         <h2>Gender:{gender}</h2>
      </div>
   );
}

export default Card;