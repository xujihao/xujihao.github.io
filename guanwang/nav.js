$(function(){
	$('.h-section .subnav>ul>li').bind('click',function(){
		var index=$('.h-section .subnav>ul>li').index($(this));
		var contents=$('.container>.content');
		contents.removeClass('active');
		contents.eq(index).addClass('active');

	});

	$('.arrow.left').bind('click',function(){
		var self=$(this);
		var sliders=$('.slider-ctn>.slider'),
			atvSlider=$('.slider-ctn>.slider.active'),
			index=sliders.index(atvSlider)+1,
			nxtSlider=$('.slider-ctn>.slider').eq(index);
		if(index<sliders.length){
			nxtSlider.css({left:'2000px'});
			atvSlider.animate({
				left:'-2000px',
				opacity:0
			},500,function(){
				atvSlider.removeClass('active');
			});
			nxtSlider.animate({
				left:'115px',
				opacity:1
			},500,function(){
				nxtSlider.addClass('active');
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
				left:'2000px',
				opacity:0
			},500,function(){
				atvSlider.removeClass('active');
			});
			prevSlider.animate({
				left:'115px',
				opacity:1
			},500,function(){
				prevSlider.addClass('active');
				console.log(index);
				if(index===0){
					self.css('color','rgba(0,0,0,0.5)');
				}
			});
			$('.arrow.left').css('color','#000');
		}
	});
});