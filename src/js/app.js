(function (w, d, $) {
	'use strict';

	function Slider (id) {
		this.slide = 0;

		this.slider = d.getElementById(id);
		
		this.btns = {
			prev: this.slider.querySelector('.btn--prev '),
			next: this.slider.querySelector('.btn--next ')
		};

		this.sliderList = this.slider.querySelector('.slider__list');
		this.slides = this.slider.querySelectorAll('.list__item');
		this.stepWidth = this.sliderList.offsetWidth;

	}

	Slider.prototype.move = function (direction) {
		var _self = this;

		if (+direction > 0) {
			_self.slide = (_self.slide >= _self.slides.length -1) ? 0 : _self.slide + 1;
		} else {
			_self.slide = (_self.slide <= 0) ? _self.slides.length - 1 : _self.slide - 1;
		}

		$(_self.sliderList)
		.stop(false, false)
		.animate({
			left: -1 * _self.slide * _self.stepWidth
		}, 500);
	};

	Slider.prototype.init = function () {
		var _self = this;

		_self.btns.prev.addEventListener('click', function () {
			_self.move(-1);
		}, false);

		_self.btns.next.addEventListener('click', function () {
			_self.move(1);
		}, false);
	};



	w.onload = function () {
		var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

		if (isSafari) {
			$('html').addClass('safari');
		}

		if (!!d.getElementById('js-slider')) {
			new Slider('js-slider').init();
		}
	};
})(window, document, jQuery);