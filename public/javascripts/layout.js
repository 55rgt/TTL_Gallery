const filterNavigator = new function() {
    const $window = $(window);
    const $mainTitle = $('.main-title');
    const $filterNavigator = $('.filter-navigator');
    const $container = $('.container');

    $window.scroll(function() {

        const headerHeight = 56 + $mainTitle.height();

        // console.log(headerHeight);
        // console.log($window.scrollTop());
        console.log($filterNavigator.parent().width());

        if ($window.scrollTop() < headerHeight) {
            // 스크롤이 상위에 있을 때
            $filterNavigator.css('position', 'static');
        }
        else {
            // 스크롤이 하위에 있을 때
            $filterNavigator.css(
                {'position': 'fixed',
                    'top' : 0,
                    'width' : $filterNavigator.parent().width()
                });
        }

    });
};



