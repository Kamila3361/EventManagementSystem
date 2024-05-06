import React, { useState } from "react";
import './Navbar.css'
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAuth } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const [menu, setMenu] = useState("")
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="navbar">
            <ul className="nav-menu">
                <li onClick={()=>{setMenu("main")}}><Link style={{textDecoration: 'none'}} to='/'>Main</Link>{menu==="main"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("my_bookings")}}><Link style={{textDecoration: 'none'}} to='/my_bookings'>My bookings</Link>{menu==="my_bookings"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-sign_up">
                {isAuthenticated ? (
                    <React.Fragment>
                        <span>{Cookies.get('username')}</span> 
                        <button onClick={handleLogout}>Logout</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link style={{ textDecoration: 'none' }} to='/login'><button>Login</button></Link>
                        <Link style={{ textDecoration: 'none' }} to='/signup'><button>Sign Up</button></Link>
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default Navbar