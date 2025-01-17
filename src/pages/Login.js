import React, { useState } from "react";
import api from "../utils/api";
import '../styles/Login.css';

const Login = ({ onLogin, onRegisterClick }) => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/login", {
                user: usuario,
                password: senha
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                onLogin();
            } else {
                setError("Login falhou. Verifique suas credenciais.");
            }
        } catch (err) {
            console.log("Erro no login:", err.response?.data || err.message);
            setError("Erro no login. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="login-section">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    placeholder="Usuário"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button className="login-button" onClick={handleLogin} disabled={loading}>
                    {loading ? "Entrando..." : "Login"}
                </button>
                <p>Não possui cadastro? <span className="link" onClick={onRegisterClick}>Registre-se</span></p>
            </div>
        </div>
    );
};

export default Login;
