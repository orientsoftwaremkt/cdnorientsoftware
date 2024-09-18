const breakPoint = 1300;

$(document).ready(function() {
    initSideMenu();
    closeCardOnClick();
    openFAQTabContentOnDropdownClick();
    closeNavigateMenuOnOutsideClick();

    collapseOnDesktop();
    closeModalOnMobile();

    $(window).resize(function () {
        collapseOnDesktop();
        closeModalOnMobile();
    });
});

function closeModalOnMobile() {
    if($(window).width() <= 769) {
        $(".modal").modal("hide");
    }
}

function closeNavigateMenuOnOutsideClick() {
    $("#blog-content").on( "click", function() {
        $("#navigate-card .btn-link").addClass("collapsed");
        $("#navigate-card-collapse-1").removeClass("show");

    });
}

function initSideMenu() {
    var blogContentPosTop = 0;
    var blogContentPosBottom = 0;
    const offset = -100;

    setTimeout(function() {
        blogContentPosTop = $("#blog-content").offset().top;
    }, 300);

    var scrollPos = $(document).scrollTop() + offset;
    blogContentPosBottom = setContentPosBottom("#blog-content");
    if(blogContentPosTop < scrollPos && blogContentPosBottom >= scrollPos) {
        $("#navigate-list").addClass("hide-on-scroll");
        $("#navigate-card").removeClass("d-none");
    }else{
        $("#navigate-list").removeClass("hide-on-scroll");
        $("#navigate-card").addClass("d-none");
    }

    $(document).scroll(function () {
        scrollPos = $(document).scrollTop() + offset;

        blogContentPosBottom = setContentPosBottom("#blog-content");

        if(blogContentPosTop < scrollPos && blogContentPosBottom >= scrollPos) {
            $("#navigate-list").addClass("hide-on-scroll");
            $("#navigate-card").removeClass("d-none");
        }else{
            $("#navigate-list").removeClass("hide-on-scroll");
            $("#navigate-card").addClass("d-none");
        }
    });
}

function closeCardOnClick() {
    $("#navigate-card .tech-toc__item").click(function(e) {
        e.preventDefault();
        $("#navigate-card .btn-link").addClass("collapsed");
        $("#navigate-card-collapse-1").removeClass("show");
    });
}

function collapseOnDesktop() {
    if ($(window).width() >= 576) {
        $(".show-first .btn-link").addClass("collapsed");
        $(".show-first").removeClass("show");
    }else {
        $(".show-first .btn-link").removeClass("collapsed");
        $(".show-first").addClass("show");
    }
}

function expandOnClick(id) {
    if($(id + " .expanable-box__wrapper").hasClass("d-block")) {
        $(id + " .expanable-box__wrapper").scrollTop(0);
        $(id + " .expanable-box__wrapper").removeClass("d-block");
        $(id + " .expanable-box__button").text("View more");
    } else {
        $(id + " .expanable-box__wrapper").addClass("d-block");
        $(id + " .expanable-box__button").text("View less");
    }
}

function openFAQTabContentOnDropdownClick() {
    $("#nav-tabs-dropdown .dropdown-item").click(function () {
        $(".tab-pane").removeClass("in active show");
        $("a.osd-tab__category").removeClass("active show");
        $(".dropdown-item").removeClass("d-none");

        var href = $(this).attr("data-id");
        $(href).addClass("in active show");
        $("a[href='"+ href +"']").addClass("active show");
        $(this).addClass("d-none");
        $("#nav-tabs-dropdown .dropdown-toggle").text($(this).text() + " ");

    });

    $("a.osd-tab__category").click(function () {
        $("#nav-tabs-dropdown .dropdown-toggle").text($(this).text() + " ");
    });
}

function goToSlide(carousel, slideNum) {
    $(carousel).owlCarousel().trigger('to.owl.carousel', [slideNum,300]);;
}
