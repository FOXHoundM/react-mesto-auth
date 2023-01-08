import PopupWithForm from './PopupWithForm';

const PopupDeleteConfirm = ({ isOpen, onClose }) => {
	return (
		<div>
			<PopupWithForm
				name="delete"
				title="Вы уверены?"
				button="Да"
				children={<></>}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</div>
	);
};

export default PopupDeleteConfirm;
