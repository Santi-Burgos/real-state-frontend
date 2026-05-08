import styles from './CustomerTable.module.css';
import TrashIcon from "../../assets/trashIcon.svg?react";
import EyesIcon from "../../assets/lockPasswordIcon.svg?react";

export const CustomerTable = ({ data, actionDelete, actionView }) => {
  const handleTableClick = (e) => {
    const actionBtn = e.target.closest('[data-action]');
    const cellWithId = e.target.closest('[data-customer-id]');

    if (!actionBtn || !cellWithId) return;

    const { action } = actionBtn.dataset;
    const { customerId } = cellWithId.dataset;

    if (action === 'delete') actionDelete(customerId);
    if (action === 'view') actionView(customerId);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Customer name</th>
            <th className={styles.headerCell}>Email</th>
            <th className={styles.headerCell}>Teléfono</th>
            <th className={styles.headerCell}>Tipo</th>
            <th className={styles.headerCell}>Pagos</th>
            <th className={styles.headerCell}>Acciones</th>
          </tr>
        </thead>
        <tbody onClick={handleTableClick}>
          {data && data.length > 0 ? (
            data.map((d, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>{d.customerName}</td>
                <td className={styles.tableCell}>{d.customerEmail}</td>
                <td className={styles.tableCell}>{d.customerPhone}</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.badge} ${styles[d.customerType.toLowerCase()]}`}>
                    {d.customerType.toLowerCase()}
                  </span>
                </td>
                <td className={styles.tableCell}>
                  <span className={`${styles.badgePayment} ${styles[d.customerStatusPayment.toLowerCase()]}`}>
                    {d.customerStatusPayment.toLowerCase() != "null"
                      ? d.customerStatusPayment.toLowerCase() : "-"}
                  </span>
                </td>
                <td className={styles.tableCell} data-customer-id={d.customerId}>
                  <div className={styles.cellActions}>
                    <div className={`${styles.actionsContainer} ${styles.view}`}
                      data-action="view"
                    >
                      <EyesIcon />
                    </div>
                    <div className={`${styles.actionsContainer} ${styles.delete}`}
                      data-action="delete"
                    >
                      <TrashIcon />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.emptyMessage}>
                Agrega un cliente para verlo
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
            <span className={styles.pageNumber}>2</span>
            <span className={styles.pageNumber}>3</span>
          </div>
          <button className={styles.pageBtn} disabled>&gt;</button>
        </div>
      </div>
    </div>
  );
};