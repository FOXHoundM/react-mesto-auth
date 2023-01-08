import React, {useState} from 'react'
import Header from "./Header";

const Login = ({handleLogin}) => {

	const [authData, setAuthData] = useState({email: '', password: ''})

	const handleChange = (evt) => {
		const {name, value} = evt.target
		setAuthData({...authData, [name]: value})
	}

	const handleLoginSubmit = (evt) => {
		evt.preventDefault()
		handleLogin(authData)
	}

	return (
		<>
			<Header link="/sign-up" headerText="Регистрация" />
			<div className="authorization">
				<h2 className="authorization__title">Вход</h2>

				<form className="authorization__form" onSubmit={handleLoginSubmit}>
					<input
						autoComplete="off"
						value={authData.email}
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
						value={authData.password}
						type="password"
						className="authorization__input"
						required
						name="password"
						id="password"
						placeholder="Пароль"
						onChange={handleChange}
					/>

					<button
						type="submit"
						className="authorization__submit"
					>
						Войти
					</button>
				</form>

			</div>
		</>


	)
}

export default Login
