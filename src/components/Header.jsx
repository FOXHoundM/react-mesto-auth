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
