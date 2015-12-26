;(function($){
    var cookies=document.cookie.split(';'),
        result={},
        temp=[],
        key='',
        value='';
    for(var i=0,len=cookies.length;i<len;i++){
        temp=cookies[i].split('=');
        key=decodeURIComponent(temp[0]);
        value=decodeURIComponent(temp[1]);
        result[key]=value;
    }
   $.cookie=function(name,value,options){
       var attrs='';
       for(var p in options){
           attrs+=';'+p+'='+options[p];
       }
       if(!name){
           return result;
       }
       if(value){
           document.cookie+=name+"="+encodeURIComponent(value)+attrs;
       }
       else{
           return result[name];
       }
   };
   $.removeCookie=function(name){
       if(name){
           result[name]='';
       }
   };
   $.clearCookie=function(name){
       document.cookie='';
   }
})(jQuery);