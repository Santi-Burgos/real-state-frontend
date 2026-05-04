import { useEffect, useState } from "react";
import styles from "./CustomerView.module.css";
import { StatsCard } from "../../ui/StatsCard/StatsCard";
import IconCustomer from "../../assets/customers.svg?react"
import { CustomerTable } from "../../ui/CustomerTable/CustomerTable";
import { getAllCustomer } from "../../actions/customer.action";

export const CustomerView = () =>{
  const [dataCustomer, setDataCustomer] = useState([]);
  console.log(dataCustomer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCustomer();
        console.log('data', data);
        setDataCustomer(data);
      } catch (error) {
        console.error("Error al traer los clientes:", error);
      }
    };
    fetchData();
  }, []);

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
        <CustomerTable
          data={dataCustomer}
        />
      </div>
    </>
  );
}