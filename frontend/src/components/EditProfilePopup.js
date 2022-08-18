import React from "react";
import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import currentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(currentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    },[currentUser,isOpen])

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
      }

    return(
    <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} buttonText = 'Сохранить' onSubmit={handleSubmit}>
                <input className="popup__input popup__input_type_name" onChange={handleNameChange} id="name" type="text" name="name" value={name} placeholder="имя" minlength="2" maxlength="40" required />
                <span className="popup__error" id="name-error"></span>
                <input className="popup__input popup__input_type_work" onChange={handleDescriptionChange} id="job" type="text" name="work" value={description} placeholder="вид деятельности" minlength="2" maxlength="200" required />
                <span className="popup__error" id="job-error"></span>
    </PopupWithForm>
    )
}

export default EditProfilePopup;