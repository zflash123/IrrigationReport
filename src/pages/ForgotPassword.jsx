import ForgotPasswordForm from "../components/ForgotPasswordForm";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  return(
    <div className="login-content">
      <h1 className="forgot-header">Lupa Password</h1>
      <p className="forgot-hint">Harap masukkan email address anda untuk mendapatkan link untuk ganti password</p>
      <ForgotPasswordForm/>
    </div>
  );
}