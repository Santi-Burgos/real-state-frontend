import styles from "./TicketsTable.module.css";
import TrashIcon from "../../assets/trashIcon.svg?react";
import EyesIcon from "../../assets/lockPasswordIcon.svg?react";

export const TicketsTable = ({ data = [] }) => {
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
      OPEN: "Abierto",
      IN_PROGRESS: "En Progreso",
      CLOSED: "Cerrado",
    };
    return labels[status] || status;
  };

  const getTypeLabel = (type) => {
    const labels = {
      MAINTENANCE: "Mantenimiento",
      SUPPORT: "Soporte",
      COMPLAINT: "Reclamo",
    };
    return labels[type] || type;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>ID</th>
            <th className={styles.headerCell}>Fecha</th>
            <th className={styles.headerCell}>Título</th>
            <th className={styles.headerCell}>Tipo</th>
            <th className={styles.headerCell}>Estado</th>
            <th className={styles.headerCell}>Descripción</th>
            <th className={styles.headerCell}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((ticket, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>#{ticket.ticketDisplayId}</td>
                <td className={styles.tableCell}>{formatDate(ticket.createdAt)}</td>
                <td className={styles.tableCell}>{ticket.title}</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.badge} ${styles[ticket.ticketTypeId?.toLowerCase()]}`}>
                    {getTypeLabel(ticket.ticketTypeId)}
                  </span>
                </td>
                <td className={styles.tableCell}>
                  <span className={`${styles.badgeStatus} ${styles[ticket.ticketStatusId?.toLowerCase()]}`}>
                    {getStatusLabel(ticket.ticketStatusId)}
                  </span>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.descriptionText}>{ticket.description}</div>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.cellActions}>
                    <div className={`${styles.actionsContainer} ${styles.view}`} title="Ver detalles">
                      <EyesIcon />
                    </div>
                    <div className={`${styles.actionsContainer} ${styles.delete}`} title="Eliminar">
                      <TrashIcon />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className={styles.emptyMessage}>
                No se encontraron tickets.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.tableFooter}>
        <div className={styles.counter}>
          Mostrando 1 - {data?.length || 0} de {data?.length || 0} resultados
        </div>
        <div className={styles.pagination}>
          <button className={styles.pageBtn} disabled>&lt;</button>
          <div className={styles.pageNumbers}>
            <span className={`${styles.pageNumber} ${styles.active}`}>1</span>
          </div>
          <button className={styles.pageBtn} disabled>&gt;</button>
        </div>
      </div>
    </div>
  );
};