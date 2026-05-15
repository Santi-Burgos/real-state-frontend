import styles from "./TicketsSelector.module.css";
import SliderDJIcon from "../../assets/sliderDJIcon.svg?react";

export const TicketStatusSelector = ({ value, onChange, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      <SliderDJIcon className={styles.inputIcon} />
      <select value={value} onChange={onChange} {...props}>
        <option value="">Todos los Estados</option>
        <option value="1">Pendiente</option>
        <option value="2">En Progreso</option>
        <option value="3">Resuelto</option>
        <option value="4">Rechazado</option>
      </select>
    </div>
  );
};

export const TicketTypeSelector = ({ value, onChange, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      <SliderDJIcon className={styles.inputIcon} />
      <select value={value} onChange={onChange} {...props}>
        <option value="">Todos los Tipos</option>
        <option value="1">Mantenimiento</option>
        <option value="2">Soporte</option>
        <option value="3">Reclamo</option>
      </select>
    </div>
  );
};
