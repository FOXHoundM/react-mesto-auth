import PopupWithForm from './PopupWithForm';

const PopupDeleteConfirm = ({ isOpen, onClose, card, onCardDelete }) => {

	function handleSubmit(evt) {
		evt.preventDefault();
		onCardDelete(card)
	}

	return (
		<div>
			<PopupWithForm
				name="delete"
				title="Вы уверены?"
				button="Да"
				children={<></>}
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default PopupDeleteConfirm;
