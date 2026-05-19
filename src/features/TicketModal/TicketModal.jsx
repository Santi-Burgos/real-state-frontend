import React from "react";
import styles from "./TicketModal.module.css";
import tableStyles from "../../ui/TicketsTable/TicketsTable.module.css";
import TicketIcon from "../../assets/ticketIcon.svg?react";

export const TicketModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusLabel = (status) => {
    const labels = {
      1: "Pendiente",
      2: "En Progreso",
      3: "Resuelto",
      4: "Rechazado",
      OPEN: "Abierto",
      PENDING: "Pendiente",
      IN_PROGRESS: "En Progreso",
      RESOLVED: "Resuelto",
      REJECTED: "Rechazado",
      CLOSED: "Rechazado",
      REJECT: "Rechazado",
    };
    return labels[status] || status;
  };

  const getTypeLabel = (type) => {
    const labels = {
      1: "Mantenimiento",
      2: "Soporte",
      3: "Reclamo",
      MAINTENANCE: "Mantenimiento",
      SUPPORT: "Soporte",
      COMPLAINT: "Reclamo",
    };
    return labels[type] || type;
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.containerModal}>
        <div className={styles.headerModal}>
          <div className={styles.titlesModal}>
            <h2>Ticket #{ticket.ticketDisplayId}</h2>
            <h3>Detalles completos del ticket</h3>
          </div>
          <button className={styles.calcelX} onClick={onClose}>
            X
          </button>
        </div>
        <div className={styles.formSeparator} />
        
        <div className={styles.bodyModal}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Título</span>
            <div className={styles.detailValueBox}>{ticket.title || "N/A"}</div>
          </div>
          
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Descripción</span>
            <div className={styles.detailValueBox}>
              {ticket.description || "Sin descripción"}
            </div>
          </div>

          <div className={styles.rowHorizontal}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Estado</span>
              <div>
                <span className={`${tableStyles.badgeStatus} ${tableStyles[`status_${ticket.ticketStatusId}`] || tableStyles[ticket.ticketStatusId?.toLowerCase()]}`}>
                  {getStatusLabel(ticket.ticketStatusId)}
                </span>
              </div>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Tipo</span>
              <div>
                <span className={`${tableStyles.badge} ${tableStyles[`type_${ticket.ticketTypeId}`] || tableStyles[ticket.ticketTypeId?.toLowerCase()]}`}>
                  {getTypeLabel(ticket.ticketTypeId)}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.rowHorizontal}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Fecha de creación</span>
              <div className={styles.plainValue}>
                {formatDate(ticket.createdAt)}
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.footerForm}>
          <button className={styles.closeBtn} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
