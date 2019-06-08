$(function () {
    banner();
    setWidth();
});
var banner = function () {
    var getData = function (callback) {
        if (window.res) {
            callback && callback(window.res);
        } else {
            $.ajax({
                type: 'get',
                url: 'js/data.json',
                data: '',
                dataType: 'json',
                success: function (res) {
                    window.res = res;
                    callback && callback(res);
                }
            });
        }
    }
    var reder = function () {
        getData(function (res) {
            var isM = $(window).width() < 768;
            var point = template('pointTemplate', {
                list: res
            });
            var image = template('imageTemplate', {
                list: res,
                ism: isM
            });
            $('.carousel-indicators').html(point);
            $('.carousel-inner').html(image);
        })
    }
    $(window).on('resize', function () {
        reder();
    }).trigger('resize');// 立即触发绑定的事件

    
    var start = 0;
    var distanceX = 0;
    var ismove = false;
    $('.wjs_banner').on('touchstart', function(e) {
        start = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function(e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - start;
        ismove = true;
    }).on('touchend', function(e) {
        if(ismove && Math.abs(distanceX) >= $(this).innerWidth()/4){
           if(distanceX > 0){
            $('.carousel').carousel('prev');
           }else if(distanceX < 0){
            $('.carousel').carousel('next'); 
           }
        }
    });
    start = 0;
    distanceX = 0;
    ismove = false;
}

var setWidth = function () {
    var width = 0;
    $('.product li').each(function (i, item) {
        var liwidth = $(item).outerWidth(true);
        width += liwidth;
    });
    $('.product').width(width);
    new IScroll($('.parent')[0], {
        scrollX: true,
        scrollY: false
    });
}
