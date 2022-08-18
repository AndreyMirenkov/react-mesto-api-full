import React from "react";

function ImagePopup({card, onClose}){

    const dataCard = ({ ... card})

    return(
<div className={`popup popup_img ${card ? "popup_opened" : ""}`}>
        <div className="popup__overlay"></div>
        <div className="popup__img-container">
            <button className="popup__close popup__close_img" type="button" onClick={onClose}></button>
            <img src={dataCard.link} className="popup__img-element" alt = {dataCard.name}/>
            <p className="popup__img-text">{dataCard.name}</p>
        </div>
    </div>
    )}

export default ImagePopup