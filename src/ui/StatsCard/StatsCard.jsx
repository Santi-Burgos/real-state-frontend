import styles from "./StatsCard.module.css"

export const StatsCard = ({nameCard, numberCard, iconCard: IconCard}) =>{
  return(
    <div className={styles.statsCardContainer}>
      <div className={styles.statsBodyCard}>
        <span>{nameCard ? nameCard : "Name Card"}</span>
        <div className={styles.line}/>
        <div className={styles.bodyItemsContainer}>
          {IconCard && <IconCard />}
          <p>{numberCard ? numberCard : "#"}</p>
        </div>
      </div>
    </div>
  );
}