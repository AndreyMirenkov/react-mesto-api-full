import React from "react";

function PopupWithForm({name, title, isOpen, onClose, buttonText, onSubmit, children}){

    return(
        <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ''}`}>
        <div className="popup__overlay"></div>
        <div className="popup__content">
            <button className="popup__close" type="button" onClick={onClose}></button>
            <h2 className="popup__title">{title}</h2>
            <form className="popup__form popup__form-profile" name={name} novalidate onSubmit={onSubmit}>
               {children}
                <button className="popup__save-button popup-addInfoInProfile" type="submit">{buttonText}</button>
            </form>
        </div>
    </div>
    )
}
export default PopupWithForm