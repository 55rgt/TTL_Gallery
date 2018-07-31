const filterNavigator = new function() {
    const $window = $(window);
    const $mainTitle = $('.main-title');
    const $filterNavigator = $('.filter-navigator');

    $window.scroll(function() {

        const headerHeight = 56 + $mainTitle.height();

        // console.log(headerHeight);
        // console.log($window.scrollTop());

        if ($window.scrollTop() < headerHeight) {
            // 스크롤이 상위에 있을 때
            $filterNavigator.css('position', 'static');
        }
        else {
            // 스크롤이 하위에 있을 때
            $filterNavigator.css(
                {'position': 'fixed',
                    'left' : 0,
                    'top' : 0
                });
        }

    });
};



