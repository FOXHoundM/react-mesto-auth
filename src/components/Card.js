import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

const Card = ({
	card,
	name,
	link,
	likes,
	onCardClick,
	onCardDelete,
	onCardLike,
}) => {
	const currentUser = useContext(CurrentUserContext);

	const handleCardClick = () => {
		onCardClick(card);
	};

	const handleLikeClick = () => {
		onCardLike(card);
	};

	const handleDeleteClick = () => {

		onCardDelete(card._id);
	};

	const isOwn = card.owner === currentUser._id;

	const cardDeleteButtonClassName = `cards__delete ${
		isOwn ? 'cards__delete_visible' : ''
	}`;

	const isLiked = card.likes.some((i) => i === currentUser._id);

	const cardLikeButtonClassName = `cards__like ${
		isLiked ? 'cards__like_active' : ''
	}`;

	return (
		<div>
			<li className="cards">
				<button
					aria-label="удалить карту"
					className={cardDeleteButtonClassName}
					onClick={handleDeleteClick}
				></button>
				<img
					src={link}
					alt={name}
					id=""
					className="cards__image"
					onClick={handleCardClick}
				/>
				<div className="cards__text">
					<h2 className="cards__title">{name}</h2>
					<div className="cards__like_container">
						<button
							className={cardLikeButtonClassName}
							onClick={handleLikeClick}
							type="button"
							aria-label="поставить лайк"
						/>
						<span className="cards__like_count">{likes}</span>
					</div>
				</div>
			</li>
		</div>
	);
};

export default Card;
