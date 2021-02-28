import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = currentUser._id === card.owner._id;
  const cardButtonRemoveClassName = `grid-card__del ${isOwn && 'grid-card__del_active'}`;

  const isLiked = card.likes.some(like => like._id === currentUser._id);
  const cardButtonLikeClassName = `grid-card__like ${isLiked && 'grid-card__like_active'}`;
  return (
    <article className="grid-card">
      <img
        className="grid-card__img"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="grid-card__wrapper">
        <h3 className="grid-card__text">{card.name}</h3>
        <div className="grid-card__likes">
          <button
            type="button"
            className={cardButtonLikeClassName}
            onClick={() => onCardLike(card)}
          ></button>
          <span className="grid-card__likes-count">{card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        className={cardButtonRemoveClassName}
        onClick={() => onCardDelete(card)}
      ></button>
    </article>
  )
}

export default Card;