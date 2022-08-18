import React from "react";
import {useState} from 'react'
import {Link} from 'react-router-dom'

function Register({handleRegister}){

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
        handleRegister({password, email})
    }

    return(
        <div className="auth">
            <div className="auth__content">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input className="auth__input auth__input_type_email" onChange={handleEmailChange}  type="email" name="email" value={email} placeholder="Email" minlength="5" maxlength="40" required />
                <input className="auth__input auth__input_type_password" onChange={handlePasswordChange}  type="password" name="password" value={password} placeholder="Пароль" minlength="2" maxlength="40" required />
                <button className="auth__button" type="submit">Зарегистрироваться</button>
                <p className="auth__text">Уже зарегистрированы? <Link to = '/sign-in' className="auth__link">Войти</Link></p>
            </form>
            </div>
        </div>
    )
}

export default Register;