import styles from "./StatsCard.module.css"

export const StatsCard = ({nameCard, numberCard}) =>{
  return(
    <div>
      <div>
        <p>{nameCard ? nameCard : "Name Card"}</p>
        <p>{numberCard ? numberCard : "#"}</p>
      </div>
    </div>
  );
}