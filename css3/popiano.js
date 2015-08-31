$(function(){
	var	ctn=$('.m-slider ul'),
		sliders=ctn.find('.slider'),
		s_height=sliders.height(),
		s_width=sliders.width(),
		len=sliders.length;
	ctn.css('width',s_width*len);
	var circles='',
		navigation=ctn.find('.navigation');
	for(var i=0;i<len;i++){
		circles+='<span class="circle" data-index="'+i+'"></span>'
	}
	navigation.append(circles);
	navigation.find('.circle').first().addClass('active');

	navigation.delegate('.circle','click',function(){
		var self=$(this),
			index=self.data('index');
		self.siblings().removeClass('active');
		self.addClass('active');
		ctn.animate({marginLeft:-index*900},1000);
	});
})