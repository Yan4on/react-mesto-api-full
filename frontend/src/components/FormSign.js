import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const FormSign = memo(({ name, title, onSubmit, onChange, isInvalid,  btnName, changeCurrUrl, inputPass, inputEmail  }) => {
    return (
        <form className="form-auth" name={`form_${name}`} noValidate onSubmit={onSubmit} >
            <h2 className="form-auth__title">{title}</h2>
            <label className="form-auth__field">
                <input type="text" className="form-auth__input" id={`form-email-${name}`} name="email" placeholder="Email"
                    minLength="1" maxLength="30" onChange={onChange} value={inputEmail}/>

            </label>
            <label className="form-auth__field">
                <input type="password" className="form-auth__input" id={`form-password-${name}`} name="password"
                    placeholder="Пароль" onChange={onChange} value={inputPass}/>

            </label>
            <button type="submit" className={`form-auth__btn ${isInvalid ? 'form__btn_disabled' : ''}`} disabled={isInvalid}>
                {btnName}
            </button>
            { name === "sign-up" && <p className="form-auth__text">Уже зарегистрированы? <Link to="/sign-in" onClick={() => changeCurrUrl('/sign-in')} className="form-auth__link" >Войти</Link></p>}
        </form>

    );
});

export default FormSign;