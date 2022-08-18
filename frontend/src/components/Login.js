import React from "react";
import {useState} from 'react'

function Login({handleLogin}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleEmailChange(e){
        setEmail(e.target.value)
    }
    function handlePasswordChange(e){
        setPassword(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!email || !password){
            return;
        }
        handleLogin({password, email});
    }

    return(
        <div className="auth">
            <div className="auth__content">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input className="auth__input auth__input_type_email" onChange={handleEmailChange}  type="email" name="email" value={email} placeholder="Email" minlength="5" maxlength="40" required />
                <input className="auth__input auth__input_type_password" onChange={handlePasswordChange}  type="password" name="password" value={password} placeholder="Пароль" minlength="2" maxlength="40" required />
                <button className="auth__button" type="submit">Войти</button>
            </form>
            </div>
        </div>
    )
}

export default Login;