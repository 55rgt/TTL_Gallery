const filterNavigator = new function () {
    const $window = $(window);
    const $mainTitle = $('.main-title');
    const $filterNavigator = $('.filter-navigator');
    const $gallery = $('.gallery');

    let scrollPosition = 'up';

    /**
     * 홈페이지 스크롤 시 필터 네비바 제어
     */
    $window.scroll(function () {

        const headerHeight = $mainTitle.height();

        if ($window.scrollTop() < headerHeight) {
            // 스크롤이 상위에 있을 때
            if (scrollPosition === 'down') {
                $filterNavigator.css('position', 'static');
                $gallery.css("margin-top", "0");

                scrollPosition = 'up';
            }
        }
        else {
            // 스크롤이 하위에 있을 때
            if (scrollPosition === 'up') {
                $filterNavigator.css(
                    {
                        'position': 'fixed',
                        'top': 0,
                        'width': $filterNavigator.parent().width()
                    });
                $gallery.css("margin-top", `${$filterNavigator.height()}px`);
                console.log($filterNavigator.height());
                scrollPosition = 'down';
            }
        }

    });

    /**
     * 홈페이지 가로로 줄일 시 필터 네비바 제어
     */
    $window.on('resize', () => {
        const headerHeight = 56 + $mainTitle.height();

        if ($window.scrollTop() > headerHeight) {
            $filterNavigator.css({
                'width': $filterNavigator.parent().width()
            });
        }
        else {
            $filterNavigator.css({
                'width': '100%'
            });
        }
    });




    /**
     * scroll-filter
     */
    const $scrollZone = $('.scroll-filter');
    const min = 0;
    const max = 20;
    const slider = new Slider($scrollZone, min, max);



    /**
     * 검색창
     */
    const $searchInput = $('input.form-control.mr-sm-2');
    const $minInput = $('input.min');
    const $maxInput = $('input.max');
    const $tagZone = $('.tag-zone');
    const tagArray = [];


    $.getJSON('../data/gallery.json', function (data) {

        // 클릭이나 검색을 하면 -> 필터
        let filterReceiver = new FilterReceiver(data);
        $searchInput.on('keyup', function (event) {


            if (event.keyCode === 13 && $searchInput.val().trim() !== '' &&
                !tagArray.includes($searchInput.val().trim()) && tagArray.length < 6) {

                const template = `<div class='tag'>${$searchInput.val().trim()}</div>`;

                $tagZone.append(template);

                tagArray.push($searchInput.val().trim());

                filterReceiver.setTags(tagArray);
                console.log(filterReceiver.getTags());

                // filterReceiver.setValue(parseInt($minInput.val()), parseInt($maxInput.val()));
                filterReceiver.setValue(slider.getLeftValue(), slider.getRightValue());
                filterReceiver.updateFilter();
                console.log(filterReceiver.getFilteredData());

                $searchInput.val('');

                $('.main-mode').empty();
                $('.list-mode').empty();
                dataLayout.setFile(filterReceiver.getFilteredData());


                /**
                 * 태그들
                 */
                const $tags = $('.tag');

                $tags.unbind();

                $tags.on('click', function () {
                    const $this = $(this);

                    tagArray.splice(tagArray.indexOf($this.text()), 1);
                    console.log(tagArray);
                    $this.remove();

                    if (tagArray.length === 0) filterReceiver.getFilter().resetData();
                    else filterReceiver.updateFilter();
                    // console.log(filterReceiver.getFilter().getCurrentData());


                    $('.main-mode').empty();
                    $('.list-mode').empty();
                    dataLayout.setFile(filterReceiver.getFilter().getCurrentData());

                });
            }
        });
    });

    /**
     * 토글 스위치 버튼
     */
    const $toggleButton = $('label.switch > input');
    const $pinterest = $('.main-mode');
    const $list = $('.list-mode');

    $toggleButton.on('click', function () {
        if ($toggleButton.is(':checked')) {

            if (!$pinterest.hasClass('display-none'))
                $pinterest.addClass('display-none');

            if ($list.hasClass('display-none'))
                $list.removeClass('display-none');
        }
        else {

            if (!$list.hasClass('display-none'))
                $list.addClass('display-none');

            if ($pinterest.hasClass('display-none'))
                $pinterest.removeClass('display-none');
        }

        $('.main-mode').imagesLoaded().progress(function () {
            $('.main-mode').masonry('layout');
        });

    });


};


var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});




