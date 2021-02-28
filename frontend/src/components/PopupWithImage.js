function PopupWithImage({ card, onClose }) {
    return (
      <div className={`popup popup_big-pic ${Object.keys(card).length && 'popup_opened'}`}>
        <div className="popup__container popup__container_background">
          <img className="popup__img-big" src={card.link} alt={card.name} />
          <h2 className="popup__title">{card.name}</h2>
          <button type="button" className="popup__close-button" onClick={onClose}></button>
        </div>
      </div>
    );
  }
  
  export default PopupWithImage;
