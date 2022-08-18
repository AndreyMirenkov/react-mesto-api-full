import React from "react";
import {useContext} from 'react'
import currentUserContext from "../contexts/CurrentUserContext";
 
function Card({card, onCardClick, onCardLike, onCardDelete}){

const currentUser = useContext(currentUserContext)

const isOwn = card.owner === currentUser._id;
const isLiked = card.likes.some(i => i === currentUser._id);

const cardDeleteButtonClassName = (
  `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
);

const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

return(
    <div className="element">
            <img src={card.link} className="element__image" alt ={card.name} onClick= {() => onCardClick(card)}/>
            <button className={cardDeleteButtonClassName} type ="button" onClick={() => onCardDelete(card)}></button>
            <div className="element__info">
                <h2 className="element__text">{card.name}</h2>
                <div className = "element__like">
                    <button className={cardLikeButtonClassName} type ="button" onClick={() => onCardLike(card)}></button>
                    <h3 className = "element__number">{card.likes.length}</h3>
                </div>
            </div>
        </div>
)    
}export default Card;