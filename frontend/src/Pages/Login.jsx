import React, { useState } from "react";
import './CSS/Login.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const Login = () => {

    const [username, SetUserName] = useState("")
    const [password, SetPassword] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth();
    const [error, setError] = useState(null);

    const Handllogin = async () => {
        const item = { username, password };
        try {
            const response = await fetch("http://localhost:8000/main/token/", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Username or password is not correct');
            }
            const data = await response.json();
            const token = data.access;
            login(token, username); 
            console.warn('result', data);
            navigate('/'); 
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            setError(error);
        }
    };

    return (
        <div className="login-sign-up">
            <div className="loginsignup-container">
                <h1>Login</h1>
                <div className="loginsignup-fields">
                    <input type="text" onChange={(e)=>SetUserName(e.target.value)} placeholder="UserName"/>
                    <input type="password" onChange={(e)=>SetPassword(e.target.value)} placeholder="Password"/>
                </div>
                <button onClick={Handllogin}>Continue</button>
                {error && <p>Error: {error.message}</p>}
            </div>
        </div>
    )
}

export default Login