import './Login.css';

export default function Login() {
    return(
        <div className="login-content">
            <h1 className="login-header">Login</h1>
            <form action="">
                <input type="text" name="email" id="email" placeholder="email"/>
                <input type="text" name="password" id="password" placeholder="password"/>
                <div id="forgot-pwd">
                    <a href="">Lupa password?</a><br />
                </div>
                <button>Login</button><br />
                <a href="/register" id="register-link">Belum punya akun? klik untuk daftar</a>
            </form>
        </div>
    );
}