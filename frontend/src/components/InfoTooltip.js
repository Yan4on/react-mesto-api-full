import logoOk from '../images/ok.svg';
import logoErr from '../images/error.svg';
import React, { memo } from 'react';

const InfoTooltip = memo(({ isOpen, onClose }) => {
  return (
    <div className={`popup ${isOpen.isOpen && 'popup_opened'}`} >
      <form className="popup__container" name="popup__image" noValidate>
        <div className="popup__logo"
          style={isOpen.status === 'ok'
            ? { backgroundImage: `url(${logoOk})` }
            : { backgroundImage: `url(${logoErr})` }
          }
        ></div>
        <h2 className="popup__message">{isOpen.message}</h2>
        <button type="button" className="popup__btn-close" onClick={onClose}></button>
      </form>
    </div>
  );
});

export default InfoTooltip;