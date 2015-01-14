function setNav() {
    $("#menu a").each(function () {
        var theNode = $(this);
        theNode.click(function (e) {
            e.preventDefault();
            $("#menu a.selected-tab").removeClass("selected-tab");
            theNode.addClass("selected-tab");
            $("#body .main-content > div").css("display", "none");
            $(theNode.attr("href")).css("display", "block");
            return false;
        })
    })
}
function setHeight() {
    $("#body").css("min-height", $(window).height() - ($("header").height() + $("footer").height() + 2) + "px");
}

homeCarousel = {
    init: function () {
        homeCarousel.windowWidth = $("#homeCarousel").width();
        var slides = $("#homeCarouselWindow figure");
        homeCarousel.totalSlides = slides.length;
        var windowOffset = $("#homeCarouselWindow").offset().left;

        $("#homeCarouselWindow").width(homeCarousel.totalSlides * homeCarousel.windowWidth);
        $("#homeCarouselWindow figure").width(homeCarousel.windowWidth);
        homeCarousel.startSlideShow();
    },
    startSlideShow: function (slideNum) {
        slideNum = slideNum ? slideNum : 1;
        homeCarousel.currSlide = slideNum;
        if (homeCarousel.timerInterval) {
            homeCarousel.stopSlideShow();
        }
        homeCarousel.showSlide();
        homeCarousel.timerInterval = setInterval(homeCarousel.showSlide, 5000);
    },
    stopSlideShow: function() {
        clearInterval(homeCarousel.timerInterval);
    },
    showSlide: function () {
        if (homeCarousel.currSlide < 1) {
            homeCarousel.currSlide = homeCarousel.totalSlides;
        } else if (homeCarousel.currSlide > homeCarousel.totalSlides) {
            homeCarousel.currSlide = 1;
        }
        var leftPos = (-1) * (homeCarousel.currSlide - 1) * homeCarousel.windowWidth;
        homeCarousel.currSlide++;
        $("#homeCarouselWindow").animate({ left: leftPos }, 1000);
    }
}
$(document).ready(function () {
    setHeight();
    setNav();
    homeCarousel.init();
    $(".home-expand").each(function () {
        var thisNode = $(this);
        thisNode.click(function (e) {
            e.preventDefault();
            if (thisNode.hasClass("expanded-info-card")) {
                $("#home-features .info-card").animate({ width: "30%" }, 300);
                thisNode.removeClass("expanded-info-card");
            } else {
                $("#home-features .info-card").not(thisNode.parent()).animate({ width: "5%" }, 300);
                $("#home-features .info-card .expanded-info-card").removeClass("expanded-info-card")
                thisNode.parent().animate({ width: "80%" }, 300);
                thisNode.addClass("expanded-info-card");
            }
            return false;
        });
    })
})
$(window).resize(setHeight);