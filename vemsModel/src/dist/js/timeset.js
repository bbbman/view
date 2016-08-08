

(function($){
   $.fn.extend({
   	 binDaterangepicker: function(options){
                           var defaults = {
                           	    isSingle: false,
                           	    todayIsMinDate: false,
								format: 'YYYY-MM-DD HH:mm',
								isTimePicker: true,
                                position:'left',
								dimensionVal:'',
								drops:'down'
							};
							options = $.extend(defaults, options);
							/*var ranges=new Array();*/
							var rangesOption={
							            '今日': [moment().startOf('day'), moment().endOf('day')],
						                '昨日': [moment().subtract(1,'days').startOf('day'), moment().subtract(1,'days').endOf('day')],
						                '前7日': [moment().subtract('days', 6).startOf('day'), moment().endOf('day')],
						                '后7日': [moment().startOf('day'), moment().add('days', 6).endOf('day')],
						                '前30日': [moment().subtract('days', 29).startOf('day'), moment().endOf('day')],
						                '后30日': [moment().startOf('day'),  moment().add('days',29).endOf('day')]
						    };
						     if(options.dimensionVal!=undefined&& options.dimensionVal!=""){
						     	switch(options.dimensionVal){
						     		case 'hour': rangesOption={
										            '此时': [moment().startOf('hour'), moment().endOf('hour')],
									                '前一小时': [moment().subtract(1,'hours').startOf('hour'), moment().subtract(1,'hours').endOf('hour')],
									                '最近6小时': [moment().subtract(5,'hours').startOf('hour'), moment().endOf('hour')],
									                '最近12小时': [moment().subtract(11,'hours').startOf('hour'), moment().endOf('hour')]
									            };break;
									case 'month':  rangesOption={
				                                    '当月': [moment().startOf('month'), moment().endOf('month')],
				                                    '上个月': [moment().subtract(1,'months').startOf('month'), moment().subtract(1,'months').endOf('month')],
				                                    '最近3个月': [moment().subtract(2,'months').startOf('month'), moment().endOf('month')],
				                                    '最近6个月': [moment().subtract(5,'months').startOf('month'), moment().endOf('month')]
				                                };break;
				                    case 'year': rangesOption={
				                                    '今年': [moment().startOf('year'), moment().endOf('year')],
				                                    '去年': [moment().subtract(1,'years').startOf('year'), moment().subtract(1,'years').endOf('year')],
				                                    '最近2年': [moment().subtract(1,'years').startOf('year'), moment().endOf('year')],
				                                    '最近5年': [moment().subtract(4,'years').startOf('year'), moment().endOf('year')]
				                                };break;
				                    default:     break;
						     	}
						     }
						    if(options.isSingle){
						     	if(options.dimensionVal=='day'){
						     		rangesOption={
							            '今日': [moment().startOf('day'), moment().endOf('day')],
						                '昨日': [moment().subtract(1,'days').startOf('day'), moment().subtract(1,'days').endOf('day')],
						                '7日前': [moment().subtract(6,'days').startOf('day'), moment().endOf('day')],
						                '30日前': [moment().subtract(29,'days').startOf('day'), moment().endOf('day')]
						            };
						     	}else{
						     		rangesOption={
							            '当月': [moment().startOf('month'), moment().endOf('month')],
						                '上个月': [moment().subtract(1,'months').startOf('month'), moment().subtract(1,'months').endOf('month')],
						                '3个月前': [moment().subtract(2,'months').startOf('month'), moment().endOf('month')],
						                '6个月前': [moment().subtract(5,'months').startOf('month'), moment().endOf('month')]
						            };
						     	}	
						     }
						     var minDate=999/01/01;
						     if(options.todayIsMinDate){
                                  rangesOption={
							            '今日': [moment().startOf('day'), moment().endOf('day')],
							            '明日': [moment().add(1,'days').startOf('day'), moment().add(1,'days').endOf('day')],
						                '一个星期': [moment().startOf('day'), moment().add(6,'days').endOf('day')],
						                '一个月': [moment().startOf('day'), moment().add(29,'days').endOf('day')]
						           };
                                  minDate=moment().startOf('day');
						     }
							return this.each(function() {
								var o=options;
							    var pos = $(this)[0].getBoundingClientRect();
							    if(pos.right>660){
                                  o.position="left";
							    }else{
							      o.position="right";
							    }
                                 $(this).daterangepicker({
							        // startDate: moment().startOf('day'),
							        //endDate: moment(),
							         minDate: minDate,    //最小时间
							        // maxDate: '99', //最大时间
						         /*   minDate: o.setMinDate,
						            maxDate: o.setMaxDate,*/
							        // maxDate: moment().endOf('day'), //最大时间
							        dateLimit: {
							            days: 999999
							        }, //起止时间的最大间隔
							        singleDatePicker: o.isSingle,//是否显示单个时间
							        showDropdowns: true,
							        showWeekNumbers: false, //是否显示第几周
							        timePicker:  o.isTimePicker, //是否显示小时和分钟
							        timePickerIncrement: 1, //时间的增量，单位为分钟
							        timePicker24Hour: true, //是否使用24小时制来显示时间
							        timePickerSeconds: false,
							        ranges: rangesOption,
							        buttonClasses: ['btn btn-default btn-sm'],
							        applyClass: 'btn-small btn-primary blue',
							        cancelClass: 'btn-small',
						            autoUpdateInput: false,
                                    opens: o.position,
                                    drops:o.drops,
							       // format: format, //控件中from和to 显示的日期格式
							       // separator: ' - ',
							        locale: {
						                format: o.format, //控件中from和to 显示的日期格式
						                separator: ' - ',
							            applyLabel: '确定',
							            cancelLabel: '取消',
							            fromLabel: '起始时间',
							            toLabel: '结束时间',
							            customRangeLabel: '自定义',
							            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
							            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
							                '七月', '八月', '九月', '十月', '十一月', '十二月'
							            ],
							            firstDay: 1
							        }
							    }, function(start, end, label) { //格式化日期显示框


							    });
	                            //确定
	                            if(o.isSingle){
	                                  $(this).on('apply.daterangepicker', function(ev, picker) {
									           $(this).val(picker.startDate.format(o.format));
									        });
	                            }else{
	                            	$(this).on('apply.daterangepicker', function(ev, picker) {
								             $(this).val(picker.startDate.format(o.format) + ' - ' + picker.endDate.format(o.format));
								        });
	                            }
	                              //取消
	                            $(this).on('cancel.daterangepicker', function(ev, picker) {
								      $(this).val('');
								  });

					      });
                   }
       });

})(jQuery);