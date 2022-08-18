import React from "react";
import {Switch, Link, Route} from 'react-router-dom'

function Header({email, signOut}){
    
const onClose = () => {
    signOut();
}

return(
<header className="header">
        <div className="header__logo"></div>
        <div className="header__block">
            <p className="header__email">{email}</p>
            <Switch>
            <Route path ='/sign-in'>
                <Link to = '/sign-up' className="header__link">Регистрация</Link>
            </Route>
            <Route path ='/sign-up'>
                <Link to = '/sign-in' className="header__link">Войти</Link>
            </Route>
            <Route exact path ='/'>
                <Link to = '/sign-in' onClick={onClose} className="header__link header__link_exit">Выйти</Link>
            </Route>
            </Switch> 
        </div>
</header>
    );
}
export default Header