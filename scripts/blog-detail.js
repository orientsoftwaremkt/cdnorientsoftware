var readingTime = 0;
$(document).ready(function() {
    initSharePanel();
    initMoreChaptersButton();

    if(window.location.pathname != "/blog/what-is-odc/") {
        setClassForToCItemOnScroll(150);
        setClassForToCItemOnClick(100);
    } else {
        setClassForToCItemOnScroll(220);
        setClassForToCItemOnClick(170);
    }

    readingTime = calculateReadingTime();
    $("#read-time").text("• " + readingTime + " min read")
});

function initSharePanel() {
    var blogContentPosTop = 0;
    var blogContentPosBottom = 0;

    setTimeout(function() {
        blogContentPosTop = $("#blog-content").offset().top;
    }, 500);

    $(document).scroll(function () {
        var scrollPos = $(window).scrollTop();
        const offsetBottom = $(window).innerHeight();
        const offsetTop = 160;

        blogContentPosBottom = setContentPosBottom("#blog-content");
        blogTOCPosBottom = setContentPosBottom("#content-map");

        if(blogContentPosTop < (scrollPos + offsetTop) && blogContentPosBottom  >= (scrollPos + offsetBottom - offsetTop)) {
            $(".article-detail__fixed-part").addClass("sticky");
            if($(".article-detail__fixed-part").hasClass("--new-blog-ui") && $(window).outerWidth() < 1100) {
                $(".article-detail__fixed-part").addClass("hide");
                $(".toc-dropdown").removeClass("d-none");
            }
        } else {
            $(".article-detail__fixed-part").removeClass("sticky");
            if($(".article-detail__fixed-part").hasClass("--new-blog-ui") && $(window).outerWidth() < 1100) {
                $(".article-detail__fixed-part").removeClass("hide");
                $(".toc-dropdown").addClass("d-none")
            }
        }

        const offsetAdsBanner = 500;
        if((blogContentPosBottom - offsetAdsBanner) < scrollPos) {
            $("#sharePanel .article-detail__ads-image").css("opacity","0").css("z-index","-1");
        } else {
            $("#sharePanel .article-detail__ads-image").css("opacity","1").css("z-index","1");
        }

        scrollProgressBar(scrollPos, blogContentPosBottom);
    });

    $(window).resize(function(){
        if($(".article-detail__fixed-part").hasClass("--new-blog-ui") && $(window).outerWidth() >= 1100) {
            $(".article-detail__fixed-part").removeClass("hide");
            $(".toc-dropdown").addClass("d-none")
        }
    });
}

function scrollProgressBar(scrollPos, blogContentPosBottom) {
    $(window).resize(function(){
        blogContentPosBottom = setContentPosBottom("#blog-content");
    });

    var percentRead = Math.trunc((scrollPos * 100)/blogContentPosBottom);

    if(percentRead <= 100) {
        $('#progress-bar').css('width', percentRead+"%");
    }

}

function calculateReadingTime() {
    const text = $(".article-detail").text();
    const wordPerMin = 225;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordPerMin);

    $('#progress-number').text(readingTime + " min");
    return readingTime;
}

function setContentPosBottom(elementId) {
    return $(elementId).offset().top + $(elementId).height();
}

function setPaddingTopForSharePanel() {
    var paddingTop = 100;
    if($(window).width() <= 1200) {
        paddingTop = 80;
    }else {
        paddingTop = 100;
    }
    return paddingTop;
}

function getSectionId() {
    var sectionIds = $(".toc-entry a").map(function () {
        return $(this).attr("href");
    }).get();

    return sectionIds;
}

function setClassForToCItemOnScroll(offset) {
    var sectionIDs = getSectionId();
    var contentPosBottom = 0;

    $(document).scroll(function () {
        contentPosBottom = setContentPosBottom("#blog-content");
        var scrollPos = $(document).scrollTop() + offset;
        sectionIDs.forEach(function(id) {
            var anchorEl = $("a[href=\"" + id + "\"");
            if($(id).offset().top < scrollPos && scrollPos < contentPosBottom) {
                $(".toc-entry a").removeClass("active");
                anchorEl.addClass("active");
            }
        });
    });
}

function setClassForToCItemOnClick(offset) {
    $(".toc-entry a").click(function(e) {
        e.preventDefault();
        var id = $(this).attr("href");
        $(window).scrollTop($(id).offset().top - offset);
    });
}

function expandTOC() {
    $(".more-chapters.caret-down").toggleClass("show");
    $(".hide-scrollbar").toggleClass("--expanded");
    $("#toc-container").scrollTop(0);
}

function initMoreChaptersButton() {
    const heightLimitPC = 340;
    const heightLimitMB = 200;

    var tocHeight = $("#content-map .article-detail__content-map").outerHeight();

    if($(window).outerWidth() >= 1100) {
        if(tocHeight > heightLimitPC) {
            $(".more-chapters.caret-down").removeClass("d-none");
        } else {
            $(".more-chapters.caret-down").addClass("d-none");
        }
    } else {
        if(tocHeight > heightLimitMB) {
            $(".more-chapters.caret-down").removeClass("d-none");
        } else {
            $(".more-chapters.caret-down").addClass("d-none");
        }
    }
}
