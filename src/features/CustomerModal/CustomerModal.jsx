import { useState } from "react";
import styles from "./CustomerModal.module.css";
import { createCustomer, updateCustomer } from "../../actions/customer.action";
import AddCustomer from "../../assets/addCustomer.svg?react";
import CustomerIcon from "../../assets/customerIcons.svg?react";
import PhoneIcon from "../../assets/phoneCustomer.svg?react";
import EmailIcon from "../../assets/emailIcon.svg?react";
import TagIcon from "../../assets/tagCustomerIcon.svg?react";
import { CustomerSelector } from "../../ui/CustomerSelector/CustomerSelector";
import { SelectorPaymentStatus } from "../../ui/StatusPayment/StatusPayment.jsx";

export const CustomerModal = ({ onClose, initialData }) => {
  const [customerData, setCustomerData] = useState({
    customerName: initialData?.customerName || "",
    email: initialData?.customerEmail || initialData?.email || "",
    phone: initialData?.customerPhone || initialData?.phone || "",
    customerType: initialData?.customerType || "",
    customerStatusPayment: initialData?.customerStatusPayment || initialData?.statusPayment || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
  const saveCustomer = async (e) => {
    e.preventDefault();
    const sanatizedForm = {
      ...customerData,
      phone: Number(customerData.phone),
      customerType: Number(customerData.customerType),
      customerStatusPayment: Number(customerData.customerStatusPayment)
    }


    try {
      let response;
      if (initialData?.customerId) {
        response = await updateCustomer({ id: initialData.customerId, ...sanatizedForm });
      } else {
        response = await createCustomer(sanatizedForm);
      }

      if (response.success) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.containerModal}>
        <div className={styles.headerModal}>
          <div className={styles.titlesModal}>
            <h2>{initialData ? "Editar Cliente" : "Registrar Cliente"}</h2>
            <h3>{initialData ? "Actualiza la información del cliente" : "Registro de gestión central"}</h3>
          </div>
          <button
            className={styles.calcelX}
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className={styles.formSeparator} />
        <div className={styles.bodyModal}>
          <div className={styles.titleInput}>
            Nombre del cliente
            <div className={styles.inputWrapper}>
              <CustomerIcon className={styles.inputIcon} />
              <input
                placeholder="Nombre del cliente"
                name="customerName"
                value={customerData.customerName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.inputDataCustomer}>
            <div className={styles.titleInput}>
              Número de telefono
              <div className={styles.inputWrapper}>
                <PhoneIcon className={styles.inputIcon} />
                <input
                  placeholder="542302421241"
                  name="phone"
                  value={customerData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.titleInput}>
              Email
              <div className={styles.inputWrapper}>
                <EmailIcon className={styles.inputIcon} />
                <input
                  placeholder="ejemplo@gmail.com"
                  name="email"
                  value={customerData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.titleInput}>
            Tipo
            <CustomerSelector
              onChange={handleChange}
              value={customerData.customerType}
            />
          </div>
          <div className={styles.titleInput}>
            Estado de pago
            <SelectorPaymentStatus
              onChange={handleChange}
              value={customerData.customerStatusPayment}
            />
          </div>
        </div>
        <div className={styles.footerForm}>
          <button
            className={styles.cancel}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            onClick={saveCustomer}
            className={styles.addCustomer}
          >
            {initialData ? "Actualizar cliente" : "Guardar cliente"}
            <AddCustomer />
          </button>
        </div>
      </div>
    </div>
  );
}