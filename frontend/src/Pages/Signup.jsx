import React, { useState } from "react";
import './CSS/Signup.css'
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    const [username, SetUserName] = useState("")
    const [first_name, SetFirstName] = useState("")
    const [last_name, SetLastName] = useState("")
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState(null);

    const sign_up = async () => {
        const item = { username, email, first_name, last_name, password };
        try {
            const response = await fetch("http://localhost:8000/main/sign_up/", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.warn('result', data);
            navigate('/login'); // Assuming you want to navigate on successful sign up
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            setError(error);
        }
    };

    return (
        <div className="login-sign-up">
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type="text" onChange={(e)=>SetUserName(e.target.value)} placeholder="UserName"/>
                    <input type="text" onChange={(e)=>SetFirstName(e.target.value)} placeholder="First Name"/>
                    <input type="text" onChange={(e)=>SetLastName(e.target.value)} placeholder="Last Name"/>
                    <input type="email" onChange={(e)=>SetEmail(e.target.value)} placeholder="Email Address"/>
                    <input type="password" onChange={(e)=>SetPassword(e.target.value)} placeholder="Password"/>
                </div>
                <button onClick={sign_up}>Continue</button>
                <p className="loginsignup-login">Already have an account? <Link style={{textDecoration: 'none'}} to='/login'><span>Login here</span></Link></p>
                {error && <p>Error: {error.message}</p>}
            </div>
        </div>
    )
}

export default Signup