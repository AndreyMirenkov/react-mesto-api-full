import React from 'react';
import { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import api from '../utils/api.js';
import ImagePopup from './ImagePopup.js';
import currentUserContext from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth.js'

function App() {
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({name: '', link: '', about: ''});

    const [loggedIn, setLoggedIn] = useState(false);
    const [register, setRegister] = useState(true);
    const [isEditAvatarPopupOpen, setPopupAvatar] = useState(false);
    const [isEditProfilePopupOpen, setPopupProfile] = useState(false);
    const [isAddPlacePopupOpen, setPopupAddPlace] = useState(false);
    const [isInfoTooltipOpen, setPopupInfoTooltip] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [email, setEmail] = useState('')
    const history = useHistory();

    useEffect(() => {
        api.getProfile()
            .then(res => {
                setCurrentUser(res.data);
            }).catch(res => console.log(res));
    }, [])
    useEffect(() => {
        api.getInitialCards()
            .then(res => {
                setCards(res.data);
            }).catch(res => console.log(res));
    }, [])

    useEffect(() => {
        if (loggedIn){
        api.getProfile()
            .then(res => {
                setCurrentUser(res.data);
            }).catch(res => console.log(res));
        }
    }, [loggedIn])

    useEffect(() => {
        if (loggedIn){
        api.getInitialCards()
            .then(res => {
                setCards(res.data);
            }).catch(res => console.log(res));
        }
    }, [loggedIn])


    useEffect(() => {
        if (loggedIn){
            history.push('/')
        }
    },[loggedIn])

    useEffect(()=> {
        if (register){
            history.push('/sign-in')
        }
    },[history, register])

    useEffect(()=>{
        handleTokenCheck()
    },[])

    function handleCardLike(card){
        const isLiked = card.likes.some(i => i === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard.message : c));
        }).catch(res => console.log(res));
    }

    
    function handleCardDelete(card){
        api.deleteCard(card._id)
        .then((res) => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        }).catch(res => console.log(res));
    }

    function handleUpdateUser(props){
        api.editProfile(props.name, props.about)
        .then(res =>{
            setCurrentUser(res.data)
            closeAllPopups();
        }).catch(res => console.log(res))
    }

    function handleUpdateAvatar(props){
        api.updateAvatar(props.avatar)
        .then(res =>{
            setCurrentUser(res.data)
            closeAllPopups();
        }).catch(res => console.log(res))
    }

    function handleAddPlaceSubmit(props){
        api.newCard(props.name, props.link)
        .then(newCard => {
            setCards([newCard.data, ...cards]);
            closeAllPopups();
        }).catch(res => console.log(res))
    }

    const handleRegister = ({password, email}) => {
        return auth.register(password,email)
        .then(() => {
            setRegister(true)
            handleInfoTooltip()
        }).catch(res => {
            setRegister(false)
            handleInfoTooltip()
            console.log(res)
        })
    }

    const handleLogin = ({password,email}) => {
        return auth.autorize(password,email)
        .then(() => {
                setEmail(email)
                setLoggedIn(true);
        }).catch(res =>console.log(res))
    }

    const handleTokenCheck = () =>{
            auth.getToken()
            .then (res => {
                if (res){
                    setEmail(res.data.email)
                    setLoggedIn(true);
                }
            }).catch(res => console.log(res))
    }

    const signOut = () => {
        setLoggedIn(false);
        setEmail('');
        history.push('/sign-in');
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleEditAvatarClick() {
        setPopupAvatar(true);
    }
    function handleEditProfileClick() {
        setPopupProfile(true);
    }
    function handleAddPlaceClick() {
        setPopupAddPlace(true);
    }
    function handleInfoTooltip(){
        setPopupInfoTooltip(true);
    }

    function closeAllPopups() {
        setPopupAvatar(false);
        setPopupProfile(false);
        setPopupAddPlace(false);
        setPopupInfoTooltip(false)
        setSelectedCard(null);
    }

    return (
        <currentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header email = {email} signOut = {signOut}/>
                <InfoTooltip
                    isOpen= {isInfoTooltipOpen}
                    onClose= {closeAllPopups}
                    register = {register} />
                <Switch>
                <Route path = '/sign-in'>
                    <Login handleLogin = {handleLogin}/>
                </Route>
                <Route path = '/sign-up'>
                    <Register handleRegister = {handleRegister}/>
                </Route>
                <ProtectedRoute exact path = '/' loggedIn={loggedIn}>
                    <Main 
                        onEditAvatar={handleEditAvatarClick} 
                        onEditProfile={handleEditProfileClick} 
                        onAddPlace={handleAddPlaceClick} 
                        onCardClick={handleCardClick}
                        onCardLike = {handleCardLike}
                        onCardDelete = {handleCardDelete} 
                        cards={cards} />
                    <Footer />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser}/>
                    <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace = {handleAddPlaceSubmit}/>
                    <EditAvatarPopup isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateAvatar}/>
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </ProtectedRoute>
                <Route exact path = '/'>
                    {loggedIn ? <Redirect to = '/'/> : <Redirect to = '/sign-in'/> }
                </Route>
                </Switch>
            </div>
        </currentUserContext.Provider>
    );
}

export default App;
