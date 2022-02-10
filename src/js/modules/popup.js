
export function popUp() {
	const popupLinks = document.querySelectorAll('.popup-link');
	const popupCloseIcon = document.querySelectorAll('.close-popup');
	const popUp = document.querySelector('.popup');
	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener("click", function (e) {
				let popupName = popupLink.getAttribute('href').replace('#', ''); // можно заменить на dataset
				let curentPopup = document.getElementById(popupName);
				let bodyLock = document.getElementById('body');
				curentPopup.classList.add('open');
				bodyLock.classList.add('lock');
				curentPopup.addEventListener("click", function (e) {
					if (!e.target.closest('.popup__content')) {
						popupClose(e.target.closest('.popup'));
					}
				});
				e.preventDefault();
			});
		}
	}

	if (popUp.classList.contains('open')) {
		popUp.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}

	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}

	function popupClose(popupActive) {
		popupActive.classList.remove('open');
		let bodyLock = document.getElementById('body');
		bodyLock.classList.remove("lock");
		function removeClassSend() {
			document.querySelector('.confirm').classList.remove("send");
			document.querySelector('.popup__title').classList.remove("send");
			document.querySelector('.popup__text').classList.remove("send");
		}
		setTimeout(removeClassSend, 2000);
	}


	(function () {
		// проверяем поддержку
		if (!Element.prototype.closest) {
			// реализуем
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		// проверяем поддержку
		if (!Element.prototype.matches) {
			// определяем свойство
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();

}