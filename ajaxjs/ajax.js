/**
 * Created by ning on 2015/3/9.
 */

Object.extend = function (target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }

    return target;
};

function json2str(obj)
{
    var S = [];
    for(var i in obj){
        obj[i] = typeof obj[i] == 'string'?'"'+obj[i]+'"':(typeof obj[i] == 'object'?json2str(obj[i]):obj[i]);
        S.push(i+':'+obj[i]);
    }
    return '{'+S.join(',')+'}';
}

/**
 * ajax get方法编码值和value，字符串格式错误是get方法经常发生的错误
 * @param url
 * @param name key
 * @param value 值
 */
function addUrlParam(url,name,value){
    url+= (url.indexOf("?") == -1? "?":"&");
    url+= encodeURIComponent(name)+"="+encodeURIComponent(value);
    return url;
}

/**
 *
 * @param opt:分以下参数 传入的参数对象
 * type : get or post
 * data : json请求参数
 * success : 请求执行函数
 * async : 同步异步 true / false
 */
function ajax(opt){

    //默认参数对象
    var df = {
        type:"get",
        async:true,
        url:"",
        data:null,
        success:function(){
        }
    };
//传入参数覆盖
    Object.extend(df,opt);

    var data = df.data;
    var url = df.url;

    var xhr;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xhr=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange=function()
    {
        if (xhr.readyState==4 && xhr.status==200)
        {
       //     document.getElementById("myDiv").innerHTML=xhr.responseText;


            df.success(xhr.responseText);
        }
    }

  /*get/post的data的处理----------------*/

    if(df.type.toLowerCase() == "get"){
        for(var p in data){
            url = addUrlParam(url,p,data[p]);
        }
        data = null;
    }

    xhr.open(df.type,url,df.async);
    if(df.type.toLowerCase()=="post"){
         xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
         console.log(data);
        var arr = [];
        for(var p in data){
            arr.push(p+":"+data[p]);
        }
        data = arr.join("&")
        data = data.replace(/:/g,"=");
        console.log(data);
    }
    xhr.send(data);
}