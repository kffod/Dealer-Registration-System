window.onload = function () {
    var swiper;
    $(document).ready(function () {

        if ($('.wrapper').hasClass('worksPage')) {

            var content = document.getElementsByClassName('wrapper')[0];
            content.addEventListener('touchstart', function (event) {
                if (!$('.wrapper').hasClass('projectsPage')) {
                    this.allowUp = (this.scrollTop > 0);
                    this.allowDown = (this.scrollTop < this.scrollHeight - this.clientHeight);
                    this.slideBeginY = event.pageY;
                }
            });

            content.addEventListener('touchmove', function (event) {
                if (!$('.wrapper').hasClass('projectsPage')) {
                    var up = (event.pageY > this.slideBeginY);
                    var down = (event.pageY < this.slideBeginY);
                    this.slideBeginY = event.pageY;
                    if ((up && this.allowUp) || (down && this.allowDown)) {
                        event.stopPropagation();
                    } else {
                        event.preventDefault();
                    }
                }
            });
        }

        var initWorksSwiper = function () {

            if($(window).width()>1023){
                $('.sectionSlider.swiper-container .swiper-slide').removeClass('hidden');
            }

            swiper = new Swiper('.sectionSlider.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 0,
                mousewheel: true,
                keyboard: true,
                speed: 1000,
                hashNavigation: true,
                direction: 'vertical',
                longSwipes: false,
                followFinger: false,
                passiveListeners: false,
                touchReleaseOnEdges: true,
                iOSEdgeSwipeDetection: true,

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                        speed: 500,
                        direction: 'horizontal'
                    }
                },
                on: {
                    slideChangeTransitionStart: function () {
                        index = $('.swiper-slide-active').index();
                        slidesNum = $('.sectionSlider .swiper-slide').length;
                        addSlide(index, slidesNum);
                        if (index < 4) {
                            $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                            $('.swiper-pagination-bullet:nth-child(1)').addClass('swiper-pagination-bullet-active');
                        } else if (index >= 4 && index <= 10) {
                            $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                            $('.swiper-pagination-bullet:nth-child(2)').addClass('swiper-pagination-bullet-active');
                        } else if (index >= 11 && index <= 14) {
                            $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                            $('.swiper-pagination-bullet:nth-child(3)').addClass('swiper-pagination-bullet-active');
                        } else if (index >= 15 && index <= 17) {
                            $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                            $('.swiper-pagination-bullet:nth-child(4)').addClass('swiper-pagination-bullet-active');
                        } else if (index >= 18 && index <= 21) {
                            $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                            $('.swiper-pagination-bullet:nth-child(5)').addClass('swiper-pagination-bullet-active');
                        } else if (index >= 22 && index <= 24) {
                            $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                            $('.swiper-pagination-bullet:nth-child(6)').addClass('swiper-pagination-bullet-active');
                        } else if (index >= 25 && index <= 28) {
                            $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                            $('.swiper-pagination-bullet:nth-child(7)').addClass('swiper-pagination-bullet-active');
                        } else if (index >= 29) {
                            $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                            $('.swiper-pagination-bullet:nth-child(8)').addClass('swiper-pagination-bullet-active');
                        }
                    }
                }
            });
        };
        var count = 0;

        function addSlide(activeIndex, slidesNum) {
            if (activeIndex + count <= slidesNum) {
                for (var i = 1; i < 6; i++) {
                    //console.log(activeIndex + count - 1 + i);
                    $('.swiper-slide').eq(activeIndex + count - 1 + i).removeClass('hidden');
                }
            }
        }

        initWorksSwiper();

        var newsSwiper = new Swiper('.newsSlider.swiper-container', {
            speed: 300,
            loop: true
        });
        $(document).on('click', '.swiper-buttons > div', function (e) {
            e.preventDefault();
            var getNum = $('.swiper-buttons .slideNum .curNum').text();
            var curSlide = parseInt(getNum);
            if ($(this).hasClass('swiper-button-prev')) {
                newsSwiper.slidePrev();
                if (curSlide === 1) {
                    curSlide = 3;
                } else {
                    curSlide -= 1;
                }
            } else {
                newsSwiper.slideNext();
                if (curSlide === 3) {
                    curSlide = 1;
                } else {
                    curSlide += 1;
                }
            }
            $('.swiper-buttons .slideNum .curNum').html(curSlide);
            return false;
        });
        $(document).on('click', '.swiper-pagination-bullet', function (e) {
            e.preventDefault();
            if ($(this).index() === 0) {
                swiper.slideTo(0);
                $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                $('.swiper-pagination-bullet:nth-child(1)').addClass('swiper-pagination-bullet-active');
            } else if ($(this).index() === 1) {
                swiper.slideTo(4);
                $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                $('.swiper-pagination-bullet:nth-child(2)').addClass('swiper-pagination-bullet-active');
            }
            if ($(this).index() === 2) {
                swiper.slideTo(11);
                $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                $('.swiper-pagination-bullet:nth-child(3)').addClass('swiper-pagination-bullet-active');
            } else if ($(this).index() === 3) {
                swiper.slideTo(15);
                $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                $('.swiper-pagination-bullet:nth-child(4)').addClass('swiper-pagination-bullet-active');
            } else if ($(this).index() === 4) {
                swiper.slideTo(18);
                $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                $('.swiper-pagination-bullet:nth-child(5)').addClass('swiper-pagination-bullet-active');
            } else if ($(this).index() === 5) {
                swiper.slideTo(22);
                $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                $('.swiper-pagination-bullet:nth-child(6)').addClass('swiper-pagination-bullet-active');
            } else if ($(this).index() === 6) {
                swiper.slideTo(25);
                $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                $('.swiper-pagination-bullet:nth-child(7)').addClass('swiper-pagination-bullet-active');
            } else if ($(this).index() === 7) {
                swiper.slideTo(29);
                $('.swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
                $('.swiper-pagination-bullet:nth-child(8)').addClass('swiper-pagination-bullet-active');
            }
            return false;
        });
        /*$(document).on('click', '.content .closeProject', function (e) {
            e.preventDefault();
            if($(window).width() < 768) {
                var link = $('.content.project').attr("data-url");
                if (link !== "") {
                    window.location.href = link;
                }
            }
            return false;
        });
        */
        $('#fullPage').fullpage({
            scrollingSpeed: 1000,
            loopHorizontal: false,
            slidesNavigation: true,
            slidesNavPosition: 'right',
            controlArrows: false,
            onSlideLeave: function (index, slideIndex, nextSlideIndex, direction) {
                var inner = $('.gradBgInner');
                var grad = $('.gradBg');
                inner.css({
                    'background': $(".slide.active").attr("data-grad")
                });
                inner.addClass('active');
                setTimeout(function () {
                    grad.css({
                        'background': $(".slide.active").attr("data-grad")
                    });
                    inner.removeClass('active');
                }, 500);
                if (slideIndex === 1) {
                    $('.fp-slidesNav ul li a').removeClass('active').next().addClass('active');
                }
                if (direction == 'left') {
                    var indexPrev = $('.section .slide.active').index() - 2;
                    //console.log("Prev:" + indexPrev);
                    var indexCur = $('.section .slide.active').index() - 1;
                    //console.log("Cur:" + indexCur);
                } else if (direction == 'right') {
                    var indexPrev = $('.section .slide.active').index();
                    //console.log(indexPrev);
                    var indexCur = $('.section .slide.active').index() + 1;
                    //console.log(indexCur);
                }
                var indexNext = indexCur + 1;
                $('.slide').eq(indexPrev).addClass('prev-slide');
                $('.slide').eq(indexCur).removeClass('prev-slide');
                $('.slide').eq(indexCur).removeClass('next-slide');
                $('.slide').eq(indexNext).addClass('next-slide');
            }
        });
        $.fn.parallax = function (resistance, mouse) {
            $el = $(this);
            TweenLite.to($el, 0.2, {
                x: -((mouse.clientX - window.innerWidth / 2) / resistance),
                y: -((mouse.clientY - window.innerHeight / 2) / resistance)
            });
        };
        $('.cookiesGrad, #fullPage').bind('mousewheel DOMMouseScroll', function (e) {
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                if (e.originalEvent.detail > 5) {
                    //scroll down
                    $.fn.fullpage.moveSlideRight();
                } else if (e.originalEvent.detail < -5) {
                    //scroll up
                    $.fn.fullpage.moveSlideLeft();
                }
            } else {
                if (e.originalEvent.wheelDelta < -100) {
                    //scroll down
                    $.fn.fullpage.moveSlideRight();
                } else if (e.originalEvent.wheelDelta > 100) {
                    //scroll up
                    $.fn.fullpage.moveSlideLeft();
                }
            }
            return false;
        });
        $('#sendContact').submit(function (e) {
            e.preventDefault();

            if ($('.cFormInput').is(':empty')) {
                $('.cFormInput').addClass('empty');
            } else {
                $(this).addClass('send');

                $('.nameFormInput').val($('.contactNameInpt').val());
                $('.emailFormInput').val($('.contactMailInpt').val());
                $('.messageFormInput').val($('.contactProjectInpt').val());

                $('.feedbackHiddenForm').submit();
            }
        });
        /*
        $(document).mousemove(function (e) {
            $(".swiper-slide-active .animal .moveBlock").parallax(-30, e);
            $(".envSun").parallax(130, e);
            $(".swiper-slide-active .animal-type-full .moveBlock").parallax(-30, e);
            $(".swiper-slide-active .siteName .moveBlock").parallax(-60, e);
            $(".swiper-slide-active .envClouds .moveBlock").parallax(90, e);
            $(".swiper-slide-active .slideTitle .moveBlock").parallax(-60, e);
        });
        */
        $(document).mousemove(function (e) {
            if ($(window).width() > 1023) {
                $(".slide.active .animal .moveBlock").parallax(-30, e);
                $(".envSun").parallax(130, e);
                $(".slide.active .animal-type-full .moveBlock").parallax(-30, e);
                $(".slide.active .siteName .moveBlock").parallax(-60, e);
                $(".slide.active .envClouds .moveBlock").parallax(90, e);
                $(".slide.active .slideTitle .moveBlock").parallax(-60, e);
                ///worksSlides
                //
                $('.swiper-slide-active .picMain').parallax(-20, e);
                $('.swiper-slide-active .movableBg.level-110').parallax(-110, e);
                //leerdamer
                $('.swiper-slide-active .headerBg.btopLeer').parallax(-110, e);
                $('.swiper-slide-active .headerBg.mtopLeer').parallax(-130, e);
                $('.swiper-slide-active .headerBg.smtopLeer').parallax(-150, e);
                $('.swiper-slide-active .headerBg.line').parallax(-80, e);
                $('.swiper-slide-active .headerBg.badge').parallax(-60, e);
                $('.swiper-slide-active .headerBg.moped').parallax(-55, e);
                $('.swiper-slide-active .leerBottom').parallax(-20, e);
                //vectem
                $('.swiper-slide-active .headerBg.topMain').parallax(-60, e);
                $('.swiper-slide-active .headerBg.rightMain').parallax(-40, e);
                $('.swiper-slide-active .headerBg.bottomMain').parallax(50, e);
                //levels
                $('.swiper-slide-active .headerBg.level-30').parallax(-30, e);
                $('.swiper-slide-active .headerBg.level-m40').parallax(40, e);
                $('.swiper-slide-active .headerBg.level-40').parallax(-40, e);
                $('.swiper-slide-active .headerBg.level-110').parallax(-110, e);
                $('.swiper-slide-active .headerBg.level-85').parallax(-85, e);
                $('.swiper-slide-active .headerBg.level-60').parallax(-60, e);
                $('.swiper-slide-active .headerBg.level-50').parallax(-50, e);
                $('.swiper-slide-active .headerBg.level-55').parallax(-55, e);
                $('.swiper-slide-active .headerBg.level-65').parallax(-65, e);
                $('.swiper-slide-active .headerBg.level-70').parallax(-70, e);
                $('.swiper-slide-active .headerBg.level-80').parallax(-80, e);
            }
        });
        $(document).on('swipedown', '.cookiesGrad, #fullPage', function () {
            $.fn.fullpage.moveSlideLeft();
        });
        $(document).on('swipeup', '.cookiesGrad, #fullPage', function () {
            $.fn.fullpage.moveSlideRight();
        });

        $(document).on('swipedown', '.swiper-container.sectionSlider', function () {
            swiper.slidePrev();
        });
        $(document).on('swipeup', '.swiper-container.sectionSlider', function () {
            swiper.slideNext();
        });

        $(document).on('click', '.hamMenu', function (e) {
            e.preventDefault();
            if ($(this).parents('.wrapper').hasClass('projectsPage')) {
                if ($(window).width() < 1024) {
                    $(this).parents('.wrapper').removeClass('projectsPage');
                    $(this).removeClass('active');
                    var senderElement = e.target;
                    if ($(senderElement).not(".showMore")) {
                        slideContentClose();
                    }
                }
            } else {
                $(this).toggleClass('active');
                $(this).siblings('.toggleWrap').toggleClass('show');
                $('.wrapper').toggleClass('fixed');
                $('.content.project').toggleClass('fixed');
            }
        });
        $(window).bind('scroll', function () {
            parallaxScroll();
            var scrollValue = $(window).scrollTop() * 0.5;
            $(".wrapper.article .articlePic").css({top: scrollValue});
            var offset = 200,
                range = 200,
                calc = 1 - (scrollValue - offset + range) / range;

            $(".wrapper.article .splashWrap.article .articleContent").css({'opacity': calc});
            //$(".wrapper.article .articlePic").css('transform', 'translateY('+ (scrollValue) + 'px)');
        });

        function slideContentClose() {
            $("html, body").animate({scrollTop: 0}, 0, function () {
                $('.wrapper').removeClass('hideAll');
                $('.projectContent').empty();
            });
            initWorksSwiper();
        }

        function slideContentOpen() {
            swiper.destroy(false, false);
            $('.wrapper').addClass('hideAll');
            var link = $('.swiper-slide-active .viewButton').attr('href');
            console.log(link);
            $(".projectContent").load(link);
        }

        $(document).on('click', '.splashContent .viewButton', function (e) {
            e.preventDefault();
            if ($(window).width() < 1024) {
                $('.hamMenu').addClass('active');
                $(this).parents('.wrapper').addClass('projectsPage');
            }
            slideContentOpen();
        });
        $(document).on('click', '.content .showMore', function (e) {
            e.stopPropagation();
            document.location = $(this).attr('href');
            $('.loadingScreen').animate({left: "100%"}, function () {
                $('.loadingScreen').removeClass('hidden');
                $('.loadingScreen').addClass('loaded');
            });
            setTimeout(function () {
                slideContentClose();
            }, 1000);
            setTimeout(function () {
                slideContentOpen();
            }, 2000);
            setTimeout(function () {
                $('.loadingScreen').animate({left: "0%"}, function () {
                    $('.loadingScreen').removeClass('hidden');
                    $('.loadingScreen').addClass('loaded');
                });
                openSite();
            }, 3000);
        });
        $('.pitchBlock .cFormInput').focus(function (e) {
            e.preventDefault();
            $(this).addClass('focus');
        });
        $('.pitchBlock .cFormInput').blur(function (e) {
            e.preventDefault();
            var valueI = $(this).text(),
                realI = $(this).attr('data-target'),
                input;
            $(this).removeClass('focus');
            if ($(this).is(':empty')) {
                $(this).removeClass('typing');
            } else {
                input = document.getElementsByClassName(realI)[0];
                input.value = valueI;
            }
        });
        $('.pitchBlock .cFormInput').bind('DOMNodeInserted DOMNodeRemoved', function () {
            $(this).addClass('typing');
        });
        $(document).on('click', '.content.project, .content.project .closeProject, .wrapper.hideAll .sectionSlider', function (e) {
            e.preventDefault();
            /*if($(window).width() > 767) {
                var link = $(this).attr("data-url");
                if (link !== "") {
                    window.location.href = link;
                }
            }
            */
            if ($(window).width() > 1023) {
                if (!$(e.target).hasClass('videoEchi') && !$(e.target).hasClass('showMore')) {
                    slideContentClose();
                }
            }
            return true;
        });
        $(document).on('click', '.middleNav ul li a, .menu .logo, #sliderWrap .slideButton', function (e) {
            e.preventDefault();
            var link = $(this);
            if (link !== '#') {
                $('.loadingScreen').animate({left: "100%"}, function () {
                    $('.loadingScreen').removeClass('hidden');
                    $('.loadingScreen').addClass('loaded');
                    setTimeout(function () {
                        document.location = link.attr('href');
                    }, 1000);
                });
            }
        });

        function parallaxScroll() {
            var scrolled = $(window).scrollTop();
            if ($(window).width() > 1023) {
                if ($(window).width() > 1919) {
                    $('.parallax-lvl-0').css('top', (0 - (scrolled * 0.1)) + 'px');
                    $('.parallax-lvl-0m').css('top', (0 - (scrolled * 0.2)) + 100 + 'px');
                    $('.parallax-lvl-1').css('top', (scrolled * 0.1) - 150 + 'px');
                    $('.parallax-lvl-2').css('top', (scrolled * 0.2) - 300 + 'px');
                    $('.parallax-lvl-3').css('top', (scrolled * 0.1) - 100 + "px");
                } else if ($(window).width() < 1919 && $(window).width() > 1439) {
                    $('.parallax-lvl-1').css('top', (scrolled * 0.1) - 100 + 'px');
                    $('.parallax-lvl-0').css('top', (0 - (scrolled * 0.2)) + 'px');
                    $('.parallax-lvl-2').css('top', (scrolled * 0.2) - 300 + 'px');
                    $('.parallax-lvl-3').css('top', (scrolled * 0.1) - 100 + "px");
                } else if ($(window).width() < 1439 && $(window).width() > 1279) {
                    $('.parallax-lvl-1').css('top', (scrolled * 0.1) - 100 + 'px');
                    $('.parallax-lvl-0').css('top', (0 - (scrolled * 0.2)) + 'px');
                    $('.parallax-lvl-2').css('top', (scrolled * 0.2) - 300 + 'px');
                    $('.parallax-lvl-3').css('top', (scrolled * 0.1) - 100 + "px");
                } else if ($(window).width() < 1279 && $(window).width() > 1023) {
                    $('.parallax-lvl-1').css('top', (scrolled * 0.05) - 20 + 'px');
                    $('.parallax-lvl-0').css('top', (0 - (scrolled * 0.1)) + 'px');
                    $('.parallax-lvl-2').css('top', (scrolled * 0.1) - 100 + 'px');
                    $('.parallax-lvl-3').css('top', (scrolled * 0.1) - 100 + "px");
                }
            }
        }

        parallaxScroll();

        function openSite() {
            $('.loadingScreen').addClass('loaded');
            setTimeout(function () {
                $('.loadingScreen').addClass('hidden');
                $('.loadingScreen').removeClass('loaded');
            }, 1000);
        }


        $('.wrapper').removeClass('notLoaded');

        openSite();


        $(document).on('click', '.bottomCookies .cookiesButton', function (e) {
            e.preventDefault();
            $('.bottomCookies,.cookiesGrad').fadeOut(function () {
                $('.bottomCookies,.cookiesGrad').remove();
            });
            if($(e.currentTarget).hasClass('accept')){
                $.get($(e.currentTarget).attr('href'));
            }
            return false;
        })
    });
};