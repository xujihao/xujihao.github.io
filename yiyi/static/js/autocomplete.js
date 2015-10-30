;(function($){
	$.fn.autoComplete=function(options){
		var opt=$.extend({
			dataCtn:'.data-lists',
			input:'.form-control',
			root:''
		},options);

		function AutoComplete(_this){
			this.$dataLists=$(opt.dataCtn);
			this.$input=$(opt.input);
			this.init();
		}
		AutoComplete.prototype.generateLists=function(data,filter){
			var html='',results=[];
			results=data.filter(function(d){
				if(opt.valueField){
					d=d[opt.valueField];
				}
				d+='';
				return d.indexOf(filter)!=-1;
			});
			for(var i=0,len=results.length;i<len;i++){
				if(!opt.valueField){
					html+='<li class="list">'+results[i]+'</li>';
				}
				else{
					html+='<li class="list" data-value="'+results[i][opt.valueField]+'">'+results[i][opt.titleField]+'</li>';
				}
			}
			this.$dataLists.html(html);
		};
		AutoComplete.prototype.init=function(){
			var self=this;
			self.$input.on('keyup',function(){
				var input=this;
				if(opt.url){
					$.ajax({
						url:opt.url+input.value,
						type:'get',
						success:function(data){
							root=opt.root.split('.');
							for(var i=0;i<root.length;i++){
								data=data[root[i]];
							}
							console.log(data);
							self.generateLists(data,input.value);
						}
					});
				}
				if(opt.datas){
					self.generateLists(opt.datas,input.value);
				}
			});

			self.$dataLists.on('click','.list',function(){
				var value=$(this).data('value') || $(this).text();
				self.$input.val(value);
				$(this).parent().html('');
			});
		};

		return this.each(function(){
			new AutoComplete(this);
		});
	};
})(jQuery);