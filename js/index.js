var autoLb = false; //autoLb=true为开启自动轮播
var autoLbtime = 3; //autoLbtime为轮播间隔时间（单位秒）
var touch = true; //touch=true为开启触摸滑动
var slideBt = true; //slideBt=true为开启滚动按钮


var slideNub; //轮播图片数量

//窗口大小改变时改变轮播图宽高
$(window).resize(function() {
    $(".slide").height($(".slide").width() * 0.56);
});


$(function() {
    $(".slide").height($(".slide").width() * 0.56);
    slideNub = $(".slide .img").size(); //获取轮播图片数量
    for (i = 0; i < slideNub; i++) {
        $(".slide .img:eq(" + i + ")").attr("data-slide-imgId", i);
    }


    //根据轮播图片数量设定图片位置对应的class
    if (slideNub == 1) {
        for (i = 0; i < slideNub; i++) {
            $(".slide .img:eq(" + i + ")").addClass("img3");
        }
    }
    if (slideNub == 2) {
        for (i = 0; i < slideNub; i++) {
            $(".slide .img:eq(" + i + ")").addClass("img" + (i + 3));
        }
    }
    if (slideNub == 3) {
        for (i = 0; i < slideNub; i++) {
            $(".slide .img:eq(" + i + ")").addClass("img" + (i + 2));
        }
    }
    if (slideNub > 3 && slideNub < 6) {
        for (i = 0; i < slideNub; i++) {
            $(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
        }
    }
    if (slideNub >= 6) {
        for (i = 0; i < slideNub; i++) {
            if (i < 5) {
                $(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
            } else {
                $(".slide .img:eq(" + i + ")").addClass("img5");
            }
        }
    }


    //根据轮播图片数量设定轮播图按钮数量
    if (slideBt) {
        for (i = 1; i <= slideNub; i++) {
            $(".slide-bt").append("<span data-slide-bt='" + i + "' onclick='tz(" + i + ")'></span>");
        }
        $(".slide-bt").width(slideNub * 34);
        $(".slide-bt").css("margin-left", "-" + slideNub * 17 + "px");
    }


    //自动轮播
    if (autoLb) {
        setInterval(function() {
            right();
        }, autoLbtime * 1000);
    }


    if (touch) {
        k_touch();
    }
    slideLi();
    imgClickFy();
})


//右滑动
function right() {
    var fy = new Array();
    for (i = 0; i < slideNub; i++) {
        fy[i] = $(".slide .img[data-slide-imgId=" + i + "]").attr("class");
    }
    for (i = 0; i < slideNub; i++) {
        if (i == 0) {
            $(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[slideNub - 1]);
        } else {
            $(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i - 1]);
        }
    }
    imgClickFy();
    slideLi();
}


//左滑动
function left() {
    var fy = new Array();
    for (i = 0; i < slideNub; i++) {
        fy[i] = $(".slide .img[data-slide-imgId=" + i + "]").attr("class");
    }
    for (i = 0; i < slideNub; i++) {
        if (i == (slideNub - 1)) {
            $(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[0]);
        } else {
            $(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i + 1]);
        }
    }
    imgClickFy();
    slideLi();
}


//轮播图片左右图片点击翻页
function imgClickFy() {
    $(".slide .img").removeAttr("onclick");
    $(".slide .img2").attr("onclick", "left()");
    $(".slide .img4").attr("onclick", "right()");
}


//修改当前最中间图片对应按钮选中状态
function slideLi() {
    var slideList = parseInt($(".slide .img3").attr("data-slide-imgId")) + 1;
    $(".slide-bt span").removeClass("on");
    $(".slide-bt span[data-slide-bt=" + slideList + "]").addClass("on");
}


//轮播按钮点击翻页
function tz(id) {
    var tzcs = id - (parseInt($(".slide .img3").attr("data-slide-imgId")) + 1);
    if (tzcs > 0) {
        for (i = 0; i < tzcs; i++) {
            setTimeout(function() {
                right();
            }, 1);
        }
    }
    if (tzcs < 0) {
        tzcs = (-tzcs);
        for (i = 0; i < tzcs; i++) {
            setTimeout(function() {
                left();
            }, 1);
        }
    }
    slideLi();
}


//触摸滑动模块
function k_touch() {
    var _start = 0,
        _end = 0,
        _content = document.getElementById("slide");
    _content.addEventListener("touchstart", touchStart, false);
    _content.addEventListener("touchmove", touchMove, false);
    _content.addEventListener("touchend", touchEnd, false);

    function touchStart(event) {
        var touch = event.targetTouches[0];
        _start = touch.pageX;
    }

    function touchMove(event) {
        var touch = event.targetTouches[0];
        _end = (_start - touch.pageX);
    }

    function touchEnd(event) {
        if (_end < -100) {
            left();
            _end = 0;
        } else if (_end > 100) {
            right();
            _end = 0;
        }
    }
}

/*map for leaflet*/
var cities = new L.LayerGroup();

    var mbAttr = '中国国家图书馆&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> ',
        mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    var streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

    var map = L.map('map', {
        center: [37.61,104.54],
        maxZoom: 6,
		minZoom:4,
		zoom:4,
        layers: [streets, cities]
    });
    
  
//比例尺
L.control.scale().addTo(map);

//禁止移动和放大缩小开始 
/* map.dragging.disable();  
  
map.touchZoom.disable();  
  
map.doubleClickZoom.disable();  
  
map.scrollWheelZoom.disable();   */
////禁止移动和放大缩小结束 

for (var i = 0; i < data.features.length; i++) {
    var lat = data.features[i].geometry.coordinates[0];
    var lon = data.features[i].geometry.coordinates[1];
    var name = data.features[i].properties.name;
    var str = '';
    var item = data.features[i].properties.items;
    for(var j=0;j<data.features[i].properties.itemCount;j++){
        str += '<li class="clearfix"><img src="images/map.jpg"><div><h3>' + item[j][1] + '</h3><h4>战国<span>|</spa>吕不韦</h4><p>中国-陕西省</p></div></li>'
    }
    console.log(data.features[i].properties.itemCount)
    var myIcon = L.divIcon({
        className: 'my-div-icon',
        html: data.features[i].properties.itemCount,
        popupAnchor: [190,230]
    });
    L.marker([lon, lat], { icon: myIcon }).addTo(map)
        .bindPopup('<ul class="mapul">'+str+'</ul>');
}

$('#map').append('<div class="map-title">\
                    <img src="images/icon_biaoqian.png">\
                    <span>交互式地图<br>الموضوعات الخاصة</span>\
                </div>')


$('#tab>li').on('mouseenter', function() {
    $(this).find('div').show();
    $(this).addClass('on').siblings().removeClass('on');
})
$('#tab>li').on('mouseleave', function() {
    $(this).find('div').hide();
})
$('.tab-content>.item').eq(0).show();
$('#tab>li').on('click', function() {
    $('.tab-content>.item').eq($(this).index()).show().siblings().hide();
})

var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 5,
    paginationClickable: true,
    autoplay: 1000,
    autoplayDisableOnInteraction: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    spaceBetween: 30
});

//日历
$('#ca').calendar({
    width: 290,
    height: 290,
    data: [
        {
          date: '2015/12/24',
          value: 'Christmas Eve'
        },
        {
          date: '2015/12/25',
          value: 'Merry Christmas'
        },
        {
          date: '2016/01/01',
          value: 'Happy New Year'
        }
    ],
    onSelected: function (view, date, data) {
        var date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        m = m<10 ? '0' + m : m;
        d = d<10 ? '0' + d : d;
        var dateStr = y + '-' + m + '-' + d;
        $('#tab>li[date='+dateStr+']').click();
    }
});
