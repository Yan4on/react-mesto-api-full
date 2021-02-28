import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';


function Header({ email, signOut, loggedIn, currURL, changeCurrUrl }) {
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Логотип Место" />
            <span className="header__email">{loggedIn && email}</span>
            {loggedIn
                ? ''
                : (currURL === '/sign-up')
                    ? <Link to="/sign-in" onClick={() => changeCurrUrl('/sign-in')} className="header__link">Войти</Link>
                    : <Link to="/sign-up" onClick={() => changeCurrUrl('/sign-up')} className="header__link">Зарегистрироваться</Link>

            }
            {loggedIn
                ? <Link to="/" onClick={signOut} className="header__link">Выйти</Link>
                : ''
            }
        </header>
    );
}

export default Header;