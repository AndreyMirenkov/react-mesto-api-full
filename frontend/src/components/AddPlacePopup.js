import React from "react";
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}){

    
    const [text, setText] = useState('');
    const [urlPlace, setUrlPlace] = useState('');

    useEffect(() => {
        setText('')
        setUrlPlace('')
    },[isOpen])

    function handleTextChange(e) {
        setText(e.target.value)
    }

    function handleUrlPlaceChange(e) {
        setUrlPlace(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
          name: text,
          link: urlPlace,
        });
      }

    return(
        <PopupWithForm name='addItem' title='Новое место' isOpen={isOpen} onClose={onClose} buttonText = 'Сохранить' onSubmit ={handleSubmit}>
            <input className="popup__input popup__input_type_text" onChange={handleTextChange} id="name_image" type="text" name="name-image" value={text} placeholder="название" minlength="2" maxlength="30" required />
            <span className="popup__error" id="name_image-error"></span>
            <input className="popup__input popup__input_type_image" onChange={handleUrlPlaceChange} id="image" type="url" name="image" value={urlPlace} placeholder="ссылка на картинку" required />
            <span className="popup__error" id="image-error"></span>
        </PopupWithForm>
    )
}
export default AddPlacePopup