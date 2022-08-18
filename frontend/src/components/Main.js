import React from "react";
import { useContext } from "react";
import currentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({onEditAvatar,onEditProfile,onAddPlace, onCardClick, onCardLike, onCardDelete, cards}){

const context = useContext(currentUserContext)


    return(
<main className="content">
        <section className="profile">
            <div className = "profile__avatar-button"> 
                <img alt="Аватар" className="profile__avatar" src = {context.avatar}/>
                <div className = "profile__edit-avatar" onClick={onEditAvatar}></div>
            </div>
            <div className="profile__info">
                <h1 className="profile__name">{context.name}</h1>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                <p className="profile__text">{context.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
         {cards.map((card) => (
             <Card card = {card} key = {card._id} onCardClick = {onCardClick} onCardLike = {onCardLike} onCardDelete = {onCardDelete}/>
         ))
        }
        </section>
    </main>    
    );
}
export default Main