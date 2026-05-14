import styles from "./StatusPayment.module.css";
import TagMoney from "../../assets/tagMoneyIcon.svg?react";

export const SelectorPaymentStatus = ({
  onChange, 
  value, 
  customStyle = {},
  ...props
}) =>{
  return(
    <div className={styles.inputWrapper} style={customStyle}>
      <TagMoney  className={styles.inputIcon}/>
      <select
        className={styles.selectorFilter}
        name="customerStatusPayment"
        onChange={onChange}
        value={value}
        {...props}
      >
        <option value="" disabled>Estado de pago</option>
        <option value="1">Pendiente</option>
        <option value="2">Deudor</option>
        <option value="3">Abonado</option>
        <option value="4">No facturable</option>
      </select>
    </div>
  );
}