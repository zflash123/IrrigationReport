import ChangePasswordForm from "../components/ChangePasswordForm";

export default function ChangePassword() {
  return(
    <div className="login-content">
      <h1 className="forgot-header">Ganti Password</h1>
      <p className="forgot-hint">Harap masukkan password anda yang baru</p>
      <ChangePasswordForm/>
    </div>
  );
}