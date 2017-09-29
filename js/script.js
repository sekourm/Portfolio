$(function() {
    $('.scroll').scrollLine();
});

// Plugin
(function($) {
    $.fn.scrollLine = function()
    {
        return this.each(function() {
            var $document = $(document);
            var $windows = $(window);
            var $line = $('.line');

            $document.scroll(function () {
                line();
                scrollDiv();
            });

            $windows.resize(function () {
                line();
                scrollDiv();
            });

            // line load
            function line() {
                var scroll = $document.scrollTop();
                var pageHeight = $document.height();
                var windowsHeight = $windows.height();
                var scrollPercent = 100 * scroll / (pageHeight - windowsHeight);
                $line.css('width', scrollPercent + '%');
            }


            var positionTop = [];
            $(".scroll").each(function (index) {
                positionTop.push({top: $(this).offset().top});
            });

            function scrollDiv() {

                var newPositionTop = [];
                var scroll = $document.scrollTop();
                var $div = $('.scroll');

                for (var i = 0; i < $div.length; i++) {
                    var $element = $($div[i]);
                    newPositionTop.push({top: $($div[i]).offset().top});
                    if (i === 0) {
                        if (scroll >= positionTop[i].top && scroll <= positionTop[i + 1].top) {
                            $($div[i]).css({position: 'fixed', top: 0});
                        }
                        if (scroll <= positionTop[0].top) {
                            $($div[i]).css({position: 'absolute', top: positionTop[i].top});
                        }
                    }

                    if (i >= 1) {
                        if (newPositionTop[i - 1].top >= positionTop[i].top && scroll >= positionTop[i].top) {
                            $($div[i - 1]).css({position: 'absolute', top: positionTop[i - 1].top});
                            $($div[i]).css({position: 'fixed', top: 0});
                            $($div[i]).addClass('move');

                            if(i > 1){
                                $($div[i - 1]).removeClass('move');
                            }
                        }
                        if (newPositionTop[i].top <= positionTop[i].top && scroll <= positionTop[i].top && $($div[i]).hasClass("move")) {
                            $($div[i - 1]).css({position: 'fixed', top: 0});
                            $($div[i]).css({position: 'absolute', top: positionTop[i].top});
                            $($div[i]).removeClass('move');

                            if(i > 1){
                                $($div[i - 1]).addClass('move');
                            }
                        }
                    }
                }
            }

            // // IN PROGRESS -> scroll div normale
            // var lineHeight = $line.height();
            // var $div1 = $('.div-1');
            // var div1Top = $div1.offset().top;
            // var $div2 = $('.div-2');
            // var div2Top = $div2.offset().top;
            // var $div3 = $('.div-3');
            // var div3Top = $div3.offset().top;
            //
            // function scrollDiv() {
            //     var scroll =  $document.scrollTop();
            //
            //     var div1NewTop = $div1.offset().top;
            //     var div2NewTop = $div2.offset().top;
            //     var div3NewTop = $div3.offset().top;
            //
            //     // div1
            //     if(scroll >= div1Top && scroll <= div2Top) {
            //         $div1.css({position:'fixed',top:lineHeight});
            //     }
            //     if(scroll <= div1Top) {
            //         $div1.css({position:'absolute',top: div1Top});
            //     }
            //
            //     // div2
            //     if(div1NewTop >= div2Top && scroll >= div2Top) {
            //         $div1.css({position:'absolute',top:div1Top});
            //         $div2.css({position:'fixed',top:lineHeight});
            //         $div2.addClass('move');
            //     }
            //     if(div2NewTop <= div2Top && scroll <= div2Top && $div2.hasClass("move")) {
            //         $div1.css({position:'fixed',top:lineHeight});
            //         $div2.css({position:'absolute',top:div2Top});
            //         $div2.removeClass('move');
            //     }
            //
            //     // div3
            //     if(div2NewTop >= div3Top && scroll >= div3Top) {
            //         $div2.css({position:'absolute',top:div2Top});
            //         $div3.css({position:'fixed',top:lineHeight});
            //         $div2.removeClass('move');
            //         $div3.addClass('move');
            //     }
            //     if(div3NewTop <= div3Top && scroll <= div3Top && $div3.hasClass("move")) {
            //         $div2.css({position:'fixed',top:lineHeight});
            //         $div3.css({position:'absolute',top:div3Top});
            //         $div3.removeClass('move');
            //         $div2.addClass('move');
            //     }
            // }
        })
    };
})(jQuery);