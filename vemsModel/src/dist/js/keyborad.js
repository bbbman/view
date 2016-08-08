
(function($){
   $.fn.extend({
   	 binAKEkeyboard: function(options){
                           var defaults = {
                           	   bottom:'2%',
                           	   openkeyClass:"openKeyborad"
							};
							options = $.extend(defaults, options);
							if(localStorage.getItem("isOpenKeyborad")!=undefined&&localStorage.getItem("isOpenKeyborad")!=0){
					         $('.'+options.openkeyClass).prop("checked",'checked')
					        }
					        $('.'+options.openkeyClass).on('click',function(){
					            if($(this).prop("checked")){
					                localStorage.setItem("isOpenKeyborad",1);
					                $('.'+options.openkeyClass).prop("checked",'checked');
					            }else{
					                localStorage.setItem("isOpenKeyborad",0);
					                $('.'+options.openkeyClass).removeAttr("checked");
					                $('.ake-keyboard-wrap').addClass('hidden');
					            }
					        });
							var keyboardStr='<div class="ake-keyboard-wrap draggable hidden" style="position: fixed; bottom:'+options.bottom+';left: 50%;"><div class="ake-keyboard-box"><div class="ake-keyboard-body"><ul class="list-unstyled list-inline"><li name="京">京</li><li name="津">津</li><li name="粤">粤</li><li name="沪">沪</li><li name="浙">浙</li><li name="苏">苏</li><li name="湘">湘</li><li name="港">港</li><li name="澳">澳</li><li name="渝">渝</li><li name="云">云</li><li name="豫">豫</li><li name="皖">皖</li><li name="陕">陕</li><li name="桂">桂</li><li name="新">新</li><li name="青">青</li><li name="琼">琼</li><li name="闽">闽</li><li name="蒙">蒙</li><li name="辽">辽</li><li name="宁">宁</li><li name="鲁">鲁</li><li name="晋">晋</li><li name="吉">吉</li><li name="冀">冀</li><li name="黑">黑</li><li name="台">台</li><li name="甘">甘</li><li name="鄂">鄂</li><li name="赣">赣</li><li name="贵">贵</li><li name="川">川</li><li name="藏">藏</li><li name="WJ">WJ</li><li name="警">警</li><li name="学">学</li><li name="试">试</li><li name="挂">挂</li></ul><ul class="list-unstyled list-inline"><li>Q</li><li>W</li><li>E</li><li>R</li><li>T</li><li>Y</li><li>U</li><li>I</li><li>O</li><li>P</li><li>7</li><li>8</li><li>9</li><li>A</li><li>S</li><li>D</li><li>F</li><li>G</li><li>H</li><li>J</li><li>K</li><li>L</li><li class="backspace"></li><li>4</li><li>5</li><li>6</li><li>Z</li><li>X</li><li>C</li><li>V</li><li>B</li><li>N</li><li>M</li><li class="enter">确认</li><li>0</li><li>1</li><li>2</li><li>3</li></ul></div><div class="ake-keyboard-footer clearfix"><a class="keyboard-big-btn pull-right close-keyboard">关闭</a> <a class="keyboard-big-btn pull-right switch-keyboard">手动输入</a> <input type="hidden" value=""></div></div></div>';
							return this.each(function(){
								var Input=$(this);
								if($(".ake-keyboard-wrap").length<=0){
                                   $('body').append(keyboardStr);
                                    var Draggabilly = window.Draggabilly;
								   ( function() {
								        var draggie = new Draggabilly( '.draggable' ,{
								          // handle: '.handle',
								           // containment: true,
								           // grid: [ 20, 20 ],
								        });
								     })();
								}
                                Input.on('focus',function(){
                                	if(localStorage.getItem("isOpenKeyborad")!=undefined&&localStorage.getItem("isOpenKeyborad")!=0){
                                		$('.ake-keyboard-wrap input[type="hidden"]').val(Input.attr('id'));
                                	    $('.ake-keyboard-wrap').removeClass('hidden');
                                	}
                                	
                                });
                                var bindKeyboard=function(input){
                                	unbindKeyboard(input);
                                	$(input).on('focus',function(){
                                		if(localStorage.getItem("isOpenKeyborad")!=undefined&&localStorage.getItem("isOpenKeyborad")!=0){
		                                	$('.ake-keyboard-wrap input[type="hidden"]').val($(input).attr('id'));
		                                	$('.ake-keyboard-wrap').removeClass('hidden');
		                                }
                                   });
                                }
                                var unbindKeyboard=function(input){
                                	$(input).off('focus');
                                }
								 //AKE键盘
						         $('.ake-keyboard-wrap li').on('click',function(){
						            var This=$(this);
						            var keyboardInputId=$('.ake-keyboard-wrap input[type="hidden"]').val();
						            var keyboardInput=$('#'+keyboardInputId);
                                    var p=getPositionForInput(keyboardInput[0]);
                                       setCursorPosition(keyboardInput[0], p);
                                    var inputTxt=keyboardInput.val();
                                    var l=inputTxt.length;
						            var newStr="";   
						            if(This.hasClass('backspace')){
						                //回删
						               if(p==0){
						               	  newSttr=inputTxt;
						               }else if(p==l){
                                          newSttr=inputTxt.substring(0,p-1);
						               }else{
                                         newSttr=inputTxt.substring(0,p-1)+inputTxt.substring(p,inputTxt.length);
						               }
						               keyboardInput.val(newSttr);
						               setCursorPosition(keyboardInput[0], p-1);

						            }else if(This.hasClass('enter')){
						              //确认并关闭
						                if(keyboardInputId=="searchText"){
						                   $('#searchBtn').click();
						                }
						                if(keyboardInputId=="checkPlateWord"){
						                   $('#check-plate-modal .btn-sure').click();
						                }
						                $('.ake-keyboard-wrap').addClass('hidden'); 

						            }else{
						               if(p==0){
						               	  newSttr=This.text()+inputTxt;
						               }else if(p==l){
                                          newSttr=inputTxt+This.text();
						               }else{
                                         newSttr=inputTxt.substring(0,p)+This.text()+inputTxt.substring(p,inputTxt.length);
						               }
						               keyboardInput.val(newSttr);
						               setCursorPosition(keyboardInput[0], p+1);
						            }
						         });

						         //AKE键盘手动输入或关闭
						         $(".ake-keyboard-wrap .keyboard-big-btn").on('click',function(){
						            var keyboardInputId=$('.ake-keyboard-wrap input[type="hidden"]').val();
						            var keyboardInput=$('#'+keyboardInputId);
						            var p=getPositionForInput(keyboardInput[0]);
                                       setCursorPosition(keyboardInput[0], p);
						            if($(this).hasClass('switch-keyboard')){
						                // keyboardInput.removeAttr('readonly');
						                unbindKeyboard("#"+keyboardInputId);
						                // keyboardInput.focus();
						                // keyboardInput.click();
						                keyboardInput.on('blur',function(){
						                  bindKeyboard("#"+keyboardInputId); 
						                });
						            }
						            $('.ake-keyboard-wrap').addClass('hidden'); 

						         });
                               
					      });

                             //获取光标位置 
							//单行文本框 
							function getPositionForInput(ctrl){ 
								var CaretPos = 0; 
								if (document.selection) { // IE Support 
									ctrl.focus(); 
									var Sel = document.selection.createRange(); 
									Sel.moveStart('character', -ctrl.value.length); 
									CaretPos = Sel.text.length; 
								}else if(ctrl.selectionStart || ctrl.selectionStart == '0'){// Firefox support 
								   CaretPos = ctrl.selectionStart; 
								} 
								return CaretPos ; 
							} 
							//设置光标位置函数 
							function setCursorPosition(ctrl, pos){ 
								if(ctrl.setSelectionRange){ 
									ctrl.focus(); 
									ctrl.setSelectionRange(pos,pos); 
								} 
								else if (ctrl.createTextRange) { 
									var range = ctrl.createTextRange(); 
									range.collapse(true); 
									range.moveEnd('character', pos); 
									range.moveStart('character', pos); 
									range.select(); 
								} 
							} 


                   }
       });
 
})(jQuery);

