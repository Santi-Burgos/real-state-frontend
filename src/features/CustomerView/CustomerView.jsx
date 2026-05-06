import { useEffect, useState } from "react";
import styles from "./CustomerView.module.css";
import { StatsCard } from "../../ui/StatsCard/StatsCard";
import IconCustomer from "../../assets/customers.svg?react";
import { CustomerTable } from "../../ui/CustomerTable/CustomerTable";
import { getAllCustomer } from "../../actions/customer.action";
import { CustomerModal } from "../CustomerModal/CustomerModal";
import AddButtonIcon from "../../assets/addButtonIcon.svg?react";
import SearchIcon from "../../assets/searchIcon.svg?react";

export const CustomerView = () =>{
  const [showForm, setShowForm] = useState(false);
  const [dataCustomer, setDataCustomer] = useState([]);

  const toggleModalCustomer = (e) => {
    setShowForm(!showForm);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCustomer();
        setDataCustomer(data);
      } catch (error) {
        console.error("Error al traer los clientes:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className={styles.containerHeader}>
        <p>Admin / <span>Customer</span></p>
        <button
          className={styles.addCustomer}
          onClick={toggleModalCustomer}
        >
          Agregar Customer
          <AddButtonIcon />
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
      <section>
        <div className={styles.containerFilters}>
          <div className={styles.searchBar}>
            <SearchIcon className={styles.inputIcon} />
            <input
              placeholder="Buscar cliente..."
            />
          </div>
          <select>
            <option disabled>Seleccionar filtro</option>
            <option>Nombre</option>
            <option>Fecha de creacion</option>
            <option>Tipo de cliente</option>
            <option>Estado de pago</option>
          </select>
          {/* 
            aca va la logica de filtrado, por ejemplo
            si es fecha de creacion -> mas antiguo / mas reciente
            si es nombre -> alfabetizacion
            si es tipo de cliente -> filtrado de de seleccion
            si es estado de pago -> estado
          */}
        </div>
        <div>
          <CustomerTable
            data={dataCustomer}
          />
          {showForm &&
            <CustomerModal
              onClose={toggleModalCustomer}
            />
          }
        </div>
      </section>
    </>
  );
}