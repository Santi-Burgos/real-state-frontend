import styles from './PaymentsContainer.module.css';
import paymentsData from '../../data/payments.json';

export const PaymentsContainer = ({ data = paymentsData }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Payment History</h2>
        <button className={styles.exportBtn}>Export PDF</button>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.paymentTable}>
          <thead>
            <tr>
              <th>DATE</th>
              <th>DESCRIPTION</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.date}</td>
                <td className={styles.description}>{payment.description}</td>
                <td>{payment.amount}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[payment.status.toLowerCase()]}`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
