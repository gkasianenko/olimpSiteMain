//import $ from 'jquery';




$(document).ready(function() {
    $('.show-contact-modal').on('click', function (e) {
        e.preventDefault();
        $('#contact-modal').show();
    });

    $('#contact-modal button.close').on('click', function (e) {
        e.preventDefault();
        $('#contact-modal').hide();
    });
});

$('.sidebar .collapse').on('show.bs.collapse', function () {
    $('.sidebar .collapse.show').collapse('toggle');
})

/*$(window).load(function () {
    setTimeout(function() {
        $('#before-load').find('i').fadeOut().end().delay(400).fadeOut('slow');
    }, 1500);
});*/


$(function () {
    AOS.init({once: true, disable: 'phone'});
});

$('#price-carousel').owlCarousel({
    items: 1,
    loop: true,
    nav: false,
    navText: ['<i></i>', '<i></i>'],
    dots: true,
    lazyLoad: true,
    autoWidth: false,
    auto: false,
    stagePadding: 20,
    margin: 35,
    responsive: {//TODO
        1200: { items: 4, dots: false, nav: true },
        980: { items: 3, dots: false, nav: true },
        768: { items: 2, dots: false, nav: true },
        400: { dots: false, nav: true },
    }
});




$('#certificate-carousel').owlCarousel({
    center: false,
    items: 5,
    loop: true,
    margin: 22,
    nav: true,
    navText: ['<i></i>', '<i></i>'],
    dots: false,
    lazyLoad: true,
    auto: true,
    autoWidth:false,
    responsive: {
        1200: {items: 5},
        980: {items: 3},
        768: {items: 3},
    }
});

$('#review-text-carousel').owlCarousel({
    center: false,
    items: 3,
    loop: true,
    margin: 15,
    nav: true,
    navText: ['<i></i>', '<i></i>'],
    dots: false,
    lazyLoad: true,
    auto: false,
    responsive: {
        1400: { items: 3 },
        1200: {items: 2},
        // 980: {items: 2},
        // 768: {items: 2},
        576: {items: 1}
    }
});


$('#review-video-carousel').owlCarousel({
    center: false,
    items: 3,
    loop: true,
    margin: 15,
    nav: true,
    navText: ['<i></i>', '<i></i>'],
    dots: false,
    lazyLoad: true,
    auto: false,
    responsive: {
        1200: {items: 3},
        980: {items: 2},
        768: {items: 2},
        576: {items: 1}
    }
});


$('#review-audio-carousel').owlCarousel({
    center: false,
    items: 3,
    loop: true,
    margin: 15,
    nav: true,
    navText: ['<i></i>', '<i></i>'],
    dots: false,
    lazyLoad: true,
    auto: false,
    responsive: {
        1200: {items: 3},
        980: {items: 2},
        768: {items: 2},
        576: {items: 1}
    }
});


document.addEventListener("DOMContentLoaded", function () {
    yall({
        events: {
            load: function (event) {
                if (!event.target.classList.contains("lazy") && event.target.nodeName == "IMG") {
                    event.target.classList.add("yall-loaded");
                    event.target.style.opacity = 1;
                }
            },
        }
    })
});


var inputs = document.querySelectorAll('.inputfile');

Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling,
        labelVal = label.innerHTML;

    input.addEventListener('change', function (e) {
        var fileName = '';

        if (this.files && this.files.length > 1)
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('%count%', this.files.length);
        else
            fileName = e.target.value.split('\\').pop();

        if (fileName)
            label.querySelector('span').innerHTML = fileName;
        else
            label.innerHTML = labelVal;
    });

    // Firefox bug fix
    input.addEventListener('focus', function () {
        input.classList.add('has-focus');
    });
    input.addEventListener('blur', function () {
        input.classList.remove('has-focus');
    });
});

lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'showImageNumberLabel': false
});

document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity("Поле не может быть пустым");
            }
        };
        elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
        };
    }
})

$(window).load(function () {
    const header = document.getElementById('header');
    var sidebar = document.getElementById('sidebar');
    var main = document.querySelector('main.main');
    const header_offset = header.offsetHeight
    const scroll_header_offset = header_offset - (header_offset >= 250 ? 100 : -15)

    $(window).scroll(function () {
        if (window.pageYOffset > scroll_header_offset) {
            header.classList.add('header--sticky');
            let offset = scroll_header_offset;
            if (header_offset >= 250) {
            offset += document.querySelector('#header.header--sticky').offsetHeight;
            } else {
                offset -= document.querySelector('#header.header--sticky').offsetHeight;
            }
            main.setAttribute('style', 'margin-top: ' + offset +'px');

            if (sidebar) {
                sidebar.setAttribute('style', 'top: ' + header.offsetHeight + 'px');
            }

        } else {
            header.classList.remove('header--sticky');
            main.removeAttribute('style');
            if (sidebar) {
                sidebar.removeAttribute('style');
            }
        }
    });
})

$(window).scroll(function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
        if ($(this).scrollTop() >= 50) {
            $('#return-to-top').fadeIn(200);
        } else {
            $('#return-to-top').fadeOut(200);
        }
    } else {
        $('#return-to-top').fadeOut(200);
    }
});

$('#return-to-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 250);
});

$('.btn__scroll').on('click', function (e) {
    e.preventDefault();
    $('body,html').animate({
        scrollTop: document.querySelector('#header').offsetHeight
    }, 250);
});

const unbindDropdownHandler = function () {
    $('nav.nav-middle .nav-item.dropdown').unbind();
    $('nav.nav-middle .nav-item.dropdown').removeClass('dropdown').addClass('dropdown-off');
    $('nav.nav-middle .nav-item.dropdown-off .nav-link').removeClass('dropdown-toggle');
};

$(window).ready(function () {
    if (window.innerWidth >= 1200) {
        $('nav.nav-middle .nav-item.dropdown-off').removeClass('dropdown-off').addClass('dropdown');
        $('nav.nav-middle .nav-item.dropdown .nav-link').addClass('dropdown-toggle');

        $('nav.nav-middle .nav-item.dropdown').on('click', function(e) {
            let navBottom = $('.nav-bottom');
            let setActiveClass = $('nav.nav-middle .nav-item.active').length === 0;

            if ($(e.target).hasClass('dropdown-show')) {
                $(e.target).removeClass('dropdown-show');
                $(e.target).removeClass('active');
                navBottom.removeClass('nav-bottom--active')
            } else {
                $(e.target).addClass('dropdown-show');
                if (setActiveClass) {
                    $(e.target).addClass('active');
                }
                navBottom.addClass('nav-bottom--active')
            }

            e.preventDefault();
        });
    } else {
        unbindDropdownHandler();
    }
});

$(window).on('resize', function () {
    if (window.innerWidth >= 1200) {
        $('nav.nav-middle .nav-item.dropdown-off').removeClass('dropdown-off').addClass('dropdown');
        $('nav.nav-middle .nav-item.dropdown .nav-link').addClass('dropdown-toggle');

        $('nav.nav-middle .nav-item.dropdown').on('click', function(e) {
            let navBottom = $('.nav-bottom');
            let setActiveClass = $('nav.nav-middle .nav-item.active').length === 0;

            if ($(e.target).hasClass('dropdown-show')) {
                $(e.target).removeClass('dropdown-show');
                $(e.target).removeClass('active');
                navBottom.removeClass('nav-bottom--active')
            } else {
                $(e.target).addClass('dropdown-show');
                if (setActiveClass) {
                    $(e.target).addClass('active');
                }
                navBottom.addClass('nav-bottom--active')
            }

            e.preventDefault();
        });
    } else {
        unbindDropdownHandler();
    }
});

function loadYouTubeAPI() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

var player;
var playerWidth = 640;
var playerHeight = 360;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: playerHeight,
        width: playerWidth,
        videoId: 'cqnVnR-Ld3A',
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

$('.video__play #play').on('click', function (e) {
    var preview = $('.preview .video__preview img');

    playerWidth = preview.width();
    playerHeight = preview.height();

    loadYouTubeAPI();

    $('.preview').hide();
    $('.youtube').show();
});

function loadBMAnimation(loader) {
    var animation = bodymovin.loadAnimation({
        container: loader,
        renderer: "svg",
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
            viewBoxSize: '675 175 1158 800',
        },
        path: "/wa-data/public/site/themes/default/banner.json"
    });

    // setTimeout(function () {
        animation.play();
    // }, 3000);

    // loader.addEventListener("mouseenter", function () {
    //     animation.play();
    // });
    //
    // loader.addEventListener("mouseleave", function () {
    //     animation.stop();
    // });
}

const loader = document.querySelector("#header__animation");
const loaderStatic = document.querySelector("#header__animation--static");

if (('ontouchstart' in document.documentElement) && window.innerWidth <= 568) {
    loader.style.display = 'none';
    loaderStatic.style.display = 'block';
    // loaderStatic.style.display = 'none';
    // loader.style.display = 'block';

} else {
    $(window).load(function () {

        loadBMAnimation(loader);
    });
}


//Бегущая строка в заголовке главной страницы

const TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    const that = this;
    let delta = 250 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 300;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  




