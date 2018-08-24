$('.order-btn').click(function() {
    $(window).scrollTop(0);
    $('.request').fadeIn(200);

});

$('.exit-btn, .request__background').click(function() {

    $('.request').fadeOut(200);

});

$('.accordions__button').click(function () {

    $(this).toggleClass('active');
    $('.accordions__item + .accordions__button').not($(this).next()).slideUp(400);
    $(this).next().slideToggle(400);

});

$(function() {

    $('.hero__slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        prevArrow: ".hero__arrow--left",
        nextArrow: ".hero__arrow--right",
        dotsClass: "slick-buttons",
        customPaging : function(slider, i) {
            var thumb = $(slider.$slides[i]).data('thumb');
            return '<button class="slick-button"></button>';
        },
        responsive: [
            {
              breakpoint: 767,
              settings: {
                prevArrow: false,
                nextArrow: false,
              }
            },
        ]
    });

});

$(function() {

    $('.clients__slider').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        dotsClass: "slick-buttons",
        customPaging : function(slider, i) {
            var thumb = $(slider.$slides[i]).data('thumb');
            return '<button class="slick-button"></button>';
        },
        responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 3
              }
            },
        ]
    });

});

$(document).ready(function () {
    updateContainer();
});

$(window).resize(function() {
    setTimeout(function() {
        updateContainer();
    }, 1500);
    
});

$('.header__toggle').click(function() {

    $('.menu').slideToggle(400);

});

function updateContainer() {
    var $containerWidth = $(window).width();
        if ($containerWidth <= 767) {

            var windowWidth = $(window).width();
            $('.search__button').click(function(){
                var windowWidth = $(window).width();
                var block_width = $('.search__input').width();

                $('.search__input').css({
                    'width': (windowWidth / 1.2) - 60 + 'px',
                    'opacity': '1'
                })
                
                
            });

            $(document).mouseup(function (e) {
                var windowWidth = $(window).width();
                var block_width = $('.search__input').width();

                var container = $('.search');
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $('.search__input').css({
                        'width': '10px',
                        'opacity': '0'
                    });
                }
                
            });

            $('.navigation__list').click(function() {
                $('.menu').fadeOut();
            })
    }
    else {
        $('.search__button').unbind('click');
        $('.navigation__list').unbind('click');
    }
}

/* INNER PAGES */

$(document).ready(function () {
    sidebarUpdate();
});

$(window).resize(function() {
    setTimeout(function() {
        sidebarUpdate();
    }, 500);
    
});

function sidebarUpdate() {



    var $windowWidth = $(window).width();

        if ($windowWidth <= 992) {

            var toplogo_pos = $('.sidebar').offset().top; // определяем его первоначальное положение
            $(window).scroll(function(){

               if ($(window).scrollTop() > toplogo_pos){ // Если страницу прокрутили дальше, чем находится наш блок
                    $('.sidebar').css('position', 'fixed'); // То мы этот блок фиксируем и отображаем сверху.
            
               } else{  // Если же позиция скрола меньше (выше), чем наш блок
                    $('.sidebar').css('position', 'absolute'); // то возвращаем все назад
               }
            });

        }

};

$('.inner-menu__toggle').click(function() {
    $('.sidebar').toggleClass('active');
    $('.hide').toggleClass('active');
});

$('.hide').click(function() {
    $('.sidebar').toggleClass('active');
    $('.hide').toggleClass('active');
});

$('.sidebar-menu__button').click(function() {
    $('.hidden-production').slideToggle(300);
});

$('.services__sidebar-toggle').click(function() {
    $('.services-hidden').slideToggle(300);
});

$('.services__sidebar-button').click(function() {
    $('.hidden-button').toggleClass('hidden');

    if ( $('.services-hidden').css('display') == 'block' ) {
        $('.hidden-production').css('display', 'none');
    }
});

$('.hidden-button').click(function() {
    $('.services__sidebar-button').toggleClass('hidden');
});

$(function() {

    // Инициализация карты
    var myMap;
    // при успешной загрузке API выполняется функция инициализации карты
    ymaps.ready(init);

    function init(){
        // создание экземпляра карты и его привязка к контейнеру с id="map"
        myMap = new ymaps.Map("map", {
            // центр карты
            center: [59.907271, 30.262553],
            // коэффициент масштабирования
            zoom: 14,
            controls: ['zoomControl']
            // тип карты, по умолчанию используется тип карты "схема"
            //type: "yandex#map",
        });
        myMap.behaviors.disable('multiTouch');
        myMap.behaviors.disable('scrollZoom');
    
        /*myMap.controls.add("zoomControl", {
            position: {top: 15, left: 15}
        });*/
     
        var myPlacemark = new ymaps.Placemark([59.907271, 30.262553] , {},
            { iconLayout: 'default#image',
              // iconImageHref: 'http://blog.karmanov.ws/files/APIYaMaps1/min_marker.png',
              iconImageSize: [40, 51],
              iconImageOffset: [-20, -47] });     
     
        myMap.geoObjects.add(myPlacemark);
    }

});

$(function() {

    if ($(window).width() <= 480) {
        var size = 60,
        newsContent= $('.news__text-right p'),
        newsText = newsContent.text();
        
        if(newsText.length > size){
            newsContent.text(newsText.slice(0, size) + ' ...');
        }
    } 

});

$(".tab-content").not(":first").hide();
$(".tabs__item").click(function() {
	$(".tabs__item").removeClass("active").eq($(this).index()).addClass("active");
	$(".tab-content").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("active");