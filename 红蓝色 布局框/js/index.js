
/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-4-25
 * Time: 上午9:49
 * To change this template use File | Settings | File Templates.
 */
/*

    $(window).resize(function() {
        alert(1);
    });
*/

$(function(){
    $(".left-menu > li > div ").click(function(){
      $(this).siblings().slideToggle();
    });
})
