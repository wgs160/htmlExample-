/**
 * Created by ning on 2015/3/5.
 */
/**
 * Created by ning on 2015/3/5.
 */
define(function(require,exports,module){

   var name = "这里是one";
    var two = require("module/two");
    function show(){
        return two.showtwo();
    }

    exports.name = name;
    exports.showone = show;

});