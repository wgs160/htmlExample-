/**
 * Created by 15031493 on 2015/8/10.
 */

var qUtils = qUtils || {};

function _addClass(_object,_clsname){
    var _clsname = _clsname.replace(".","");
    if(!_hasClass(_object,_clsname)){
        _object.className = _toClass(_object.className+(" "+_clsname));
    }
}

function _delClass(_object,_clsname){
    var _clsname = _clsname.replace(".","");
    if(_hasClass(_object,_clsname)){
        _object.className = _toClass(_object.className.replace(new RegExp("(?:^|\\s)"+_clsname+"(?=\\s|$)","g")," "));//
    }
}

function _toClass(_str){
    var _str = _str.toString();
    _str = _str.replace(/(^\s*)|(\s*$)/g,"");//去头去尾空格
    _str = _str.replace(/\s{2,}/g," "); //替换2个以上的空格为1个
    return _str;
}

//��չ���飬ɾ��������
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * ��չʱ���ʽ
 * @param format   ����new date('yyyy-MM-dd hh:mm:ss')
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
 * ��չstring �ַ���ȥ���˿ո�;
 * @returns {string}
 */
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g,"");
}

/**
 *  �ж��Ƿ���class����
 * @param _object Ŀ��
 * @param _clsname
 * @returns {boolean}
 */
qUtils.hasClass = function (_object,_clsname){
    var _clsname = _clsname.replace(".","");
    var _sCls = " "+(_object.className)+" ";
    return (_sCls.indexOf(" "+_clsname+" ") != -1) ? true : false;
}

/**
 * ȥclassͷβ�ո�
 * @param _str
 * @returns {string}
 */
qUtils.toClass = function (_str){
    var _str = _str.toString();
    _str = _str.replace(/(^\s*)|(\s*$)/g,"");//ȥͷȥβ�ո�
    _str = _str.replace(/\s{2,}/g," "); //�滻2�����ϵĿո�Ϊ1��
    return _str;
}

/**
 * ���class
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
 * ɾ��class
 * @param _object
 * @param _clsname
 */
qUtils.delClass = function (_object,_clsname){
    var _clsname = _clsname.replace(".","");
    if(hasClass(_object,_clsname)){
        _object.className = toClass(_object.className.replace(new RegExp("(?:^|\\s)"+_clsname+"(?=\\s|$)","g")," "));//
    }
}

/*ȥ���հ׽ڵ㣬��ֹremoveChild�ȷ�������*/
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
 * @param obj �жϵĶ���
 * @returns {string}��Χ  ��'undefined' ��string�� 'number' 'boolean'  'function'  'object'  'date' 'array'
 */
qUtils.getType = function (obj){
    if(obj==null){
        return "null";
    }
    //���ж� �������ֳ�object������
    var t= typeof obj;
    if(t!="object"){
        return t;
    }
    //���жϲ�������object������
    //��ȡ[object xxxx]��XXXX����
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
 * @Description: ��ȡָ��cookieֵ ���粻�����򷵻ؿ�
 * @author:�ù���
 * @date: 2014-12-30 ����10:57:52
 * @modify: �޸ļ�¼
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
 * @Description: ɾ��ָ��key�� cookie
 * @author:�ù���
 * @date: 2014-12-30 ����11:00:14
 * @modify: �޸ļ�¼
 * @param name  key
 */
qUtils.deleteCookie = function (name){
    var date=new Date();
    date.setTime(date.getTime()-10000);
    document.cookie=name+"=v; expires="+date.toGMTString();
}
