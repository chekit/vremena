(function () {
	'use strict';

	function Slider (id) {
		this.id = id;
	}

	Slider.prototype.init = function () {
		console.info('ready ', this.id);
	}

	window.onload = function () {
		new Slider('js-slider').init()
	};
})();