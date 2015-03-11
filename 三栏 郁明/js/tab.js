/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-25
 * Time: 下午3:39
 * To change this template use File | Settings | File Templates.
 */


$(function(){
    tab_manger();
});

function tab_manger(){ //tab管理方法

//    点击左侧功能树创建tab时绑定tab功能
    $('.left_menu li').click(function(e){

        $('.tab_list .index_tab').removeClass("index_tab_select").addClass("index_tab_unselect");
        if($('#'+$(this).attr("sign")).size()==0){
//        点击添加tab标签
        $('.tab_list').append("<div id='"+$(this).attr("sign")+"' class='index_tab_select index_tab'>"+$(this).text()+"<div class='tab_close' ></div></div>")

            //关闭时关闭标签和div
        $(".tab_close:last").on("click",function(){
            $(this).parent().remove();
            $(".tab_list").find(".index_tab").eq($(".tab_list .index_tab").size()-1).removeClass("index_tab_unselect").addClass("index_tab_select");
            $("#"+$(this).parent().attr("id")+"div").remove();
            $(".tab_to_div:last").show();    //关闭的前一个div显示

        });


            $('#'+$(this).attr("sign")).on("click",function(){
                $('.tab_list .index_tab').removeClass("index_tab_select").addClass("index_tab_unselect");
                $('#'+$(this).attr("id")).removeClass("index_tab_unselect").addClass("index_tab_select");
                $('#'+$(this).attr("id")+"div").show().siblings().hide();
            });

            //加载页面部分，在这里写ajax
            //        增加tab相对应的div
            $('#crdiv').append("<div class='tab_to_div' id='"+$(this).attr("sign")+"div' >ajax返回的页面</div>");

            //隐藏同级其他div
            $('#'+$(this).attr("sign")+"div").siblings().hide();
        }

        else{
            $('#'+$(this).attr("sign")).removeClass("index_tab_unselect");
            $('#'+$(this).attr("sign")).addClass("index_tab_select");
            $('#'+$(this).attr("sign")+"div").show().siblings().hide();
    }
});

//    首页tab绑定功能
$('#hometab').click(function(e){
    $('.tab_list .index_tab').removeClass("index_tab_select").addClass("index_tab_unselect");
        $(this).removeClass("index_tab_unselect").addClass("index_tab_select");
        $('#homepage').show().siblings().hide();
    })


}
