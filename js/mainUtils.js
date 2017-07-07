/**
 * Created by 15031493 on 2015/8/10.
 */

var qUtils = qUtils || {};

//扩展数组，获得字符串的下标
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
//扩展数组，删除该数据
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


/**
 * 扩展时间格式
 * @param format   例：new date('yyyy-MM-dd hh:mm:ss')
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

/**
 * 扩展string 字符串去两端空格;
 * @returns {string}
 */
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g,"");
}

/**
 * 添加事件对象
 * @param elm 目标
 * @param evType 事件名称
 * @param fn 执行的函数
 * @param useCapture false起泡，true捕获
 * @returns {*}
 */
qUtils.addEvent = function(elm, evType, fn, useCapture) {
    var useCapture =  useCapture || false;
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);//DOM2.0
        return true;
    }
    else if (elm.attachEvent) {
        var r = elm.attachEvent('on' + evType, fn);//IE5+
        return r;
    }
    else {
        elm['on' + evType] = fn;//DOM 0
    }
}

/**
 *  判断是否有class属性
 * @param _object 目标
 * @param _clsname
 * @returns {boolean}
 */
qUtils.hasClass = function (_object,_clsname){
    var _clsname = _clsname.replace(".","");
    var _sCls = " "+(_object.className)+" ";
    return (_sCls.indexOf(" "+_clsname+" ") != -1) ? true : false;
}

/**
 * 去class头尾空格
 * @param _str
 * @returns {string}
 */
qUtils.toClass = function (_str){
    var _str = _str.toString();
    _str = _str.replace(/(^\s*)|(\s*$)/g,"");//去头去尾空格
    _str = _str.replace(/\s{2,}/g," "); //替换2个以上的空格为1个
    return _str;
}

/**
 * 添加class
 * @param _object
 * @param _clsname
 */
qUtils.addClass = function (_object,_clsname){
    var _clsname = _clsname.replace(".","");
    if(!hasClass(_object,_clsname)){
        _object.className = toClass(_object.className+(" "+_clsname));
    }
}

/**
 * 删除class
 * @param _object
 * @param _clsname
 */
qUtils.delClass = function (_object,_clsname){
    var _clsname = _clsname.replace(".","");
    if(hasClass(_object,_clsname)){
        _object.className = toClass(_object.className.replace(new RegExp("(?:^|\\s)"+_clsname+"(?=\\s|$)","g")," "));//
    }
}
/**
 * 遍历数组
 * @param _objects 遍历的对象数组
 * @param _fn (elem,index):带两参数，参数1当前坐标的对象，参数2为当前坐标
 */
qUtils.each = function  (_objects,_fn){
    for(var i=0,len=_objects.length;i<len;i++){
        _fn(_objects[i],i);
    }
}

/*去除空白节点，防止removeChild等方法出错*/
qUtils.cleanNode = function (element)
{
    for(var i=0; i<element.childNodes.length; i++)
    {
        var node = element.childNodes[i];
        if(node.nodeType == 3 && !/\S/.test(node.nodeValue))
        {
            node.parentNode.removeChild(node);
        }
    }
}


/**
 * by qiu
 * time 2015/2/13
 * @param obj 判断的对象
 * @returns {string}范围  ：'undefined' “string” 'number' 'boolean'  'function'  'object'  'date' 'array'
 */
qUtils.getType = function (obj){
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
        return x.toLowerCase();
    }
    if(x=="Object"){
        return x.toLowerCase();
    }
    return "unkonw type";
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
qUtils.getCookie = function (name){
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

qUtils.deleteCookie = function (name){
    var date=new Date();
    date.setTime(date.getTime()-10000);
    document.cookie=name+"=v; expires="+date.toGMTString();
}

    /**
     * 阻止事件冒泡 传递事件对象
     * @param event
     */
    qUtils.stopBubble = function (event) {
        if (event && event.stopPropagation) {
            //因此它支持W3C的stopPropation()方法
            event.stopPropagation();
        }
    else {
        //否则,我们得使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
    }
}
