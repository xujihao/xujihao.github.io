(function(win,doc){
	var arr=[];
	var slice=arr.slice,
		push=arr.push,
		concat=arr.concat,
		indexOf=arr.indexOf;
	var class2type={};
	var toString=class2type.toString,
		hasOwn=class2type.hasOwnProperty;



	var miniJQ=function(selector,context){
		return  new miniJQ.fn.init(selector,context);
	};
	miniJQ.fn=miniJQ.prototype;
	init=miniJQ.fn.init=function(selector,context){
		console.log(this);
		this[0]=[];
		var elements=this[0];
		context=context?context:doc;
		if(miniJQ.fn.isString(context)){
			context=doc.querySelectorAll(context);
		}
		if(toString.call(context).slice(8,-1)==='NodeList'){
			context=slice.call(context);
		}
		if(context.length){
			context.forEach(function(ctx){
				elements=elements.concat(slice.call(ctx.querySelectorAll(selector)));
			});
		}
		else{
			elements=slice.call(doc.querySelectorAll(selector));
		}
		this[0]=elements;
		return this;
	};
	init.prototype=miniJQ.fn;
	miniJQ.extend=miniJQ.fn.extend=function(){
		var options,copy,
			target=arguments[0] || {},
			i=1,
			length=arguments.length;
		if(i===length){
			target=this;
			i--;
		}
		for(;i<length;i++){
			options=arguments[i] || {};
			for(var name in options){
				copy=options[name];
				target[name]=copy;
			}
		}
		return target;
	};
	miniJQ.extend({
		type:function(obj){
			return toString.call(obj).slice(8,-1);
		},
		isNumber:function(obj){
			return miniJQ.type(obj)==='Number';
		},
		isFunction:function(obj){
			return miniJQ.type(obj)==='Function';
		},
		isArray:function(obj){
			return miniJQ.type(obj)==='Array';
		},
		
		trim:function(text){
			var regTrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			return text==null?'':(text+'').replace(regTrim,'');
		},
		merge:function(first,second){
			var len=+second.length,
				j=0,
				i=first.length;
			for(;j<len;j++){
				first[i++]=second[j];
			}
			first.length=i;
			return first;
		}
	});


	var xhr=new XMLHttpRequest();

	miniJQ.extend({
		ajax:function(opts){
			var method=opts.method || 'get',
				data=opts.data || null,

				conType=opts.type || 'application/json',
				successFn=opts.success || function (){};
			var pairs=[];
			if(typeof opts==='object'){
				xhr.open(method,opts.url);
			}
			xhr.onreadystatechange=function(){
				if(xhr.readyState===4 && xhr.status===200){
					var type=xhr.getResponseHeader('Content-Type');
					if(type==='application/json'){
						successFn(JSON.parse(xhr.responseText));
					}
					else{
						successFn(xhr.responseText);
					}
				}
			};
			if(method==='post'){
				xhr.setRequestHeader('Content-Type',conType);
				if(conType==='application/json'){
					data=JSON.stringify(data);
				}
				else{
					for(var name in data){
						var value=data[name].toString();
						name=encodeURIComponent(name.replace('%20','+'));
						value=encodeURIComponent(value.replace('%20','+'));
						pairs.push(name+'='+value);
					}
					data=pairs.join('&');
				}
			}

			xhr.send(data);
		}
	});

	miniJQ.fn.extend({
		isString:function(obj){
			return miniJQ.type(obj)==='String';
		},
		on:function(type,fn){
			var that=this;
			this[0].forEach(function(ele){
				ele.addEventListener(type,fn);
			});
			return this;
		},
		bind:function(type,fn){
			return this.on(type,fn);
		},
		//一次只可添加一个class
		addClass:function(className){
			var curClass='';
			this[0].forEach(function(ele){
				curClass=ele.getAttribute('class') || '';
				curClass+=' '+className;
				curClass=curClass.replace(/^\s+/,'');
				ele.setAttribute('class',curClass);
			});
			return this;
		},
		//一次只可移除一个class
		removeClass:function(className){
			var classes,curValue,index;
			this[0].forEach(function(ele){
				curValue=ele.getAttribute('class');
				classes=curValue.match(/\S+/g);
				index=classes.indexOf(className);
				if(index>-1){
					classes.splice(index,1);
				}
				classes=classes.join(' ');
				ele.setAttribute('class',classes);
			});
			return this;
		},
		html:function(html){
			var ret=[];
			if(!html){
				this[0].forEach(function(ele){
					ret.push(ele.innerHTML);
				});
				return ret;
			}
			else{
				this[0].forEach(function(ele){
					ele.innerHTML=html;
				});
			}
			return this;
		},

		data:function(key,value){
			var ret=[];
			if(!value){
				this[0].forEach(function(ele){
					if(ele.dataset){
						ret.push(ele.dataset[key]);
					}
					else{
						ret.push(ele.getAttribute('data-'+key));
					}
				});
				return ret;
			}
			else{
				this[0].forEach(function(ele){
					if(ele.dataset){
						ele.dataset[key]=value;
					}
					else{
						ele.setAttribute('data-'+key,value);
					}
				});
			}
			return this;
		},
		removeData:function(key){
			this[0].forEach(function(ele){
				if(ele.dataset){
					delete ele.dataset[key];
				}
				else{
					ele.removeAttribute('data-'+key);
				}
			});
		}

	});

	window.miniJQ=window.$=miniJQ;
	console.log($.merge([1,2],[3,4,5]));
})(window,document);