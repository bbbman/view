$(document).ready(function() {
    $.ajaxSetup({
        global: true,
        complete: function(XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.getResponseHeader("unlogined") == 'unlogined') {
                window.top.window.location.href = '../login.action';
            }
        }
    });
});

function testPlate(str) {
    //普通车牌
    var exgDefault = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
    //武警车牌
    var exgWJ = /^WJ[A-Z]{1}[A-Z_0-9]{5}$/;
    //警挂学港澳车牌
    var exgWei = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}[警挂学港澳]{1}$/;
    var plate_arr = [];
    var first, tail, middle;
    if (str !== 'undefined') {
        if (exgDefault.test(str)) {
            first = str.slice(0, 1);
            tail = str.slice(1, str.length);
            plate_arr.push(first);
            plate_arr.push(tail);
            return plate_arr;
        } else if (exgWJ.test(str)) {
            first = str.slice(0, 2);
            tail = str.slice(2, str.length);
            plate_arr.push(first);
            plate_arr.push(tail);
            return plate_arr;
        } else if (exgWei.test(str)) {
            first = str.slice(0, 1);
            middle = str.slice(1, str.length - 1);
            tail = str.slice(str.length - 1, str.length);
            plate_arr.push(first);
            plate_arr.push(middle);
            plate_arr.push(tail);
            return plate_arr;
        } else {
            return plate_arr;
        }
    }
};




var isTipsModalLoaded = false;

function showAffirmModal(headTxt, bodyTxt, sureFn) {
        if (isTipsModalLoaded) return;

        isTipsModalLoaded = true;

        var tipsModal = $('#tips-modal');
        if ($(tipsModal).length == 0) {
            var modalStr = '<div class="modal fade  tips-modal" id="tips-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            modalStr = modalStr + '<h4 class="modal-title text-center" id="exampleModalLabel">' + headTxt + '</h4></div>';
            modalStr = modalStr + '<div class="modal-body"><p>' + bodyTxt + '</p></div>';
            modalStr = modalStr + '<div class="modal-footer"><button type="button" class="btn  btn-default btn-flat pull-left" data-dismiss="modal">取消</button><button type="button" class="btn  btn-primary btn-flat pull-right" id="sureBtn">确认</button></div></div></div></div>';

            tipsModal = $(modalStr);

            $('body').append(tipsModal);
        } else {
            $(tipsModal).find('#exampleModalLabel').html(headTxt);
            $(tipsModal).find('.modal-body').html('<p>' + bodyTxt + '</p>');
        }

        $('#sureBtn').off('click');
        $(tipsModal).off('hidden.bs.modal');

        $(tipsModal).on('hidden.bs.modal', function(e) {
            isTipsModalLoaded = false;
        });

        $(tipsModal).modal('show');

        $('#sureBtn').on('click', function() {
            $(tipsModal).modal('hide');
            if (typeof sureFn === "function") {
                sureFn();
            }
        });

    }
    //计算时间差
    //var a = '2015-12-30 14:40:40';
    //var b = '2015-12-30 14:10:30';

function timeDiff(maxTime, minTime) {
    var maxTime = new Date(maxTime.replace(/-/g, '/'));
    var minTime = new Date(minTime.replace(/-/g, '/'));
    var date_diff = maxTime.getTime() - minTime.getTime(); //相差毫秒数

    var days = Math.floor(date_diff / (24 * 3600 * 1000));

    //计算出小时数
    var leave1 = date_diff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));

    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);

    return (days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒")
};

//查看大图
function showImgDetail(src) {
        var imgModal_html = '<div class="modal fade imgDetail-modal " id="look-bigPlate-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">' + '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '<h4 class="modal-title text-center" id="exampleModalLabel">大图片</h4></div>' + '<div class="modal-body"><div class="big-plate-img"><img src="' + src + '" alt="车牌大图" style="width:100%;">' + '</div></div><div class="modal-footer"> <button type="button" class="btn  btn-default btn-flat  pull-right imgModal-close">关闭</button>' + '</div></div></div></div>';
        $("body").append(imgModal_html);
        $('#look-bigPlate-modal').modal('show');
        $(".imgModal-close").on("click", function() {
            $(this).closest("#look-bigPlate-modal").modal("hide");
        });
        $('#look-bigPlate-modal').on('hidden.bs.modal', function(e) {
            $('#look-bigPlate-modal').remove();
        })
    }
    // window.top.showImgDetail("src")
    //loading
    // window.top.showImgDetail("src")
var layLoading_index = null;

function loading(msg) {
        if (msg) {
            loadingHasTextShow(msg);
        } else {
            layLoading_index = layer.load(2, {
                shade: [0.2, '#fff'] //0.1透明度的白色背景
            });
        }
    }
    //top.window.loading('数据加载中')
    //alert(layLoading_index);
function closeLoading() {
    if (layLoading_index != null) {
        layer.close(layLoading_index);
        layLoading_index = null;
    }
    if ($(".loading-text").length) {
        loadingHasTextHide();
    }
}
//closeLoading()


//成功提示
function tipSuccess(msg,func) {
    layer.msg(msg, {
        icon: 1,
        time: 2000
    }, func);
}
//错误及警告提示
function tipError(msg,func) {
    layer.msg(msg, {
        icon: 2,
        time: 3000
    }, func);
}



function warningMsg(warningMsg, fn) {
        layer.alert(warningMsg, {
            icon: 5,
            closeBtn: 1
        }, function(index) {
            layer.close(index);
            if (typeof fn === "function") {
                fn();
            }
        });
    }
   //top.window.warningMsg("dsnfskdlfnl");fn可选

//公共提示弹框

var isGlobalTipsLoaded = false;
var globalTipsIntervalID = null;

function globalTipsModal(title, tips, time, fn) {
    if (isGlobalTipsLoaded) return;

    isGlobalTipsLoaded = true;

    var globalTips = $(".globalTips-modal");
    if ($(".globalTips-modal").length == 0) {
        globalTips = $('<div class="modal fade bs-example-modal-sm globalTips-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">' + '<div class="modal-dialog modal-sm">' + '<div class="modal-content">' + '<div class="modal-header"><h4 class="modal-title">' + title + '</h4></div>' +
            '<div class="modal-body"><p>' + tips + '</p></div>' + '</div></div></div>');
        $('body').append(globalTips);
    } else {
        globalTips.find('.modal-title').html(title);
        globalTips.find('.modal-body').html('<p>' + tips + '</p>');
    }

    $(globalTips).off('hidden.bs.modal');

    $(globalTips).on('hidden.bs.modal', function(e) {
        isGlobalTipsLoaded = false;
        if (typeof fn === "function") {
            fn();
        }
    });

    if (globalTipsIntervalID != null) {
        clearTimeout(globalTipsIntervalID);
    }

    $(globalTips).modal('show');

    globalTipsIntervalID = setTimeout(function() {
        $(globalTips).modal('hide');
    }, time);

};
// 使用方法 title,tips,time必填；fn可选
// window.top.globalTipsModal("title","tips" , 1200, fn);

//有文字的加载动画

function loadingHasTextShow(msg) {
    $('.loading-text').remove();
    var html = '<div class="loading-text"><div class="loading-overlay"></div><div class="loading-con"><div class="loading-con-inner"><div class="loading-line loading-position0"></div><div class="loading-line loading-position1"></div><div class="loading-line loading-position2"></div><div class="loading-line loading-position3"></div><div class="loading-line loading-position4"></div><div class="loading-line loading-position5"></div><div class="loading-line loading-position6"></div><div class="loading-line loading-position7"></div><div class="loading-line loading-position8"></div><div class="loading-line loading-position9"></div><div class="loading-line loading-position10"></div><div class="loading-line loading-position11"></div></div><p class="loading-info">' + msg + '</p></div></div>';
    $('body').append(html);
};
// top.window.loadingHasTextShow();
function loadingHasTextHide() {
        $('.loading-text').remove();
    }
    // top.window.loadingHasTextHide();
$(function() {
    //页面头部active状态切换
    $(".con-nav-item a").on("click", function() {
        $(".con-nav-item").removeClass("active");
        $(this).closest(".con-nav-item").addClass("active");
        //return false;
    });

    //初始载入显示第一个页面
    if ($("#ake-iframe").attr("src") == "") {
        $(".con-nav-item").first().addClass("active");
        var first_url = $(".con-nav-item").first().find("a").attr("href");
        $("#ake-iframe").attr("src", first_url);
    }
});

function imgNofind(){
   var img=event.srcElement; 
   img.src="dist/images/no_pic.jpg"; 
   if($(img).attr('jqimg')!=undefined){
      $(img).attr('jqimg',"dist/images/no_pic.jpg")
   }
   // img.onerror=null; //控制不要一直跳动 
}