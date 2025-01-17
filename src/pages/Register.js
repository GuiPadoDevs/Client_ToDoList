import React, { useState } from "react";
import axios from "axios";
import '../App.css';
import '../styles/Register.css';

const Register = ({ onRegister, onLoginClick }) => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmeSenha, setConfirmeSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("https://server-to-do-list.vercel.app/api/auth/register", {
                user: usuario,
                password: senha,
                confirm: confirmeSenha,
            });

            if (response.data._id) {
                onRegister();
            } else {
                setError("Registro falhou. Tente novamente.");
            }
        } catch (err) {
            console.log("Erro no registro:", err.response?.data || err.message);
            setError("Erro no registro. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="register-section">
                <h2>Register</h2>
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
                <input
                    type="password"
                    placeholder="Confirme a senha"
                    value={confirmeSenha}
                    onChange={(e) => setConfirmeSenha(e.target.value)}
                />
                <button className="register-button" onClick={handleRegister} disabled={loading}>
                    {loading ? "Registrando..." : "Register"}
                </button>
                <p>Já possui cadastro? <span className="link" onClick={onLoginClick}>Faça login</span></p>
            </div>
        </div>
    );
};

export default Register;
