const $ = require('jquery');
const remote = require('remote');

var win = remote.getCurrentWindow();
var $dimensionsContainer = $('#dimensions');

function getWindowDimensions() {
	var bounds = win.getBounds();
	return `${bounds.width} x ${bounds.height}`;
}

// Calculate window dimensions and create element
$dimensionsContainer.html(getWindowDimensions());

$(window).resize(function() {
	console.log('[NOTICE] Window resized.');
  $dimensionsContainer.html(getWindowDimensions());
});

$dimensionsContainer.keyup(function (event) {
	if (event.keyCode !== 13) {
		return;
	}

	event.preventDefault();

	var content = $(this).html().split('x', 2);
	var int1 = parseInt(content[0].replace(/[^\d.]/g, ''));
	var int2 = parseInt(content[1].replace(/[^\d.]/g, ''));

	win.setSize(int1, int2);
	console.log('[NOTICE] Dimension input changed.');
});

$('#reset').click(function () {
	win.setSize(960, 540);
});

$('.minimize').click(function () {
	win.minimize();
});

$('.maximize').click(function () {
	if (win.isMaximized()) {
		win.unmaximize();
	} else {
		win.maximize();
	}
});

$('.close').click(function () {
	win.close();
});
