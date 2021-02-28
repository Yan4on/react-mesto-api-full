export function InputEditAvatar({ onChange, avatarRef }) {
    return (
        <>
              <input type="url" id="link-input" name="link" className="form__input form__input_link"
                placeholder="Ссылка на изображение" required ref={avatarRef} onChange={onChange} />
              <span className="popup__input-error" id="link-input-error"></span>
            </>
    );
}

export function InputEditProfile({ inputName, inputAbout, onChange }) {
    return (
        <>
                <input type="text" id="name-input" name="name" className="form__input form__contact-name" placeholder="Имя"
                  minLength="2" maxLength="40" required value={inputName || ""} onChange={onChange} />
                <span className="popup__input-error" id="name-input-error"></span>
                <input type="text" id="interst-input" name="about" placeholder="О себе"
                  className="form__input form__contact-interst" minLength="2" maxLength="200" required value={inputAbout || ""} onChange={onChange} />
                <span className="popup__input-error" id="interst-input-error"></span>
              </>
    );
}

export function InputAddCard({ onChange, place, link }) {
    return (
        <>
                <input type="text" id="title-input" name="name" className="form__input form__item-name"
                  placeholder="Название" minLength="1" maxLength="30"required onChange={onChange} value={place}/>
                <span className="popup__input-error" id="title-input-error"></span>
                <input type="url" id="link-input" name="link" className="form__input form__link-img"
                  placeholder="Ссылка на картинку" required onChange={onChange} value={link}/>
                <span className="popup__input-error" id="link-input-error"></span>
              </>
    );
}
