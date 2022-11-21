import logo from '../images/logo/logo-mesto.svg';
import { Link, Route } from 'react-router-dom';

const Header = ({ login }) => {
	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="логотип" />

			<div className="header__menu">
				<Route path="/sign-in">
					<Link to="sign-up" className="header__link">
						Регистрация
					</Link>
				</Route>
				<Route path="/sign-up">
					<Link to="sign-in" className="header__link">
						Войти
					</Link>
				</Route>
				<Route exact path="/">
					<div className="header__menu">
						<p className="header__link header__link_email">{login}</p>
						<Link to="sign-in" className="header__link">
							Выйти
						</Link>
					</div>
				</Route>
			</div>
		</header>
	);
};

export default Header;
