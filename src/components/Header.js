import logo from '../images/logo/logo-mesto.svg';
import { Link, Route, Switch } from 'react-router-dom';

const MainPath = ({login, logout}) => {
	return (
		<Route exact path="/">
			<div className="header__menu">
				<p className="header__link header__link_email">{login.email}</p>
				<button className="header__link" onClick={logout}>
					Выйти
				</button>
			</div>
		</Route>
	)
}

const LoginAndRegPath = () => {
	return (
		<Switch>

			<Route path="/sign-in">
				<Link to="/sign-up" className="header__link">
					Регистрация
				</Link>
			</Route>
			<Route path="/sign-up">
				<Link to="/sign-in" className="header__link">
					Войти
				</Link>
			</Route>

		</Switch>
	)
}

const Header = ({ login, loggedIn, logout }) => {
	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="логотип" />

			<div className="header__menu">
				{
					loggedIn ? <MainPath login={login} logout={logout} /> : <LoginAndRegPath />
				}
			</div>
		</header>
	);
};

export default Header;
