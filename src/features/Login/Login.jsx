import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { RegisterForm } from "../../ui/RegisterForm";
import EmailIcon from "../../assets/emailIcon.svg?react";
import PasswordIcon from "../../assets/passwordIcon.svg?react";
import LockPasswordIcon from "../../assets/lockPasswordIcon.svg?react";
import NoLockPassIcon from "../../assets/noLockPassIcon.svg?react";
import { loginAuth } from "../../actions/auth.action.js";

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [viewPass, setViewPass] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendLoginData = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAuth(loginData);
      if (response.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));

        navigate("admin/");
      } else {
        alert(response.message || "Error al iniciar sesión.");
      }
    } catch (error) {
      alert("Error al iniciar sesión. Por favor verifica tus credenciales.");
    }
  }


  const toggleLookPass = (e) => {
    e.preventDefault();
    setViewPass(!viewPass)
  }


  return (
    <div className={styles.fullScreen}>
      <div className={styles.loginSide}>
        <div className={styles.containerLogin}>
          <div className={styles.logoContainer}>
            <h1 className={styles.logoText}>Real State</h1>
          </div>
          <div className={styles.loginContent}>
            <div className={styles.loginHeader}>
              <h2>Ingresa a tu cuenta</h2>
            </div>
            <form onSubmit={sendLoginData}>
              <div className={styles.inputContainerLogin}>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel}>Email</label>
                  <div className={styles.inputGroup}>
                    <div className={styles.inputIcon}>
                      <EmailIcon />
                    </div>
                    <input
                      type="email"
                      placeholder="john.doe@enterprise.com"
                      name="email"
                      value={loginData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel}>
                    Password
                    <span className={styles.forgotPassword}>Olvidaste tu contraseña?</span>
                  </label>
                  <div className={styles.inputGroup}>
                    <div className={styles.inputIcon}>
                      <PasswordIcon />
                    </div>
                    <input
                      type={viewPass ? "text" : "password"}
                      placeholder="••••••••••••"
                      name="password"
                      value={loginData.password}
                      onChange={handleChange}
                      required
                    />
                    <div onClick={toggleLookPass} className={styles.viewPassIcon}>
                      {viewPass ? <LockPasswordIcon /> : <NoLockPassIcon />}
                    </div>
                  </div>
                </div>

                <button type="submit" className={styles.loginButton}>
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
