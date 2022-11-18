import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupAddPlace from './PopupAddPlace';
import PopupEditProfile from './PopupEditProfile';
import PopupEditAvatar from './PopupEditAvatar';
import React, {useCallback, useEffect, useState} from 'react';
import PopupDeleteConfirm from './PopupDeleteConfirm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import {Route, Switch, useHistory, Redirect} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";
import {authorize, checkToken, register} from "../utils/AuthApi";

const App = () => {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({state: false, src: ''});
	const [cards, setCards] = useState([]);
	const [currentUser, setCurrentUser] = useState({});

	const [isToolTipOpen, setIsToolTipOpen] = useState(false)

	const history = useHistory()

	const [loggedIn, setLoggedIn] = useState(false)
	const [userData, setUserData] = useState({})
	const [isAuth, setIsAuth] = useState(false)

	useEffect(() => {
		if (loggedIn) {
			Promise.all([api.getUserInfo(), api.getInitialCards()])
				.then(([user, cards]) => {
					setCurrentUser(user);
					setCards(cards);
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		}

	}, [loggedIn]);

	const cbTokenCheck = useCallback(async () => {
		if (localStorage.getItem('jwt')) {
			const jwt = localStorage.getItem('jwt');
			if (!jwt) {
				throw new Error('No token in storage');
			}

			const resUser = await checkToken(jwt)
			if (!resUser) {
				throw new Error('Invalid user')
			}
			if (resUser.data) {
				setUserData(resUser.data);
				setLoggedIn(true);
			}
		}
	}, [localStorage.getItem('jwt')]);

	useEffect(() => {
		cbTokenCheck()
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	}, [cbTokenCheck]);

	const cbLogin = useCallback(async (regData) => {
		try {
			const data = await authorize(regData);
			if (data.token) {
				localStorage.setItem('jwt', data.token);
				setLoggedIn(true);
				setUserData(regData.email);
				setIsAuth(true)
				setIsToolTipOpen(true)
				history.push('/')
			}
		} catch (err) {
			setIsAuth(false)
			setIsToolTipOpen(true)
			console.log(`Ошибка: ${err}`);
		}
	}, []);

	const cbRegister = useCallback(async (regData) => {
		try {
			const res = await register(regData);
			if (res) {
				setUserData(res.data);
				setLoggedIn(true);
				setIsAuth(true)
				setIsToolTipOpen(true)
				history.push('/sign-in');
			} else {
				setIsAuth(false)
				setIsToolTipOpen(true)
			}
		} catch (err) {
			console.log(`Ошибка: ${err}`);
		}
	}, [])

	const userLogout = useCallback(() => {
		setLoggedIn(false);
		localStorage.removeItem('jwt');
	}, [])

	const handleEditProfileClick = () => {
		setIsEditProfilePopupOpen(true);
	}, handleAddPlaceClick = () => {
		setIsAddPlacePopupOpen(true);
	}, handleEditAvatarClick = () => {
		setIsEditAvatarPopupOpen(true);
	}, handleCardClick = (props) => {
		setSelectedCard({state: true, src: props.link, name: props.name});
	};

	const closeAllPopups = () => {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsConfirmPopupOpen(false);
		setSelectedCard({state: false, src: ''});
		setIsToolTipOpen(false)
	};

	const handleUpdateUser = (data) => {
		api.editUserInfo(data)
			.then((newUser) => {
				setCurrentUser(newUser);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	};

	const handleUpdateAvatar = (data) => {
		api.changeAvatar(data)
			.then((newAvatar) => {
				setCurrentUser(newAvatar);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	};

	const handleCardDelete = (card) => {
		api.deleteCard(card)
			.then(() => {
				setCards((cards) => cards.filter((item) => item._id !== card));
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	};

	const handleAddPlaceSubmit = (item) => {
		api.addCard(item)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	};

	const handleCardLike = (card) => {
		const isLiked = card.likes.some((i) => i._id === currentUser._id);

		if (!isLiked) {
			api.addLike(card._id)
				.then((newCard) => {
					setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		} else {
			api.deleteLike(card._id)
				.then((newCard) => {
					setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		}
	};

	return (<CurrentUserContext.Provider value={currentUser}>
		<div className="App">
			<Switch>
				<ProtectedRoute
					exact
					path='/'
					cards={cards}
					loggedIn={loggedIn}
					userData={userData}
					logout={userLogout}
					component={Main}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onCardClick={handleCardClick}
					onCardDelete={handleCardDelete}
					onCardLike={handleCardLike}
				/>

				<Route path="/sign-in">
					<Login handleLogin={cbLogin}/>
				</Route>

				<Route path="/sign-up">
					<Register handleRegister={cbRegister}/>
				</Route>

				<Route>
					{loggedIn ? <Redirect exact to="/"/> : <Redirect to="/sign-in"/>}
				</Route>
			</Switch>

			<Footer/>

			<PopupAddPlace
				isOpen={isAddPlacePopupOpen}
				onClose={closeAllPopups}
				onAddPlace={handleAddPlaceSubmit}
			/>
			<PopupEditProfile
				isOpen={isEditProfilePopupOpen}
				onClose={closeAllPopups}
				onUpdateUser={handleUpdateUser}
			/>
			<PopupEditAvatar
				isOpen={isEditAvatarPopupOpen}
				onClose={closeAllPopups}
				onUpdateAvatar={handleUpdateAvatar}
			/>
			<ImagePopup card={selectedCard} onClose={closeAllPopups}/>

			<PopupDeleteConfirm
				isOpen={isConfirmPopupOpen}
				onClose={closeAllPopups}
			/>

			<InfoToolTip
				successReg="Вы успешно зарегистрировались!"
				failedReg="Что-то пошло не так! Попробуйте ещё раз."
				isOpen={isToolTipOpen}
				onClose={closeAllPopups}
				isSuccess={isAuth}
			/>
		</div>
	</CurrentUserContext.Provider>);
}

export default App;