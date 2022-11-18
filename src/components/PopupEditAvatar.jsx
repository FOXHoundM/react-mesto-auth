import PopupWithForm from './PopupWithForm';
import { useEffect, useRef } from 'react';

const PopupEditAvatar = ({ isOpen, onClose, onUpdateAvatar }) => {
	const ref = useRef();

	useEffect(() => {
		ref.current.value = '';
	}, [isOpen]);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		onUpdateAvatar({
			avatar: ref.current.value,
		});
	};

	return (
		<div>
			<PopupWithForm
				name="avatar"
				title="Обновить аватар"
				button="Сохранить"
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmit}
			>
				<input
					ref={ref}
					aria-label="Обновить аватар"
					type="url"
					className="popup__input popup__input_type_avatar"
					name="avatar"
					id="avatar-link"
					placeholder="Ссылка"
					required
				/>

				<span className="popup__error avatar-link-error"></span>
			</PopupWithForm>
		</div>
	);
};

export default PopupEditAvatar;
