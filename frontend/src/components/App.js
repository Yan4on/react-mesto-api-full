import React, { useEffect, useState, useCallback } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddCardPopup from './AddCardPopup.js';
import InfoTooltip from './InfoTooltip';

import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

import { api } from '../utils/api.js';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { StatePopup } from '../contexts/StatePopup';



function App() {
  const history = useHistory();
  const location = useLocation();
  // Устанавливаем стэйты
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currURL, setCurrURL] = useState('');

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDelCardPopupOpen, setIsDelCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    message: '',
    status: ''
  });

  const [cards, setCards] = React.useState([]);

  // Используем хук для получения информации о юзере и карточки
  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getUserInfoFromServer(), //получаем данные о пользователе
        api.getInitialCards() // Получаем массив карточек
      ])
        .then((data) => {
          const [userData, cardsData] = data;
          setCurrentUser(userData); //меняем состояния 
          setCards(cardsData);
        })
        .catch((err) => { api.setErrorServer(err); })
    }
  }, [loggedIn]);


  // Обработчик клика по лайку
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);  // Обновляем стейт
      })
      .catch((err) => { api.setErrorServer(err); });
  }

  // Обработчик кнопки удаления карточки
  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCardToServer(card)
      .then(() => {
        // Формируем новый массив на основе имеющегося, если ИД совпадает с ИД 
        // удаляемой карточки, то она не должна попасть в новый массив
        const newCards = cards.filter((c) => c._id !== card._id && c);
        setCards(newCards);  // Обновляем стейт
      })
      .catch((err) => { api.setErrorServer(err); });
  }

  // Обработчик кнопки Сохранить в попапе редактирования профиля
  function handleUpdateUser(inputValues) {
    api.saveUserInfoToServer(inputValues)   // Сохраняем на сервере
      .then((userData) => {
        closeAllPopups()
        setCurrentUser(userData)
      }) // устанавливаем новый стэйт: новые данные пользователя
      .catch((err) => {
        api.setErrorServer(err);
      })
  }

  // Обработчик кнопки Сохранить в попапе редактирования аватара
  function handleUpdateAvatar(avatar) {
    api.saveAvatarToServer(avatar)   // Сохраняем на сервере
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      }) // устанавливаем новый стэйт: новый аватар
      .catch((err) => {
        api.setErrorServer(err);
      })
  }

  // Обработчик кнопки Создать в попапе добавления карточки
  function handleAddPlace(newCard) {
    api.saveCardToServer(newCard)   // Сохраняем на сервере
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      }) // Обновляем массив с карточками, добавляем загруженную
      .catch((err) => { api.setErrorServer(err); })
  }

  // Обработчики открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function onInfoTooltip(message, status) {
    setIsInfoTooltip({
      isOpen: true,
      message: message,
      status: status
    });
  }

  // Обработчик закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltip(false);
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setUserEmail(email);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');

  if (jwt) {
  auth.getContent(jwt)
  .then((res) => {
  if (res) {
  setLoggedIn(true);
  setUserEmail(res.data.email);
  history.push('/');
     }
   });
  }
 }

 function handleAuthRegister(email, password) {
 auth.register(email, password)
     .then((res) => {
         if (res.status === 201) {
             onInfoTooltip('Вы успешно зарегистрировались!', 'ok')
             history.push('/sign-in');
             changeCurrUrl('/sign-in');
             return;
         }
         onInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.', 'error')
         return res;
     })
     .catch((err) => {
         onInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.', 'error');
         console.log(err)
     });
    }

 function handleAuthLogin(email, password) {
  return auth.authorize(email, password)
    .then((data) => {
      if (data) {
        handleLogin(email);
        history.push('/');
      }
    })
    .catch(err => console.log(err));
}

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function changeCurrUrl(url) {
    setCurrURL(url);
  }

  useEffect(() => {
    setCurrURL(location.pathname);
  }, [location.pathname, currURL]);

  useEffect(() => {
    tokenCheck();
  }, []);

  // Объект с состояниями попапов
  const popupStateContext = {
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen
  }

  return (
    <StatePopup.Provider value={popupStateContext}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
        <Header
            email={userEmail}
            signOut={signOut}
            loggedIn={loggedIn}
            currURL={currURL}
            changeCurrUrl={changeCurrUrl} />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={() => <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick} // Обработчик клика по карточке
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            } />
            <Route path="/sign-up">
              <Register 
              changeCurrUrl={changeCurrUrl}
              authRegister={handleAuthRegister}
               />
            </Route>
            <Route path="/sign-in">
              <Login 
              handleLogin={handleLogin} 
              authLogin={handleAuthLogin}
              />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in"  />}
            </Route>
          </Switch>

          

          {/*Создаем попап для аватара и передаем пропсы и обработчики*/}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/*Создаем попап для профиля и передаем пропсы и обработчики*/}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/*Создаем попап для новой карточки и передаем пропсы и обработчики*/}
          <AddCardPopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          {/*Создаем попап для подтверждения удаления карточки и передаем пропсы и обработчики*/}
          <PopupWithForm
            name="confirm-delete"
            title="Вы уверены?"
            btnName="Да"
            isOpen={isDelCardPopupOpen}
            onClose={closeAllPopups}
          >
          </PopupWithForm>

          {/*Создаем попап с картинкой и передаем пропсы и обработчики*/}
          <PopupWithImage
            card={selectedCard}
            onClose={closeAllPopups}
          />

          {/*Попап с сообщением*/}
          {<InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
          />}

          { loggedIn && <Footer/>}

        </div>
      </CurrentUserContext.Provider>
    </StatePopup.Provider>
  );
}

export default App;
