import styles from "./CustomerView.module.css";
import { StatsCard } from "../../ui/StatsCard/StatsCard";
import IconCustomer from "../../assets/customers.svg?react"
import { CustomerTable } from "../../ui/CustomerTable/CustomerTable";

export const CustomerView = () =>{
  return(
    <>
      <section className={styles.containerHeader}>
        <p>Admin / <span>Customer</span></p>
        <button className={styles.addCustomer}>
          Agregar Customer
        </button>
      </section>
      <div className={styles.statsSection}> 
        <div className={styles.cardContainer}>
          <StatsCard
            nameCard={"Total Customer"}
            numberCard={100}
            iconCard={IconCustomer}
          />
          <StatsCard
            nameCard={"Total Customer"}
            numberCard={100}
            iconCard={IconCustomer}
          />
          <StatsCard
            nameCard={"Total Customer"}
            numberCard={100}
            iconCard={IconCustomer}
          />
          <StatsCard
            nameCard={"Total Customer"}
            numberCard={100}
            iconCard={IconCustomer}
          />
        </div>
      </div>
      <div>
        <CustomerTable />
      </div>
    </>
  );
}