import "./Register.css"
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return(
    <div className="login-content">
      <h1 className="register-title">Register</h1>
      <RegisterForm />
    </div>
  );
}