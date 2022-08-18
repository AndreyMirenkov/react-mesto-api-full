import React from "react"
import currentUserContext from "../contexts/CurrentUserContext"
import {useRef, useContext, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateUser}){

const currentUser = useContext(currentUserContext);
const avatarLink = useRef()

useEffect(() =>{
    avatarLink.current.value = ''
},[currentUser])

function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      avatar: avatarLink.current.value
    });
  }

    return(
            <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isOpen} onClose={onClose} buttonText = 'Сохранить' onSubmit = {handleSubmit}>
                <input className="popup__input popup__input_type_avatar"  id="avatar-image" type="url" name="image" ref = {avatarLink} placeholder="ссылка на новый аватар" required />
                <span className="popup__error" id="avatar-image-error"></span>
            </PopupWithForm>
    )
}
export default EditAvatarPopup