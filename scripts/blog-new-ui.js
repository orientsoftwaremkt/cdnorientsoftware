$(document).ready(function() {
    setTOCHeight();
    initCateCarousel();

    $(window).resize(function(){
        setTOCHeight();
    });
});

function setTOCHeight() {
    var tocElements = [];
    const marginBottom = 12;

    $(".toc-entry a").each(function () {
        tocElements.splice(tocElements.length,0,$(this));
    });

    var tocHeight = 0;
    tocElements.slice(0, 7).forEach(function (el) {
        tocHeight += el.height() + marginBottom;
    });

    var windowHeight = $(window).height();
    const heightLimit = 350;
    if((windowHeight - tocHeight) > heightLimit) {
        $("#toc-container").css("max-height", tocHeight);
    } else {
        $("#toc-container").css("max-height", "calc(57vh - 160px)");
    }
}

function initCateCarousel() {
    $('.blog-categories-new-ui__carousel').owlCarousel({
        loop: false,
        margin: 15,
        dots: false,
        nav: false,
        items: 3,
        autoWidth:true,
        responsive: {
            0: {
                margin: 15,
                items: 3
            },
            768: {
                margin: 15,
                items: 4
            },
            992: {
                margin: 30,
                items: 5
            },
            1340: {
                margin: 45,
                items: 6
            }
        }
    });
}
