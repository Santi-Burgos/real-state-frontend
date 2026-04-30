import styles from "./Presentation.module.css"

export const Presentation = ({username, rolname}) =>{
  return(
    <div className={styles.containerPresentation}>
      <p>
        {!username ? "Usuario" : username} 
      </p>
      <p>
        {!rolname ? "Rol" : rolname.toLowerCase()}
      </p>
    </div>
  );
}