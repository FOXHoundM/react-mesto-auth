import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Register = ({handleRegister}) => {
	const [regData, setRegData] = useState({email: '', password: ''});

	const handleChange = (evt) => {
		const {name, value} = evt.target;
		setRegData({...regData, [name]: value});
	};

	const handleRegisterSubmit = (evt) => {
		evt.preventDefault();
		handleRegister(regData);
	};

	return (
		<div className="authorization">
			<h2 className="authorization__title">Регистрация</h2>

			<form className="authorization__form" onSubmit={handleRegisterSubmit}>
				<input
					autoComplete="off"
					value={regData.email}
					type="email"
					className="authorization__input"
					required
					name="email"
					id="email"
					placeholder="E-mail"
					onChange={handleChange}
				/>
				<input
					autoComplete="off"
					value={regData.password}
					type="password"
					className="authorization__input"
					required
					name="password"
					id="password"
					placeholder="Пароль"
					onChange={handleChange}
				/>

				<button type="submit" className="authorization__submit">
					Зарегистрироваться
				</button>

				<Link className="authorization__subtitle" to="/sign-in">
					Уже зарегистрированы? Войти
				</Link>
			</form>
		</div>


	);
};

export default Register;
