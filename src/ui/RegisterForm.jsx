import { useState } from "react";
import UsernameIcon from "../assets/usernameIcon.svg?react";
import EmailIcon from "../assets/emailIcon.svg?react";
import PasswordIcon from "../assets/passwordIcon.svg?react";
import LockPasswordIcon from "../assets/lockPasswordIcon.svg?react";
import NoLockPassIcon from "../assets/noLockPassIcon.svg?react";

export const RegisterForm = ({ isAdmin }) => {
  const [viewPass, setViewPass] = useState(false);
  const [viewRepeatPass, setViewRepeatPass] = useState(false);

  return (
    <form> 
      <div className="inputContainer-login">
        <div className="input-group">
          <div className="input-icon">
            <UsernameIcon />
          </div>
          <input placeholder="Username" />
        </div>

        <div className="input-group">
          <div className="input-icon">
            <EmailIcon />
          </div>
          <input placeholder="Email" />
        </div>

        <div className="input-group">
          <div className="input-icon">
            <PasswordIcon />
          </div>
          <input
            type={viewPass ? "text" : "password"}
            placeholder="Password"
          />
          <div onClick={() => setViewPass(!viewPass)} className="viewPassIcon">
            {viewPass ? <LockPasswordIcon /> : <NoLockPassIcon />}
          </div>
        </div>

        <div className="input-group">
          <div className="input-icon">
            <PasswordIcon />
          </div>
          <input
            type={viewRepeatPass ? "text" : "password"}
            placeholder="Repeat Password"
          />
          <div onClick={() => setViewRepeatPass(!viewRepeatPass)} className="viewPassIcon">
            {viewRepeatPass ? <LockPasswordIcon /> : <NoLockPassIcon />}
          </div>
        </div>

        <button className="login-button">
          Crear cuenta
        </button>
      </div>
    </form>
  );
}