import React, { useContext, memo } from 'react';
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = memo(({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete
}) => {

    
    //Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext); //Подписываемся на контекст


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <button
            className="profile__avatar"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></button>
          <div className="profile__form">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__button-edit"
              onClick={onEditProfile}
              type="button"
            ></button>
            <p className="profile__interst">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards-container">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
})

export default Main;
