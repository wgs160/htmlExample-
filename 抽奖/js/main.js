/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-21
 * Time: 下午1:26
 * To change this template use File | Settings | File Templates.
 */

var flag = true;
var loop = true;

$("#start").on("click",function(){
   if(loop){
       flag= true;
       start();
       loop = false;
   }
});

var m;
var n;
function start(){
    var s;
    var b;
    s = Math.floor(Math.random()*4);
    b = Math.floor(Math.random()*5);
//    $("tr").eq(m).find("td").eq(n).addClass("red");//每一行对象.removeClass("red");
//    m=s;
//    n=b;
    $("td").removeClass("red");
    $("tr").eq(s).find("td").eq(b).addClass("red");//每一行对象
    if(flag){
            setTimeout(function(){start();},50);
    }
}

function stop(){
    flag = false;
    loop = true;

}