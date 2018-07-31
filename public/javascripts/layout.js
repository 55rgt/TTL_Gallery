const filterNavigator = new function() {
    const $window = $(window);
    const $mainTitle = $('.main-title');
    const $filterNavigator = $('.filter-navigator');

    let scrollPosition = 'up';

    $window.scroll(function() {

        const headerHeight = 56 + $mainTitle.height();

        if ($window.scrollTop() < headerHeight) {
            // 스크롤이 상위에 있을 때
            if (scrollPosition === 'down') {
                $filterNavigator.css('position', 'static');

                scrollPosition = 'up';
            }
        }
        else {
            // 스크롤이 하위에 있을 때
            if (scrollPosition === 'up') {
                $filterNavigator.css(
                    {'position': 'fixed',
                        'top' : 0,
                        'width' : $filterNavigator.parent().width()
                    });

                scrollPosition = 'down';
            }
        }

    });

    $window.on('resize', () => {
        const headerHeight = 56 + $mainTitle.height();

        if ($window.scrollTop() > headerHeight) {
            $filterNavigator.css({
                    'width' : $filterNavigator.parent().width()
                });
        }
        else {
            $filterNavigator.css({
               'width' : '100%'
            });
        }

    });

};



