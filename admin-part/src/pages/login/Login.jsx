import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import "./login.css";
import { useSelector } from 'react-redux';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password});

    };

    return (
        <div className="Container">
            <div className="Wrapper">
                <h1 className="Title"> PIJAVI SE </h1>
                <div className="Form">
                    <input className="Input" type="text" placeholder="Korisničko ime..." onChange={(e)=>setUsername(e.target.value)}/>
                    
                    <input className="Input" type="password" placeholder="Lozinka..." onChange={(e)=>setPassword(e.target.value)}/>
                    
                    <button className="Button" onClick={handleClick}>LOGIN</button>
                    { error && <div className="Error"> Došlo je do greške! </div> }
                </div>
            </div>
        </div>
    )
}