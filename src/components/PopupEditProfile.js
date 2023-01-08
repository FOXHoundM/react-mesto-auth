import PopupWithForm from './PopupWithForm';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const PopupEditProfile = ({ isOpen, onClose, onUpdateUser }) => {
	const currentUser = useContext(CurrentUserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

	const handleNameChange = (evt) => {
		setName(evt.target.value);
	};

	const handleDescriptionChange = (evt) => {
		setDescription(evt.target.value);
	};

	const handleSubmit = (evt) => {
		console.log('clicked');
		evt.preventDefault();

		onUpdateUser({
			name: name,
			about: description,
		});
	};

	return (
		<div>
			<PopupWithForm
				name="profile"
				title="Редактировать профиль"
				button="Сохранить"
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmit}
			>
				<input
					value={name || ''}
					onChange={handleNameChange}
					aria-label="Редактировать имя"
					type="text"
					className="popup__input popup__input_type_name"
					name="name"
					id="edit-name"
					placeholder=""
					required
					minLength="2"
					maxLength="40"
				/>
				<span className="popup__error edit-name-error"></span>

				<input
					value={description || ''}
					onChange={handleDescriptionChange}
					aria-label="Редактировать профессию"
					type="text"
					className="popup__input popup__input_type_prof"
					name="job"
					id="edit-profession"
					placeholder=""
					required
					minLength="2"
					maxLength="200"
				/>
				<span className="popup__error edit-profession-error"></span>
			</PopupWithForm>
		</div>
	);
};

export default PopupEditProfile;
