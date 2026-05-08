import styles from "./AsideBar.module.css"
import PropertiesIcon from "../../assets/asidebarIcons/propertiesIcon2.svg?react"
import CustomerIcon from "../../assets/asidebarIcons/customerIcons.svg?react"
import ServiceIcon from "../../assets/asidebarIcons/servicesIcon.svg?react"
import DashboardIcon from "../../assets/asidebarIcons/dashboardIcon.svg?react"
import TicketIcon from "../../assets/asidebarIcons/ticketIcon.svg?react"
import AppointmentsIcon from "../../assets/asidebarIcons/appointmentsIcon.svg?react"

import { useState, useEffect } from "react";
import { Presentation } from "../../ui/Presentation/Presentation.jsx"
import LogoutIcon from "../../assets/asidebarIcons/logoutIcon.svg?react"
import ArrowIcon from "../../assets/asidebarIcons/arrowIcon.svg?react"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx"

export const AsideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('customers') || location.pathname.includes('appointments')) {
      setIsCustomersOpen(true);
    }
  }, [location.pathname]);

  const handleLogout = (e) => {
    logout();
  }

  const toggleCustomers = (e) => {
    e.preventDefault();
    setIsCustomersOpen(!isCustomersOpen);
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
              <div className={styles.navItemWithArrow}>
                <NavLink
                  to="/admin/customers"
                  className={getNavLinkClass}
                >
                  <div className={styles.navIcons}>
                    <CustomerIcon />
                  </div>
                  <span>Customers</span>
                </NavLink>
                <div
                  className={`${styles.arrowContainer} ${isCustomersOpen ? styles.arrowOpen : ""} ${getNavLinkClass}`}
                  onClick={toggleCustomers}
                >
                  <ArrowIcon />
                </div>
              </div>
              {isCustomersOpen && (
                <ul className={styles.submenu}>
                  <li>
                    <NavLink
                      to="/admin/appointments"
                      className={getNavLinkClass}
                    >
                      <div className={styles.navIcons}>
                        <AppointmentsIcon />
                      </div>
                      <span>Citas</span>
                    </NavLink>
                  </li>
                </ul>
              )}
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