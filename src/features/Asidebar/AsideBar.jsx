import styles from "./AsideBar.module.css"
import PropertiesIcon from "../../assets/asidebarIcons/propertiesIcon2.svg?react"
import CustomerIcon from "../../assets/asidebarIcons/customerIcons.svg?react"
import ServiceIcon from "../../assets/asidebarIcons/servicesIcon.svg?react"
import DashboardIcon from "../../assets/asidebarIcons/dashboardIcon.svg?react"
import TicketIcon from "../../assets/asidebarIcons/ticketIcon.svg?react"
import { useState } from "react";
import { Presentation } from "../../ui/Presentation/Presentation.jsx"
import LogoutIcon from "../../assets/asidebarIcons/logoutIcon.svg?react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx"

export const AsideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();


  const handleLogout = (e) =>{
    logout();
  }

  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }

  const getNavLinkClass = ({ isActive }) => 
    isActive ? styles.selected : styles.navItem;

  return (
    <div className={styles.asideBarContainer}>
      <div className={styles.titleProject}>
        <h1>Real State</h1>
      </div>
      <div className={styles.delimitedLine}></div>
      <aside>
        <nav className={styles.containerNavegation}>
          <ul>
            <li>
              <NavLink
                to="/admin"
                end
                className={getNavLinkClass}
              >
                <div className={styles.navIcons}>
                  <DashboardIcon />
                </div>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/properties"
                className={getNavLinkClass}
              >
                <div className={styles.navIcons}>
                  <PropertiesIcon />
                </div>
                <span>Propiedades</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/customers"
                className={getNavLinkClass}
              >
                <div className={styles.navIcons}>
                  <CustomerIcon />
                </div>
                <span>Customers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/tickets"
                className={getNavLinkClass}
              >
                <div className={styles.navIcons}>
                  <TicketIcon />
                </div>
                <span>Tickets</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/services"
                className={getNavLinkClass}
              >
                <div className={styles.navIcons}>
                  <ServiceIcon />
                </div>
                <span>Services</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className={styles.delimitedLine}></div>
        <Presentation 
          username={user?.username}
          rolname={user?.rolName}
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