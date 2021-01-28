$.ajaxprefilter(function (options) {
    options.url = 'http://ajax.frontend.itheight.net' + options.url
    console.log(options.url);
})