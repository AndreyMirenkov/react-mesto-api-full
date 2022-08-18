import React from "react";
import ok from '../images/ok.svg'
import noOk from '../images/notOk.svg'


function InfoTooltip({isOpen, onClose, register}){

    const text = register ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
    const img = register ? ok : noOk

    return(
        <div className={`popup ${isOpen ? "popup_opened" : ''}`}>
        <div className="popup__content">
            <button className="popup__close" type="button" onClick={onClose}></button>
            <img src = {img} alt = "картинка" className = "popup__icon"/>
            <p className="popup__text">{text}</p>
        </div>
    </div>
    )
}

export default InfoTooltip;