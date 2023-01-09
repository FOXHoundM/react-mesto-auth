import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({
	cards,
	onCardClick,
	onCardLike,
	onCardDelete,
	onAddPlace,
	onEditAvatar,
	onEditProfile,
}) => {
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className="profile">
				<div
					className="profile__avatar"
					onClick={onEditAvatar}
					style={{backgroundImage: `url(${currentUser.avatar})`}}
				></div>

				<div className="profile__info">
					<h1 className="profile__title">{currentUser.name}</h1>
					<p className="profile__subtitle">{currentUser.about}</p>
					<button
						className="profile__edit-button"
						type="button"
						aria-label="Редактировать профиль"
						onClick={onEditProfile}
					></button>
				</div>

				<button
					className="profile__add-button"
					type="button"
					aria-label="Добавить фото"
					onClick={onAddPlace}
				></button>
			</section>

			<section className="elements">
				<ul className="elements__item">
					{cards.map((item) => (
						<Card
							key={item._id}
							card={item}
							link={item.link}
							name={item.name}
							likes={item.likes.length}
							onCardClick={onCardClick}
							onCardDelete={onCardDelete}
							onCardLike={onCardLike}
						/>
					))}
				</ul>
			</section>
		</main>

	);
};

export default Main;
