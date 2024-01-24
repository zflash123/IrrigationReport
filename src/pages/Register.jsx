import "./Register.css"

export default function Register() {
  return(
    <div className="login-content">
      <h1>Register</h1>
      <input type="text" name="email" className="form-input" id="register-email" placeholder="email" />
      <input type="text" name="password" className="form-input" id="register-password" placeholder="password" />
      <input type="text" name="nama" className="form-input" id="register-name" placeholder="nama" />
      <input type="text" name="alamat" className="form-input" id="register-address" placeholder="alamat" />
      <button className="register-button">Register</button>
    </div>
  );
}