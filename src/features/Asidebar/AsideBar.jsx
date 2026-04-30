import styles from "./AsideBar.module.css"
import PropertiesIcon from "../../assets/asidebarIcons/propertiesIcon2.svg?react"
import CustomerIcon from "../../assets/asidebarIcons/customerIcons.svg?react"
import ServiceIcon from "../../assets/asidebarIcons/servicesIcon.svg?react"
import DashboardIcon from "../../assets/asidebarIcons/dashboardIcon.svg?react"
import TicketIcon from "../../assets/asidebarIcons/ticketIcon.svg?react"
import { useState } from "react";
import { Presentation } from "../../ui/Presentation/Presentation.jsx"
import LogoutIcon from "../../assets/asidebarIcons/logoutIcon.svg?react"

export const AsideBar = () => {
  const [selected, setSelected] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem("user"));


  const handleLogout = (e) =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  const handleSelected = (e) => {
    setSelected(e);
  }

  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className={styles.asideBarContainer}>
      <div className={styles.titleProject}>
        <h1>Real State</h1>
      </div>
      <div className={styles.delimitedLine}></div>
      <aside>
        <nav className={styles.containerNavegation}>
          <ul>
            <li className={selected === "dashboard" ? styles.selected : styles.navItem} onClick={() => handleSelected("dashboard")} >
              <div className={styles.navIcons}>
                <DashboardIcon />
              </div>
              <a href="#">Dashboard</a>
            </li>
            <li className={selected === "properties" ? styles.selected : styles.navItem} onClick={() => handleSelected("properties")} >
              <div className={styles.navIcons}>
                <PropertiesIcon />
              </div>
              <a href="#">Propiedades</a>
            </li>
            <li className={selected === "customers" ? styles.selected : styles.navItem} onClick={() => handleSelected("customers")} >
              <div className={styles.navIcons}>
                <CustomerIcon />
              </div>
              <a href="#">Customers</a>
            </li>
            <li className={selected === "tickets" ? styles.selected : styles.navItem} onClick={() => handleSelected("tickets")} >
              <div className={styles.navIcons}>
                <TicketIcon />
              </div>
              <a href="#">Tickets</a>
            </li>
            <li className={selected === "services" ? styles.selected : styles.navItem} onClick={() => handleSelected("services")} >
              <div className={styles.navIcons}>
                <ServiceIcon />
              </div>
              <a href="#">Services</a>
            </li>
          </ul>
        </nav>
      </aside>
      <div className={styles.delimitedLine}></div>
        <Presentation 
          username={dataUser?.username}
          rolname={dataUser?.rolName}
        />
      <div className={styles.delimitedLine}></div>
      <div className={styles.logoutSection}>
        <ul>
          <li className={styles.logoutItem} onClick={handleLogout}>
            <div className={styles.navIcons}>
              <LogoutIcon />
            </div>
            <p>
              Cerrar sesión
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}