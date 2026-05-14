import { getAllTickets } from "../../actions/tickets.action";
import { TicketsTable } from "../../ui/TicketsTable/TicketsTable";
import { useState, useEffect, useMemo } from "react";
import styles from "./TicketsView.module.css";
import SearchIcon from "../../assets/searchIcon.svg?react";
import SliderDJIcon from "../../assets/sliderDJIcon.svg?react";
import AddButtonIcon from "../../assets/addButtonIcon.svg?react";
import { ViewHeader } from "../../ui/ViewHeader/ViewHeader";

export const TicketsView = () => {
  const [dataTicket, setDataTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllTickets();
        setDataTicket(data?.data || data || []);
      } catch (error) {
        console.error("Error al traer los tickets: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.ticketsViewContainer}>
      <ViewHeader
        breadcrumb="admin > tickets"
        title="Tickets"
        description="Gestiona las solicitudes y problemas de tus clientes"
      />

      <section className={styles.containerFilters}>
        <div className={styles.searchBar}>
          <SearchIcon className={styles.inputIcon} />
          <input
            type="text"
            placeholder="Buscar por ID o título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.selectorFilter}>
          <SliderDJIcon className={styles.selectorIcon} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Todos los Estados</option>
            <option value="OPEN">Abierto</option>
            <option value="IN_PROGRESS">En Progreso</option>
            <option value="CLOSED">Cerrado</option>
          </select>
        </div>

        <div className={styles.selectorFilter}>
          <SliderDJIcon className={styles.selectorIcon} />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">Todos los Tipos</option>
            <option value="MAINTENANCE">Mantenimiento</option>
            <option value="SUPPORT">Soporte</option>
            <option value="COMPLAINT">Reclamo</option>
          </select>
        </div>
      </section>

      <main className={styles.content}>
        {loading ? (
          <div className={styles.loading}>Cargando tickets...</div>
        ) : (
          <TicketsTable data={dataTicket}/>
        )}
      </main>
    </div>
  );
};