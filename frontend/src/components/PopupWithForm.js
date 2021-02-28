function PopupWithForm({name, title, btnName, isOpen, onClose, onSubmit, children}) {
    return (
        <div className={`popup popup__${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form className="form" name={`popup__form_${name}`} noValidate onSubmit={onSubmit}>
                    <h2 className="form__title">{title}</h2>
                    {children}
                    (
                    <button type="submit" className="form__submit">{btnName}</button>
                    <button type="button" className="popup__close-button" onClick={onClose}></button>
                    )
                </form>
            </div>
        </div>

    );
}

export default PopupWithForm;

