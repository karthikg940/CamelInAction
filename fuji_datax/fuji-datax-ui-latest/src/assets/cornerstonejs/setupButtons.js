function setupButtons(studyViewer) {
	// Get the button elements
	// var buttons = $(studyViewer).find('button');

	// Tool button event handlers that set the new active tool

	$j('#zoom-in-image').on('click touchstart', function() {
		var viewport = cornerstone.getViewport($j('#viewport')[0]);
		$j("#viewport").unbind();
		viewport.scale += 0.05;
		cornerstone.setViewport($j('#viewport')[0], viewport);
	});

	$j('#zoom-out-image').on('click touchstart', function() {
		var viewport = cornerstone.getViewport($j('#viewport')[0]);
		$j("#viewport").unbind();
		viewport.scale -= 0.05;
		cornerstone.setViewport($j('#viewport')[0], viewport);
	});
	
	$j('#viewportWrapper').on('mousewheel DOMMouseScroll', function(e) {
		var element = $j('#viewport').get(0);
		var viewport = cornerstone.getViewport(element);
		if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
			viewport.scale -= 0.05;
		} else {
			viewport.scale += 0.05;
		}
		cornerstone.setViewport(element, viewport);
		return false;
	});
	$j('#pan-image').on('click touchstart', function() {
		$j('#viewport').mousedown(function(e) {
			var element = $j('#viewport').get(0);
			var lastX = e.pageX;
			var lastY = e.pageY;

			$j(document).mousemove(function(e) {
				var deltaX = e.pageX - lastX, deltaY = e.pageY - lastY;
				lastX = e.pageX;
				lastY = e.pageY;

				var viewport = cornerstone.getViewport(element);
				viewport.translation.x += (deltaX / viewport.scale);
				viewport.translation.y += (deltaY / viewport.scale);
				cornerstone.setViewport(element, viewport);
			});

			$j(document).mouseup(function(e) {
				$j(document).unbind('mousemove');
				$j(document).unbind('mouseup');
			});
		});
	});
};