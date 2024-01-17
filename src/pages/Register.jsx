export default function Register() {
  return(
    <div className="login-content">
      <h1>Register</h1>
      <input type="text" name="email" id="email" placeholder="email" />
      <input type="text" name="password" id="password" placeholder="password" />
      <input type="text" name="nama" id="nama" placeholder="nama" />
      <input type="text" name="alamat" id="alamat" placeholder="alamat" />
      <button>Register</button>
    </div>
  );
}