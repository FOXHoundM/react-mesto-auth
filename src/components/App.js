import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupAddPlace from './PopupAddPlace';
import PopupEditProfile from './PopupEditProfile';
import PopupEditAvatar from './PopupEditAvatar';
import React, {useCallback, useEffect, useState} from 'react';
import PopupDeleteConfirm from './PopupDeleteConfirm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
// import api from '../utils/Api';
import {Route, Switch, useHistory, Redirect} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';
import {authorize, checkToken, register} from '../utils/AuthApi';
import Header from "./Header";
import Api from "../utils/Api";

const App = () => {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({state: false, src: ''});
	const [cards, setCards] = useState([]);
	const [card, setCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [jsonWebToken, setJsonWebToken] = useState('');

	const [isToolTipOpen, setIsToolTipOpen] = useState(false);

	const [loggedIn, setLoggedIn] = useState(false);
	const [userData, setUserData] = useState({});
	const [isAuth, setIsAuth] = useState(false);
	const history = useHistory();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const api = new Api({
		url: 'https://api.foxhound.nomoredomains.club',
		headers: {
			'Authorization': `Bearer ${jsonWebToken}`,
			'Content-type': 'application/json',
		},
	});

	const registerCallback = useCallback(
		async (regData) => {
			try {
				const res = await register(regData);
				if (res) {
					setUserData(res.data);
					// setLoggedIn(true);
					setIsAuth(true);
					setIsToolTipOpen(true);
					history.push('/sign-in');
				} else {
					setIsAuth(false);
					setIsToolTipOpen(true);
				}
			} catch (err) {
				console.log(`Ошибка: ${err}`);
			}
		},
		[history]
	);

	const loginCallback = useCallback(
		async (regData) => {
			try {
				const data = await authorize(regData);
				if (data.token) {
					localStorage.setItem('jwt', data.token);

					console.log(data)

					setJsonWebToken(data.token)
					setLoggedIn(true);
					setUserData(regData);
					setIsAuth(true);
					setIsToolTipOpen(true);
					history.push('/');
				}
			} catch (err) {
				setIsAuth(false);
				setIsToolTipOpen(true);
				console.log(`Ошибка: ${err}`);
			}
		},
		[history]
	);

	const checkTokenCallback = useCallback(async () => {
		if (localStorage.getItem('jwt')) {
			const jwt = localStorage.getItem('jwt');
			if (!jwt) {
				throw new Error('No token in storage');
			}

			const resUser = await checkToken(jwt);
			if (!resUser) {
				throw new Error('Invalid user');
			}
			if (resUser) {
				setJsonWebToken(jwt);
				setUserData(resUser);
				setLoggedIn(true);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		checkTokenCallback().catch((err) => {
			console.log(`Ошибка: ${err}`);
		});
	}, [checkTokenCallback]);

	useEffect(() => {
		if (loggedIn) {
			console.log(jsonWebToken)

			Promise.all([api.getUserInfo(), api.getInitialCards()])
				.then(([user, cards]) => {
					setCurrentUser(user);
					setCards(cards.reverse());
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		}
	}, [jsonWebToken, loggedIn]);

	const handleLogout = useCallback(() => {
		setLoggedIn(false);
		localStorage.removeItem('jwt');
	}, []);

	const handleEditProfileClick = () => {
			setIsEditProfilePopupOpen(true);
		},
		handleAddPlaceClick = () => {
			setIsAddPlacePopupOpen(true);
		},
		handleEditAvatarClick = () => {
			setIsEditAvatarPopupOpen(true);
		},
		handleCardClick = (props) => {
			setSelectedCard({state: true, src: props.link, name: props.name});
		},
		handleConfirmPopupOpen = (card) => {
			setIsConfirmPopupOpen(true)
			setCard(card)
		};

	const closeAllPopups = () => {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsConfirmPopupOpen(false);
		setSelectedCard({state: false, src: ''});
		setIsToolTipOpen(false);
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
				closeAllPopups();
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
		console.log(card)
		const isLiked = card.likes.some((i) => i === currentUser._id);

		if (!isLiked) {
			api.addLike(card._id)
				.then((newCard) => {
					setCards((state) =>
						state.map((c) => (c._id === card._id ? newCard : c))
					);
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		} else {
			api.deleteLike(card._id)
				.then((newCard) => {
					setCards((state) =>
						state.map((c) => (c._id === card._id ? newCard : c))
					);
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		}
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="App">
				<Header login={userData} link="/sign-in" loggedIn={loggedIn} logout={handleLogout} />
				<Switch>
					<ProtectedRoute
						exact
						path="/"
						component={Main}
						cards={cards}
						loggedIn={loggedIn}
						logout={handleLogout}
						userData={userData}

						onEditProfile={handleEditProfileClick}
						onAddPlace={handleAddPlaceClick}
						onEditAvatar={handleEditAvatarClick}
						onCardClick={handleCardClick}
						onCardDelete={handleConfirmPopupOpen}
						onCardLike={handleCardLike}
					/>

					<Route path="/sign-in">
						<Login handleLogin={loginCallback} loggedIn={loggedIn} />
					</Route>

					<Route path="/sign-up">
						<Register handleRegister={registerCallback}/>
					</Route>

					<Route>
						{loggedIn ?
							<Redirect exact to="/" />
							:
							<Redirect to="/sign-in"/>
						}
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
					card={card}
					onCardDelete={handleCardDelete}
				/>

				<InfoToolTip
					successReg="Вы успешно зарегистрировались!"
					failedReg="Что-то пошло не так! Попробуйте ещё раз."
					isOpen={isToolTipOpen}
					onClose={closeAllPopups}
					isSuccess={isAuth}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
};

export default App;
