$(function() {


    (function() {


        //首页active状态切换
        $(".ake-link-item").on("click", function() {
            $(".ake-link-item").parent().removeClass("active");
            $(this).parent().addClass("active");
            return true;
        });

        //首页初始载入显示第一个页面
        if ($("#ake-index-iframe").attr("src") == "") {
            $(".sidebar-menu li").first().addClass("active");
            var first_url = $(".sidebar-menu li").first().find("a").attr("href");
            $("#ake-index-iframe").attr("src", first_url);
        }
        // 个人信息切换
        $(".user-menu-item").on("click", function() {
            var index = $(this).index();
            $(".user-menu-item").removeClass("active");
            $(this).addClass("active");
            $(".tab-item").eq(index).show().siblings().hide();
            if (index == 0) {
                $(".user-info-detail").show();
                $(".user-info-edit").hide();
            }
        });
        $("#edit-user-info").on("click", function() {
            $(".user-info-detail").hide();
            $(".user-info-edit").show();
        });
        // 个人信息显示隐藏
        $("#show-user-box").on("click", function(e) {
            e.stopPropagation();
            if (!$(".menu-con").is(":visible")) {
                $(".menu-con-overlay").show();
                $(".menu-con").show();
            } else {
                $(".menu-con").hide();
                $('.menu-con-overlay').hide();
            };
        });


        $('.menu-con-overlay').on("click",function(e) {
            var _con = $(this).next(".menu-con");
            if (!_con.is(e.target) && _con.has(e.target).length === 0) {
                if (_con.is(":visible")) {
                    _con.hide();
                    $('.menu-con-overlay').hide();
                }
            }
        });

    })();

});
