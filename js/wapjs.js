/**
 * Created by qiuguanning on 2015/11/23.
 */
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