const breakPoint = 1300;

$(document).ready(function() {

    openFAQTabContentOnDropdownClick();

    collapseOnDesktop();
    collapseNavigateOnTablet()
    closeModalOnMobile();

    $(window).resize(function () {
        collapseOnDesktop();
        collapseNavigateOnTablet();
        closeModalOnMobile();
    });
});

function closeModalOnMobile() {
    if($(window).width() <= 769) {
        $(".modal").modal("hide");
    }
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

function collapseNavigateOnTablet() {
    if ($(window).width() >= 1367) {
        $("#navigate-card .btn-link").removeClass("collapsed");
        $("#navigate-card-collapse-1").addClass("show");
    }else {
        $("#navigate-card .btn-link").addClass("collapsed");
        $("#navigate-card-collapse-1").removeClass("show");
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

function openContactForm(previousURL, ctaURL) {
    sessionStorage.setItem("previousURL", previousURL);
    location.href = ctaURL;
}
