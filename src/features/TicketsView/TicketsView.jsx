import { getAllTickets, deleteTicket } from "../../actions/tickets.action";
import { TicketsTable } from "../../ui/TicketsTable/TicketsTable";
import { useState, useEffect, useMemo } from "react";
import styles from "./TicketsView.module.css";
import SearchIcon from "../../assets/searchIcon.svg?react";
import { ViewHeader } from "../../ui/ViewHeader/ViewHeader";
import { StatsCard } from "../../ui/StatsCard/StatsCard";
import { TicketStatusSelector, TicketTypeSelector } from "../../ui/TicketsSelector/TicketsSelector";
import { useToast } from "../../context/ToastContext";
import TicketCheck from "../../assets/ticketCheck.svg?react";
import TicketInProgress from "../../assets/ticketInProgress.svg?react";
import TicketPending from "../../assets/ticketPending.svg?react";
import TicketIcon from "../../assets/ticketIcon.svg?react";
import { TicketModal } from "../TicketModal/TicketModal";

export const TicketsView = () => {
  const [dataTicket, setDataTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [countsTickets, setCountsTickets] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllTickets({
          typeValue: typeFilter === "" ? null : typeFilter,
          selector: statusFilter === "" ? null : statusFilter,
        });
        setDataTicket(data?.tickets || data || []);
        setCountsTickets(data?.counts);
      } catch (error) {
        console.error("Error al traer los tickets: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [statusFilter, typeFilter]);

  const filteredTickets = useMemo(() => {
    if (!dataTicket) return [];
    return dataTicket.filter((ticket) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesId = ticket.ticketDisplayId?.toString().includes(searchLower);
      const matchesTitle = ticket.title?.toLowerCase().includes(searchLower);
      const matchesDescription = ticket.description?.toLowerCase().includes(searchLower);

      return matchesId || matchesTitle || matchesDescription;
    });
  }, [dataTicket, searchTerm]);

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(ticketId);
      const updatedTickets = dataTicket.filter(t => (t.ticketId || t.id) !== ticketId);
      setDataTicket(updatedTickets);
      showToast("Ticket eliminado", "El ticket fue eliminado con éxito.", "success");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      showToast("Action Failed", "Unable to delete ticket. Please check your permissions or try again later.");
    }
  };

  return (
    <div className={styles.ticketsViewContainer}>
      <ViewHeader
        breadcrumb="admin > tickets"
        title="Tickets"
        description="Gestiona las solicitudes y problemas de tus clientes"
      />
      <section className={styles.containerStats}>
        <StatsCard
          nameCard={"Ticket Totales"}
          numberCard={countsTickets?.ticketsQuantity}
          iconCard={TicketIcon}
        />
        <StatsCard
          nameCard={"Ticket Pendiente Totales"}
          numberCard={countsTickets?.ticketsPending}
          iconCard={TicketPending}
        />
        <StatsCard
          nameCard={"Ticket en progreso Totales"}
          numberCard={countsTickets?.ticketsInProgress}
          iconCard={TicketInProgress}
        />
        <StatsCard
          nameCard={"Ticket resuelto Totales"}
          numberCard={countsTickets?.ticketsResolve}
          iconCard={TicketCheck}
        />
      </section>
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

        <TicketStatusSelector
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />

        <TicketTypeSelector
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        />
      </section>

      <main className={styles.content}>
        {loading ? (
          <div className={styles.loading}>Cargando tickets...</div>
        ) : (
          <TicketsTable 
            data={filteredTickets} 
            onDelete={handleDeleteTicket} 
            onView={(ticket) => setSelectedTicket(ticket)} 
          />
        )}
      </main>

      {selectedTicket && (
        <TicketModal 
          ticket={selectedTicket} 
          onClose={() => setSelectedTicket(null)} 
        />
      )}
    </div>
  );
};