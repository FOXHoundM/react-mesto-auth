import React from 'react';
import successImg from '../images/success.svg'
import errorImg from '../images/error.svg'

const InfoToolTip = ({name, isOpen, onClose, isSuccess, successReg, failedReg}) => {

	return (
		<div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__container popup__container_infoToolTip">
				<button
					className="popup__close popup__close_infoToolTip"
					type="button"
					aria-label="закрыть окно"
					onClick={onClose}
				></button>

				<img className="popup__info-image" src={`${isSuccess ? successImg : errorImg}`} alt="Статус"/>

				<p className="popup__info-title">{`${isSuccess ? successReg : failedReg}`}</p>

			</div>
		</div>
	);
};

export default InfoToolTip;