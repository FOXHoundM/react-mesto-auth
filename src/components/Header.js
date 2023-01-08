import logo from '../images/logo/logo-mesto.svg';

import {Link} from "react-router-dom";





const Header = ({link, login, loggedIn, onClick, headerText}) => {

	return (

		<header className="header">

			<img className="header__logo" src={logo} alt="логотип"/>



			<div className="header__menu">

				<p className="header__link header__link_email">{login}</p>

				<Link

					to={link}

					onClick={onClick}

					className={`header__link ${loggedIn && "header__link_logout"}`}>{headerText}</Link>

			</div>

		</header>

	);

};



export default Header;



// import logo from '../images/logo/logo-mesto.svg';
// import {Link, Route, Switch} from 'react-router-dom';
//
// const Header = ({login, logout}) => {
// 	return (
// 		<header className="header">
// 			<img className="header__logo" src={logo} alt="логотип"/>
//
// 			<div className="header__menu">
// 				<Switch>
// 					<Route path='/sign-in'>
// 						<Link to="/sign-up" className="header__link">
// 							Регистрация
// 						</Link>
// 					</Route>
//
// 					<Route path="/sign-up">
// 						<Link to='/sign-in' className="header__link">
// 							Войти
// 						</Link>
// 					</Route>
//
// 					{/*<ProtectedRoute exact path="/" >*/}
// 					{/*		<div className="header__menu">*/}
// 					{/*					<p className="header__link header__link_email">{login}</p>*/}
// 					{/*					<Link to='sign-in' className="header__link">*/}
// 					{/*						Выйти*/}
// 					{/*					</Link>*/}
// 					{/*				</div>*/}
// 					{/*</ProtectedRoute>*/}
//
//
// 					<Route exact path="/">
// 						<div className="header__menu">
// 							<p className="header__link header__link_email">{login}</p>
// 							<Link to='/sign-in' onClick={logout} className="header__link">
// 								Выйти
// 							</Link>
// 						</div>
// 					</Route>
// 				</Switch>
//
// 			</div>
// 		</header>
// 	);
// };
//
// export default Header;
