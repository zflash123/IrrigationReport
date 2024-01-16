export default function Login() {
    return(
        <div className="login-content">
            <h1>Login</h1>
            <form action="">
                <input type="text" name="email" id="email" placeholder="email"/>
                <input type="text" name="password" id="password" placeholder="password"/>
                <a href="">Lupa password?</a><br />
                <button>Login</button><br />
                <a href="">Belum punya akun? klik untuk daftar</a>
            </form>
        </div>
    )
}