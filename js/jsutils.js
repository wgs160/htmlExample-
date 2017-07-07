/**
 * Created by ning on 2015/3/2.
 */

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
 * 添加事件对象
 * @param elm 目标
 * @param evType 事件名称
 * @param fn 执行的函数
 * @param useCapture false起泡，true捕获
 * @returns {*}
 */
function addEvent(elm, evType, fn, useCapture) {
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

/* 另一个版本 以后研究

function addEvent(element, type, handler) {
//为每一个事件处理函数分派一个唯一的ID
    if (!handler.$$guid) handler.$$guid = addEvent.guid++;
//为元素的事件类型创建一个哈希表
    if (!element.events) element.events = {};
//为每一个"元素/事件"对创建一个事件处理程序的哈希表
    var handlers = element.events[type];
    if (!handlers) {
        handlers = element.events[type] = {};
//存储存在的事件处理函数(如果有)
        if (element["on" + type]) {
            handlers[0] = element["on" + type];
        }
    }
//将事件处理函数存入哈希表
    handlers[handler.$$guid] = handler;
//指派一个全局的事件处理函数来做所有的工作
    element["on" + type] = handleEvent;
};
//用来创建唯一的ID的计数器
addEvent.guid = 1;
function removeEvent(element, type, handler) {
//从哈希表中删除事件处理函数
    if (element.events && element.events[type]) {
        delete element.events[type][handler.$$guid];
    }
};
function handleEvent(event) {
    var returnValue = true;
//抓获事件对象(IE使用全局事件对象)
    event = event || fixEvent(window.event);
//取得事件处理函数的哈希表的引用
    var handlers = this.events[event.type];
//执行每一个处理函数
    for (var i in handlers) {
        this.$$handleEvent = handlers[i];
        if (this.$$handleEvent(event) === false) {
            returnValue = false;
        }
    }
    return returnValue;
};
//为IE的事件对象添加一些“缺失的”函数
function fixEvent(event) {
//添加标准的W3C方法
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
};
fixEvent.preventDefault = function() {
    this.returnValue = false;
};
fixEvent.stopPropagation = function() {
    this.cancelBubble = true;
};
*/

/**
 *  判断是否有class属性
 * @param _object 目标
 * @param _clsname
 * @returns {boolean}
 */
function hasClass(_object,_clsname){
    var _clsname = _clsname.replace(".","");
    var _sCls = " "+(_object.className)+" ";
    return (_sCls.indexOf(" "+_clsname+" ") != -1) ? true : false;
}

/**
 * 去class头尾空格
 * @param _str
 * @returns {string}
 */
function toClass(_str){
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
function addClass(_object,_clsname){
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
function delClass(_object,_clsname){
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
function each(_objects,_fn){
    for(var i=0,len=_objects.length;i<len;i++){
        _fn(_objects[i],i);
    }
}

/*去除空白节点，防止removeChild等方法出错*/
function cleanNode(element)
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