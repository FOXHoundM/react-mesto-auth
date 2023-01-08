import PopupWithForm from './PopupWithForm';
import { useEffect, useState } from 'react';

const PopupAddPlace = ({ isOpen, onClose, onAddPlace }) => {
	const [placeName, setPlaceName] = useState('');
	const [placeLink, setPlaceLink] = useState('');

	useEffect(() => {
		setPlaceName('');
		setPlaceLink('');
	}, [isOpen]);

	const handlePlaceNameChange = (evt) => {
		setPlaceName(evt.target.value);
	};

	const handlePlaceLinkChange = (evt) => {
		setPlaceLink(evt.target.value);
	};

	const handleAddPlaceSubmit = (evt) => {
		evt.preventDefault();

		onAddPlace({
			name: placeName,
			link: placeLink,
		});
	};

	return (
		<div>
			<PopupWithForm
				name="add"
				title="Новое место"
				button="Создать"
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleAddPlaceSubmit}
			>
				<input
					onChange={handlePlaceNameChange}
					value={placeName}
					aria-label="Название"
					type="text"
					className="popup__input popup__input_type_title"
					name="name"
					id="add-title"
					placeholder="Название "
					required
					minLength="2"
					maxLength="30"
				/>
				<span className="popup__error add-title-error"></span>

				<input
					value={placeLink}
					onChange={handlePlaceLinkChange}
					aria-label="Ссылка на картинку"
					type="url"
					className="popup__input popup__input_type_link"
					name="link"
					id="add-link"
					placeholder="Ссылка на картинку "
					required
				/>
				<span className="popup__error add-link-error"></span>
			</PopupWithForm>
		</div>
	);
};

export default PopupAddPlace;
