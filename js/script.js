

    window.silex = window.silex || {}
    window.silex.data = {"site":{"width":960},"pages":[{"id":"page-jeremyoury","displayName":"jeremyoury","link":{"linkType":"LinkTypePage","href":"#!page-jeremyoury"},"canDelete":true,"canProperties":true,"canMove":true,"canRename":true,"opened":false}]}

/* keep the menu visible when you scroll down */
$(function() {
    var nav = $(".nav");
    var navBg = $(".nav-bg");
    var navOffset = nav.offset().top;
    $(window).scroll(function() {
        if ($(this).scrollTop() <= navOffset) {
            nav.css('position', '');
            navBg.css('position', '');
            nav.css('top', '');
            navBg.css('top', '');
            nav.css('z-index', '');
        }
        else {
            nav.css('position', 'fixed');
            navBg.css('position', 'fixed');
            nav.css('top', '0');
            navBg.css('top', '0');
            nav.css('z-index', '101');
        }
    });
 });
        
/*
* active menu widget for Silex
*/
$(function() {
    var lastId,
        menuItems = $(".nav a"),
        scrollItems = menuItems.map(function(){
            var attr = $(this).attr("data-silex-href") || $(this).attr("href");
            $(this).find("[href]").each(function() {
                attr = $(this).attr("href");
            });
            $(this).find("[data-silex-href]").each(function() {
                attr = $(this).attr("href");
            });
            if(attr && attr.indexOf("#") === 0) {
                var name = attr.substring(1);
                var item = $("." + name);
                if(window.location.hash.indexOf(name) === 1) {
                    var offsetTop = item.offset().top;
                    $('html, body').stop().animate({
                        scrollTop: offsetTop
                    }, 300);
                }
                if (item.length) { return {
                        "link": this,
                        "item": item.get(0)
                    };
                }
            }
        });
    scrollItems.each(function() {
        var link = this.link;
        var item = this.item;
        $(link).click(function(e){
          var offsetTop = $(item).offset().top;
          $('html, body').stop().animate({
              scrollTop: offsetTop - 50
          }, 300);
          e.preventDefault();
        });
    })
        
    $(window).scroll(function(){
        var fromTop = $(this).scrollTop() + 50;
        var cur = scrollItems.map(function(){
            if ($(this.item).offset().top <= fromTop)
            return this;
        });
        $(".active-menu").removeClass("active-menu");
        if(cur.length > 0) {
           cur = cur[cur.length-1];
           $(cur.link).addClass("active-menu");
       }
    });
});
