import './Login.css';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return(
    <div className="login-content">
      <h1 className="login-header">Login</h1>
      <LoginForm />
    </div>
  );
}