const PopupWithForm = ({
	name,
	title,
	button,
	children,
	isOpen,
	onClose,
	onSubmit,
}) => {
	return (
		<div>
			<div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
				<div className="popup__container popup__container_add">
					<button
						className="popup__close popup__close_add"
						type="button"
						aria-label="закрыть окно"
						onClick={onClose}
					></button>

					<h2 className="popup__title">{title}</h2>

					<form className={`popup__form`} name={name} onSubmit={onSubmit}>
						{children}

						<button
							className="popup__save-button"
							type="submit"
							aria-label={`${button}`}
						>
							{button}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PopupWithForm;
