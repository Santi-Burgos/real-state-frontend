import styles from './TicketsContainer.module.css';

export const TicketsContainer = ({ data = [] }) => {
  console.log(data)
  return (
    <div className={styles.ContainerTickets}>
      <div className={styles.headerTickets}>
        <h3>Tickets & Support</h3>
      </div>
      <div className={styles.bodyTickets}>
        {data && data.length > 0 ? (
          data?.map((t) => (
            <div key={t.id} className={styles.ticketItem}>
              <div className={`${styles.presentationTickets}`}>
                <div className={` ${styles.statusBadge} ${styles[t.ticketStatusId.toLowerCase()]}`}>
                  {t.ticketStatusId}
                </div>
                <div> 
                  #{t.ticketDisplayId}
                </div>
              </div>

              <div className={styles.explicationTickets}>
                <h3> {t.title} </h3>
                <div className={styles.ticketDescription}>{t.description}</div>
              </div>
              <div className={`${styles.ticketType}`}>
                <div className={`${styles[t.ticketTypeId.toLowerCase()]}`}>
                  {t.ticketTypeId}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyMessage}>
            Sin tickets que revisar
          </div>
        )}
      </div>
      <div className={styles.footerTickets}>
        <span className={styles.createButton}>Create New Ticket</span>
      </div>
    </div>
  );
};