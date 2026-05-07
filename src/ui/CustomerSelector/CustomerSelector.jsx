import styles from "./CustomerSelector.module.css";
import TagIcon from "../../assets/tagCustomerIcon.svg?react";

export const CustomerSelector = ({
  value,
  onChange,
  customStyle = {}
}) =>{
  return(
    <div className={styles.inputWrapper}
      style={customStyle}
    >
      <TagIcon className={styles.inputIcon} />
      <select 
        name="customerType"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>Seleccione un tipo</option>
        <option value="1">Inquilino</option>
        <option value="2">Comprador</option>
        <option value="3">Potencial inquilino</option>
        <option value="4">Potencial comprador</option>
        <option value="5">Customer</option>
      </select> 
    </div>
  );

}