var dragSrcImg = null;

function handleDragStart(e) {
  this.classList.add('over');

  var style = this.currentStyle || window.getComputedStyle(this, false);

	e.dataTransfer.effectAllowed = 'copy';  
	e.dataTransfer.setData('text/html', style.backgroundImage);
  
}

function handleDragEnd(e) {
  // this/e.target is the source node
  pics.forEach((pic) => {
    pic.classList.remove('over');
  });
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  if (e.dataTransfer) {
  	e.dataTransfer.dropEffect = 'copy';  // See the section on the DataTransfer object.
  }  

  return false;
}

function handleDrop(e) {
	if (e.stopPropagation) {
	    e.stopPropagation(); // Stops some browsers from redirecting.
	}
	console.log('DROPPING');

	this.style.backgroundImage = e.dataTransfer.getData('text/html');
  	return false;	
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}


function handleTouchStart(e) {
	e.preventDefault();
  this.classList.add('over');

  var style = this.currentStyle || window.getComputedStyle(this, false);
  dragSrcImg = style.backgroundImage;
 
}

function handleTouchMove(e) {
	var endTarget = document.elementFromPoint(
      e.changedTouches[0].pageX,
      e.changedTouches[0].pageY
  );	

	collagePics.forEach((pic) => {
    pic.classList.remove('over');
  });

  if (endTarget.classList.contains('collagepic')) {
  	endTarget.classList.add('over');
  }
 
}

function handleTouchEnd(e) {

	if (e.stopPropagation) {
	    e.stopPropagation(); // Stops some browsers from redirecting.
	}

	pics.forEach((pic) => {
    pic.classList.remove('over');
  });

	var endTarget = document.elementFromPoint(
      e.changedTouches[0].pageX,
      e.changedTouches[0].pageY
  );	

	if (endTarget.classList.contains('collagepic')) {
  	endTarget.style.backgroundImage = dragSrcImg;
  }
  return false;	 
}



var galleryPics = Array.from(document.getElementById("gallery").getElementsByClassName("pic"));
var collagePics = Array.from(document.getElementById("collage").getElementsByClassName("pic"));
var pics = Array.from(document.getElementsByClassName("pic"));

galleryPics.forEach((pic) => {
	pic.addEventListener('dragstart', handleDragStart, false);
	pic.addEventListener('touchstart', handleTouchStart, false);
	pic.addEventListener("touchend", handleTouchEnd, false);
	pic.addEventListener("touchmove", handleTouchMove, false);
});

collagePics.forEach((pic) => {
	pic.addEventListener('dragover', handleDragOver, false);
	pic.addEventListener('dragenter', handleDragEnter, false);
	pic.addEventListener('dragleave', handleDragLeave, false);
});

pics.forEach((pic) => {
	pic.addEventListener('dragend', handleDragEnd, false);
	pic.addEventListener('drop', handleDrop, false);
});




  // el.addEventListener("touchstart", handleStart, false);
  // el.addEventListener("touchend", handleEnd, false);
  // el.addEventListener("touchcancel", handleCancel, false);
  // el.addEventListener("touchleave", handleEnd, false);
  // el.addEventListener("touchmove", handleMove, false);