import styles from './CustomerTable.module.css';

export const CustomerTable = ({ data }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Customer name</th>
            <th className={styles.headerCell}>Email</th>
            <th className={styles.headerCell}>Teléfono</th>
            <th className={styles.headerCell}>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((d, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>{d.customerName}</td>
                <td className={styles.tableCell}>{d.customerEmail}</td>
                <td className={styles.tableCell}>{d.customerPhone}</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.badge} ${styles[d.customerType.toLowerCase()]}`}>
                    {d.customerType}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.emptyMessage}>
                Agrega un customer para verlo
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