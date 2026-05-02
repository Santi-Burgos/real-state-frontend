import { Outlet } from "react-router-dom";
import { AsideBar } from "../features/Asidebar/AsideBar.jsx";
import styles from "./MainAdminPage.module.css"

export const MainAdminPage = () => {
  return (
    <div className={styles.adminLayout}>
      <AsideBar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};