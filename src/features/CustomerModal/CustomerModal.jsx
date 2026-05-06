import { useState } from "react";
import styles from "./CustomerModal.module.css";
import { createCustomer } from "../../actions/customer.action";
import AddCustomer from "../../assets/addCustomer.svg?react";
import CustomerIcon from "../../assets/customerIcons.svg?react";
import PhoneIcon from "../../assets/phoneCustomer.svg?react";
import EmailIcon from "../../assets/emailIcon.svg?react";
import TagIcon from "../../assets/tagCustomerIcon.svg?react";

export const CustomerModal = ({onClose}) =>{
  const [customerData, setCustomerData] = useState({
    customerName: "",
    email: "",
    phone: "",
    customerType: "",
  });
  
  const handleChange = (e) =>{
    const { name, value} = e.target;
    
    setCustomerData((prevData) =>({
      ...prevData,
      [name]: value
    }));
  } 

  const saveCustomer = async(e) =>{
    e.preventDefault();
    const sanatizedForm = {
      ...customerData,
      phone: Number(customerData.phone),
      customerType: Number(customerData.customerType)
    }
    try{
      const response = await createCustomer(sanatizedForm);
      if(response.success){
        onClose();
      }
    }catch(error){
      console.log(error);
    }
  }

  return(
    <div className={styles.overlay}>
      <div className={styles.containerModal}>
        <div className={styles.headerModal}>
          <div className={styles.titlesModal}>
            <h2>Registrar Cliente</h2>
            <h3>Registro de gestión central</h3>
          </div>
          <button 
            className={styles.calcelX}
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className={styles.formSeparator}/>
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
                  placeholder="Email del cliente"
                  name="ejemplo@gmail.com"
                  value={customerData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.titleInput}>
            Tipo
            <div className={styles.inputWrapper}>
              <TagIcon className={styles.inputIcon} />
              <select 
                name="customerType"
                value={customerData.customerType}
                onChange={handleChange}
              >
                <option value="" disabled>Seleccione un tipo</option>
                <option value="1">Inquilino</option>
                <option value="2">Comprador</option>
                <option value="3">Potencial inquilino</option>
                <option value="4">Potencial comprador</option>
                <option value="5">Customer</option>
              </select> 
            </div>
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
            Guardar cliente
            <AddCustomer />
          </button>
        </div>
      </div>
    </div>
  );
}