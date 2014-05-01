import clean from 'utils/clean';

export default function draggable ( viewBox ) {
	var svg,
		dragging,
		lastX,
		lastY,
		zoom,
		activeFingers = [],
		fingerById = {};

	svg = viewBox.svg;

	function mousedownHandler ( event ) {
		// we don't care about right-clicks etc
		if ( event.which !== undefined && event.which !== 1 ) return;

		if ( viewBox._dirty ) clean( viewBox );

		zoom = viewBox.getZoom();
		lastX = event.clientX;
		lastY = event.clientY;

		dragging = true;

		window.addEventListener( 'mousemove', mousemoveHandler, false );
		window.addEventListener( 'mouseup', mouseupHandler, false );
	}

	function mousemoveHandler ( event ) {
		if ( !dragging ) return;

		viewBox.pan( ( event.clientX - lastX ), ( event.clientY - lastY ) );

		lastX = event.clientX;
		lastY = event.clientY;
	}

	function mouseupHandler ( event ) {
		dragging = false;

		window.removeEventListener( 'mousemove', mousemoveHandler, false );
		window.removeEventListener( 'mouseup', mouseupHandler, false );
	}

	svg.addEventListener( 'mousedown', mousedownHandler, false );
}
