$(function(){
	$(window).scroll(function(){
		var win=$(window),
			header=$('.header');
		if(win.scrollTop()>120){
			header.addClass('fixed');
			$('.container').css('marginTop','405px');
		}
		else if(win.scrollTop()===0){
			header.removeClass('fixed');
			$('.container').css('marginTop','0px');
		}
	});
	$('.h-section .subnav>ul>li').bind('click',function(){
		var index=$('.h-section ul li').index($(this)),
			contents=$('.container .content'),
			height=contents.eq(index).position().top+120;
		height=height<120?120:height;
		$('.header').addClass('fixed');
		$('.container').css('marginTop','405px');
		$('html,body').animate({scrollTop:height},200,'linear');
	});

	$('.arrow.left').bind('click',function(){
		var self=$(this);
		var sliders=$('.slider-ctn .slider'),
			atvSlider=$('.slider-ctn .slider.active'),
			index=sliders.index(atvSlider)+1,
			nxtSlider=$('.slider-ctn .slider').eq(index);
		if(index<sliders.length){
			nxtSlider.css('left','2000px');
			atvSlider.animate({
				left:'-2000px'
			},600,function(){
				atvSlider.removeClass('active');
				nxtSlider.addClass('active');
			});
			nxtSlider.animate({
				left:'115px'
			},1200,function(){
				if(index==sliders.length-1){
					self.css('color','rgba(0,0,0,0.5)');
				}
			});
			$('.arrow.right').css('color','#000');
		}
	});
	$('.arrow.right').bind('click',function(){
		var self=$(this);
		var sliders=$('.slider-ctn>.slider'),
			atvSlider=$('.slider-ctn>.slider.active'),
			index=sliders.index(atvSlider)-1,
			prevSlider=$('.slider-ctn>.slider').eq(index);
		if(index>=0){
			atvSlider.animate({
				left:'2000px'
			},500,function(){
				atvSlider.removeClass('active');
				prevSlider.addClass('active');
			});
			prevSlider.animate({
				left:'115px'
			},1000,function(){
				if(index===0){
					self.css('color','rgba(0,0,0,0.5)');
				}
			});
			$('.arrow.left').css('color','#000');
		}
	});
});