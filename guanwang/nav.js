$(function(){
	$('.nav>ul>li').bind('click',function(){
		var index=$('.nav>ul>li').index($(this));
		var contents=$('.container>.content');
		contents.removeClass('active');
		contents.eq(index).addClass('active');

	});
});