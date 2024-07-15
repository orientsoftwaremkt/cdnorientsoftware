const breakPoint = 1300;

$(document).ready(function() {
    initSharePanel();
    setClassForToCItemOnScroll();
    setClassForToCItemOnClick();
    closeCardOnClick();
    openFAQTabContentOnDropdownClick();
    closeNavigateMenuOnOutsideClick();

    collapseOnDesktop();

    $(window).resize(function () {
        collapseOnDesktop();
    });
});

function closeNavigateMenuOnOutsideClick() {
    $("#blog-content").on( "click", function() {
        $("#navigate-card .btn-link").addClass("collapsed");
        $("#navigate-card-collapse-1").removeClass("show");

    });
}

function initSharePanel() {
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

function setContentPosBottom(elementId) {
    const offset = 500;
    return $(elementId).offset().top + $(elementId).height() - offset;
}

function getSectionId() {
    var sectionIds = $(".toc-entry a").map(function () {
        return $(this).attr("href");
    }).get();

    return sectionIds;
}

function setClassForToCItemOnScroll() {
    var sectionIDs = getSectionId();
    var contentPosBottom = 0;
    const offset = 150;

    $(document).scroll(function () {
        contentPosBottom = setContentPosBottom("#blog-content");
        var scrollPos = $(document).scrollTop() + offset;
        sectionIDs.forEach(function(id) {
            var anchorEl = $("a[href=\"" + id + "\"");
            if($(id).offset().top < scrollPos && scrollPos < contentPosBottom) {
                $("li.toc-entry a").removeClass("active");
                anchorEl.addClass("active");
            }
        });
    });
}

function setClassForToCItemOnClick() {
    const offset = 100;
    $(".toc-entry a").click(function(e) {
        e.preventDefault();
        var id = $(this).attr("href");
        $(window).scrollTop($(id).offset().top - offset);
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
    $(id + " .expanable-box__wrapper").addClass("d-block");
    $(id + " .expanable-box__button").addClass("d-none");
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
