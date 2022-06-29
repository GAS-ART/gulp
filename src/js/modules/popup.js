export function popUp(popupId) {
	const popUp = document.getElementById(popupId);
	const bodyLock = document.getElementById('body');
	const popupCloseIcon = popUp.querySelector('.close-popup');
	const popupBtn = popUp.querySelector('.popup__button');
	const popupSending = popUp.querySelector('.popup__send-load');
	const filePreview = popUp.querySelector('.preview-file') || false;
	popUp.classList.add('open');
	bodyLock.classList.add('lock');

	popupCloseIcon.addEventListener('click', function (e) {
		popupClose(popUp);
		e.preventDefault();
	});

	popupBtn.addEventListener('click', function () {
		popupClose(popUp);
	});

	function popupClose(popupActive) {
		popupActive.classList.remove('open');
		bodyLock.classList.remove("lock");
		popUp.classList.remove('send');
		if (filePreview) {
			filePreview.innerHTML = '';
		}
	}

	popUp.addEventListener('mousedown', function (e) {
		if (!e.target.closest('.popup__content') && !popupSending.classList.contains('active')) {
			popupClose(popUp);
		}
	});
};