/**
 * Created by ning on 2015/3/11.
 */

(function(window, document) {

    /**
     * 错误类信息，拦截
     */
    var errorM = {
        require:"这是必须的",
        number:"必须是数字"
    };
    /**
     * 警告类信息，不拦截
     */

   var warnM ={
        better:"这里最好这样做"
    }
    /**
     * 提示类
     */
    var noticeM = {

    };

    /**
     * 正则库
     * @type {{numericRegex: RegExp}}
     */
    var ruleRegex = {
        numericRegex : /^[0-9]+$/
    };


   var  valiKu = {
        ff:{
            one:{
                error:"mmmmm",
                    warn:"nnnnn",
                    notice:"zzzzz",
                    rule:ruleRegex.numericRegex
            }
        }
    }

    var pyvali = {


        init:function(id){
            pyvali.vali(id);

        },

         vali:function(id){
             var o = document.getElementById(id);
             //解决了blur的冒泡方法
            addEvent(o,"blur",function(e){
                var et = getEventTarget(e);
                    if(et.tagName.toLowerCase()=="input"){
                        //判断form库存在不存在
                        if(valiKu[id]){
                            //判断库中的 input存在不存在
                            if(valiKu[id][et.id]){

                                alert(valiKu[id][et.id].rule.test(et.value));
                                //继续写
                            }
                        }
                    }
             },true);

         }

    }

    window.pyvali = pyvali;

})(window, document);


/**
 *
 * @param elm 目标
 * @param evType 事件名称
 * @param fn 执行的函数
 * @param useCapture false起泡，true捕获
 * @returns {*}
 */
function addEvent(elm, evType, fn, useCapture) {

    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);//DOM2.0
        return true;
    }
    else if (elm.attachEvent) {
        if(evType == "blur"){
            evType =  "focusout";
        }else if(evType == "focus"){
            evType =  "focusin"
        }
        var r = elm.attachEvent('on' + evType, fn);//IE5+
        return r;
    }
    else {
        elm['on' + evType] = fn;//DOM 0
    }
}

/**
 * 获取事件对象
 * @param e
 * @returns {EventTarget|string|target|*|Object}
 */
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}
