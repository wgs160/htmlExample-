
window.onload = function () {

    function User(){
        this.B = "";
    }
    function AdminUser() {
        this.level = 1;
    }

    AdminUser.prototype = new User();
    var A = new AdminUser();
    alert(A.hasOwnProperty('B'));

}

/*if(e && e.stopPropagation){
 //因此它支持W3C的stopPropation()方法
 e.stopPropagation();
 }
 else
 {
 //否则,我们得使用IE的方式来取消事件冒泡
 window.event.cancelBubble = true;
 }*/
