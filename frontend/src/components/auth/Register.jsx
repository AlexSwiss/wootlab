import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Register () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [name, setDisplayName] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const newUser = {email, password, passwordCheck, name};
            await axios.post("http://localhost:8000/api/auth/register", newUser);
            const loginResponse = await axios.post("http://localhost:8000/api/auth/login", {
                email, password
            });
            setUserData({
                token: loginResponse.data.data.token.token,
                user: loginResponse.data.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.data.msg && setError(err.response.data.data.msg)
        }
        
    };
   
    return ( 
        <div className="register">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
                <label>Email: </label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
                <label>Password: </label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm password" onChange={e => setPasswordCheck(e.target.value)}/>
                <label>Name </label>
                <input type="text" id="dsplay-name" onChange={e => setDisplayName(e.target.value)}/>
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
        );
}
 
export default Register;