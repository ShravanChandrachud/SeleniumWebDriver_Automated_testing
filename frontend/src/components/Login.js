import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');

        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });

            setTimeout(() => {
                setUsername('');
                setPassword('');
            }, 500);

            if (response.data.success) {
                setSuccessMsg("Login successful!");
            } else {
                setErrorMsg("Invalid username or password.");
            }
        } catch (error) {
            setErrorMsg("An error occurred during login.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" id="submit">Login</button>
            </form>
            {successMsg && <p id="success-msg" className="success">{successMsg}</p>}
            {errorMsg && <p id="error-msg" className="error">{errorMsg}</p>}
        </div>
    );
};

export default Login;
