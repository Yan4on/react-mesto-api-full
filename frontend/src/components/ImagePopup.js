function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_big-pic ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_background">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <img className="popup__img-big" src={card.link} alt={card.name} />
                <h3 className="popup__title">{card.name}</h3>
            </div>
        </div>
    );
}

export default ImagePopup;
