const ImagePopup = ({ card, onClose }) => {
	return (
		<div>
			<div
				className={`popup popup_image ${card.state ? 'popup_opened' : ''}`}
			>
				<div className="popup__container popup__container_image">
					<button
						className="popup__close popup__close_image"
						type="button"
						aria-label="закрыть окно"
						onClick={onClose}
					></button>

					<img src={card.src} alt={card.name} className="popup__image" />

					<p className="popup__subtitle">{card.name}</p>
				</div>
			</div>
		</div>
	);
};

export default ImagePopup;
