/**
 * Created by ning on 2015/2/28.
 */


/**
 * 时间
 * @param format
 * @returns {*}
 */
Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth() + 1, // month
        "d+" : this.getDate(), // day
        "h+" : this.getHours(), // hour
        "m+" : this.getMinutes(), // minute
        "s+" : this.getSeconds(), // second
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" : this.getMilliseconds()
        // millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }

    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

/*
 *-----------------------------------
 * 字符串去两端空格;
 *-----------------------------------
 */
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g,"");
}

/**
 *   ajax需要拦截屏幕操作时调用
 */
function ajaxFilter(option){
    var loadDiv;
    var defaults = {
        url:'',
        data:{},
        success:function(result){}
    };
    var opts = $.extend(defaults,option);
    $.ajax({
        url:opts.url,
        type:'post',
        dataType:'json',
        data:opts.data,
        async:false,
        beforeSend:function(xhr){
            loadDiv = layer.load($.i18n.prop('A-isReading'));
        },
        complete:function(xhr,ts){
            layer.close(loadDiv);
        },
        success:function(result){
            opts.success(result);

        }
    });
}

/**
 * by qiu
 * time 2015/2/13
 * @param obj 判断的对象
 * @returns {string}范围  ：'undefined' “string” 'number' 'boolean'  'function'  'Object'  'Date' 'Array'
*/
function getType(obj){
    if(obj==null){
        return "null";
    }
    //先判断 可以区分出object的类型
    var t= typeof obj;
    if(t!="object"){
        return t;
    }
    //再判断不能区分object的类型
    //获取[object xxxx]的XXXX部分
    var x = Object.prototype.toString.call(obj);
    x = x.slice(8,x.length-1);
    if(x!="Object"){
        return x;
    }
    if(x=="Object"){
        return x;
    }
    return "unkonw type";
}

//获取今天的日期 显示格式为2009-06-12
function getToday(){
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-";
    if(day < 10)
        clock += "0";
    clock += day;
    return(clock);
}

//获取 当月第一天 显示格式为2009-06-12
function getMonth(){
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-01";
    return(clock);
}

/**
 *
 * @Description: cookie新增方法
 * @author:裘冠宁
 * @date: 2014-12-30 上午10:56:10
 * @modify: 修改记录
 * @param name  key
 * @param value  值
 * @param expiresHours  小时  ,空和0时不设定过期时间，浏览器关闭即消失
 */
function addCookie(name,value,expiresHours){
    var cookieString=name+"="+escape(value);
    //判断是否设置过期时间
    if(expiresHours>0){
        var date=new Date();
        date.setTime(date.getTime()+expiresHours*3600*1000);
        cookieString=cookieString+"; expires="+date.toGMTString();
    }
    document.cookie=cookieString;
}


/**
 *
 * @Description: 获取指定cookie值 ，如不存在则返回空
 * @author:裘冠宁
 * @date: 2014-12-30 上午10:57:52
 * @modify: 修改记录
 * @param name   key
 * @returns
 */
function getCookie(name){
    var strCookie=document.cookie;
    var arrCookie=strCookie.split("; ");
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        if(arr[0]==name)return unescape(arr[1]);
    }
    return "";
}
/**
 *
 * @Description: 删除指定key的 cookie
 * @author:裘冠宁
 * @date: 2014-12-30 上午11:00:14
 * @modify: 修改记录
 * @param name  key
 */

function deleteCookie(name){
    var date=new Date();
    date.setTime(date.getTime()-10000);
    document.cookie=name+"=v; expires="+date.toGMTString();
}

/**
 * 阻止事件冒泡 传递事件对象
 * @param event
 */
function stopBubble(event) {
    if (event && event.stopPropagation) {
        //因此它支持W3C的stopPropation()方法
        event.stopPropagation();
    }
    else {
        //否则,我们得使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
    }
}