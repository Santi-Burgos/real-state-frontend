import { useState } from 'react';
import styles from './CustomerTable.module.css';
import TrashIcon from "../../assets/trashIcon.svg?react";
import EyesIcon from "../../assets/lockPasswordIcon.svg?react";
import { CustomerSelector } from "../../ui/CustomerSelector/CustomerSelector";
import { SelectorPaymentStatus } from "../../ui/StatusPayment/StatusPayment";

export const CustomerTable = ({ data, actionDelete, actionView, actionUpdate }) => {
  const [editing, setEditing] = useState({ id: null, field: null });

  const typeMapping = {
    "tenant": "1",
    "buyer": "2",
    "potencial inquilino": "3",
    "potencial comprador": "4",
    "customer": "5"
  };

  const statusMapping = {
    "pending": "1",
    "unpaid": "2",
    "paid": "3"
  };

  const handleTableClick = (e) => {
    const actionBtn = e.target.closest('[data-action]');
    const cellWithId = e.target.closest('[data-customer-id]');

    if (!actionBtn || !cellWithId) return;

    const { action } = actionBtn.dataset;
    const { customerId } = cellWithId.dataset;

    if (action === 'delete') actionDelete(customerId);
    if (action === 'view') actionView(customerId);
  };

  const handleUpdate = (id, field, value, customer) => {
    const getSanitizedValue = (fieldName, newValue) => {
      const originalValue = customer[fieldName];
      return newValue == originalValue ? null : newValue;
    };
    const newType = field === 'customerType' 
      ? Number(value) 
      : (typeMapping[customer.customerType.toLowerCase()] || customer.customerType);

    const newStatus = field === 'customerStatusPayment' 
      ? Number(value) 
      : (statusMapping[customer.customerStatusPayment.toLowerCase()] || customer.customerStatusPayment);

    const sanatizedForm = {
      customerName: getSanitizedValue('customerName', customer.customerName),
      email: getSanitizedValue('customerEmail', customer.customerEmail),
      phone: getSanitizedValue('customerPhone', Number(customer.customerPhone)),
      customerType: getSanitizedValue('customerType', Number(newType)),
      customerStatusPayment: getSanitizedValue('customerStatusPayment', Number(newStatus)),
    };

    actionUpdate(id, sanatizedForm);
    setEditing({ id: null, field: null });
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
                  {editing.id === d.customerId && editing.field === 'customerType' ? (
                    <CustomerSelector
                      value={typeMapping[d.customerType.toLowerCase()] || d.customerType}
                      onChange={(e) => handleUpdate(d.customerId, 'customerType', e.target.value, d)}
                      onBlur={() => setEditing({ id: null, field: null })}
                      autoFocus
                      customStyle={{ width: '100%' }}
                    />
                  ) : (
                    <span
                      className={`${styles.badge} ${styles[d.customerType.toLowerCase()] || ""} ${styles.editable}`}
                      onClick={() => setEditing({ id: d.customerId, field: 'customerType' })}
                    >
                      {d.customerType.toLowerCase()}
                    </span>
                  )}
                </td>
                <td className={styles.tableCell}>
                  {editing.id === d.customerId && editing.field === 'customerStatusPayment' ? (
                    <SelectorPaymentStatus
                      value={statusMapping[d.customerStatusPayment.toLowerCase()] || d.customerStatusPayment}
                      onChange={(e) => handleUpdate(d.customerId, 'customerStatusPayment', e.target.value, d)}
                      onBlur={() => setEditing({ id: null, field: null })}
                      autoFocus
                      customStyle={{ width: '100%' }}
                    />
                  ) : (
                    <span
                      className={`${styles.badgePayment} ${styles[d.customerStatusPayment.toLowerCase()] || ""} ${styles.editable}`}
                      onClick={() => setEditing({ id: d.customerId, field: 'customerStatusPayment' })}
                    >
                      {d.customerStatusPayment.toLowerCase() != "null"
                        ? d.customerStatusPayment.toLowerCase() : "-"}
                    </span>
                  )}
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
              <td colSpan="6" className={styles.emptyMessage}>
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