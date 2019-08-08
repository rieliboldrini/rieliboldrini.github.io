window.onload = function () {
	
	$('.post-body p img').parent('p').addClass('post-body-image');
	$('.hamburger').click(function(){
  	$('.hamburger').toggleClass('is-active');
  	$('.menu-desk').toggleClass('is-active');
	});

  function isEmpty( el ){
      return !$.trim(el.html())
  }
  if (isEmpty($('.tags p'))) {
    $('.tags').hide();
  }

	//document.getElementsByTagName("img")[0].parentNode;

	var parallaxBox = document.getElementById ( 'main' );
	var c1left = document.getElementById ( 'foto' ).offsetLeft,
	c1top = document.getElementById ( 'foto' ).offsetTop,
	c2left = document.getElementById ( 'shape' ).offsetLeft,
	c2top = document.getElementById ( 'shape' ).offsetTop,
	c3left = document.getElementById ( 'element1' ).offsetLeft,
	c3top = document.getElementById ( 'element1' ).offsetTop,
	c4left = document.getElementById ( 'element2' ).offsetLeft,
	c4top = document.getElementById ( 'element2' ).offsetTop;

	parallaxBox.onmousemove = function ( event ) {
		event = event || window.event;
		var x = event.clientX - parallaxBox.offsetLeft,
		y = event.clientY - parallaxBox.offsetTop;
		
		mouseParallax ( 'foto', c1left, c1top, x, y, 10 );
		mouseParallax ( 'shape', c2left, c2top, x, y, 5 );
		mouseParallax ( 'element1', c3left, c3top, x, y, 30 );
		mouseParallax ( 'element2', c4left, c4top, x, y, 65 );
	}
}

function mouseParallax ( id, left, top, mouseX, mouseY, speed ) {
	var obj = document.getElementById ( id );
	var parentObj = obj.parentNode,
	containerWidth = parseInt( parentObj.offsetWidth ),
	containerHeight = parseInt( parentObj.offsetHeight );
	obj.style.left = left - ( ( ( mouseX - ( parseInt( obj.offsetWidth ) / 2 + left ) ) / containerWidth ) * speed ) + 'px';
	obj.style.top = top - ( ( ( mouseY - ( parseInt( obj.offsetHeight ) / 2 + top ) ) / containerHeight ) * speed ) + 'px';
}

$(function() {
  $('.scroll-down').click (function() {
    $('html, body').animate({scrollTop: $('#work').offset().top }, 'slow');
    return false;
  });
});	