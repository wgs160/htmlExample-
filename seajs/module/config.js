/**
 * Created by ning on 2015/3/5.
 */
seajs.config({

    // Sea.js 的基础路径
    base: 'http://example.com/path/to/base/',

    // 别名配置
    alias: {
        'es5-safe': 'gallery/es5-safe/0.9.3/es5-safe',
        'json': 'gallery/json/1.0.2/json',
        'jquery': 'jquery/jquery/1.10.1/jquery'
    },

    // 路径配置
    paths: {
        'gallery': 'https://a.alipayobjects.com/gallery'  //require('gallery/xxx');
    },


    // 变量配置
    vars: {
        'locale': 'zh-cn' //  var lang = require('./i18n/{locale}.js');
    },

    // 映射配置
    map: [
        ['http://example.com/js/app/', 'http://localhost/js/app/']
    ],

    // 预加载项   需要插件支持

    preload: [
        Function.prototype.bind ? '' : 'es5-safe',
        this.JSON ? '' : 'json'
    ],

    // 调试模式     需插件
    debug: true,

    // 文件编码
    charset: 'utf-8'
});