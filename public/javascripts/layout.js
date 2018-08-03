const filterNavigator = new function () {
  const $window = $(window);
  const $mainTitle = $('.main-title');
  const $filterNavigator = $('.filter-navigator');
  const $gallery = $('.gallery');
  
  let scrollPosition = 'up';
  const filterNavigatorMargin = 10;
  
  /**
   * 홈페이지 스크롤 시 필터 네비바 제어
   */
  $window.scroll(function () {
    
    const headerHeight = $mainTitle.height() + 10; // + margin-top
    
    if ($window.scrollTop() < headerHeight) {
      // 스크롤이 상위에 있을 때
      if (scrollPosition === 'down') {
        $filterNavigator.css({
          'position': 'static',
          'margin': `${filterNavigatorMargin}px 0`
        });
        $gallery.css("margin", "0");
        
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
            'width': $filterNavigator.parent().width(),
            'margin': 0
          });
        $gallery.css("margin-top", `${$filterNavigator.height() + filterNavigatorMargin * 2}px`);
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
  
  let slider;
  
  /**
   * 검색창
   */
  const $searchInput = $('input.form-control.mr-sm-2');
  const $searchButton = $('.search-bar');
  const $tagZone = $('.tag-zone');
  const tagArray = [];
  
  
  $.getJSON('../data/gallery.json', function (data) {
    
    
    let min = 10000, max = -1;
    
    _.forEach(JSON.parse(JSON.stringify(data)), function (v) {
      
      if (parseInt(v.numberOfPeople) < min) min = parseInt(v.numberOfPeople);
      if (parseInt(v.numberOfPeople) > max) max = parseInt(v.numberOfPeople);
      
    });
    
    
    slider = new Slider($scrollZone, min, max);
    
    $(document).off().on('mouseup', function (event) {
      
      let left = slider.getLeftValue();
      let right = slider.getRightValue();
      
      slider.mouseUp(event);
      filterReceiver.setValue(slider.getLeftValue(), slider.getRightValue());
      filterReceiver.updateFilter();
      
      if (slider.isValueChanged()) {
        
        $('.main-mode').empty();
        $('.list-content').empty();
        dataLayout.setFile(filterReceiver.getFilter().getCurrentData());
      }
    });
    
    
    // 클릭이나 검색을 하면 -> 필터
    let filterReceiver = new FilterReceiver(data);
    
    $searchButton.off().on('click', function () {
      if(!tagArray.includes($searchInput.val().trim()) && tagArray.length < 6)
      {
        filterResult(filterReceiver);
      }
    });
    
    $searchInput.off().on('keyup', function (event) {
      
      if (event.keyCode === 13 && $searchInput.val().trim() !== '' &&
        !tagArray.includes($searchInput.val().trim()) && tagArray.length < 6) {
        
        filterResult(filterReceiver);
        
      }
    });
  });
  
  
  function filterResult(filterReceiver) {
    
    
    const template = `<div class='tag'>${$searchInput.val().trim()}</div>`;
    if ($searchInput.val().length > 0)
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
    $('.list-content').empty();
    dataLayout.setFile(filterReceiver.getFilteredData());
    
    
    /**
     * 태그들
     */
    const $tags = $('.tag');
    
    $tags.unbind();
    
    $tags.on('click', function () {
      const $this = $(this);
      
      console.log('ㄴㄴㄴ', tagArray.indexOf($this.text()));
      tagArray.splice(tagArray.indexOf($this.text()), 1);
      console.log(tagArray);
      $this.remove();
      
      if (tagArray.length === 0) filterReceiver.getFilter().resetData();
      else filterReceiver.updateFilter();
      // console.log(filterReceiver.getFilter().getCurrentData());
      
      
      $('.main-mode').empty();
      $('.list-content').empty();
      dataLayout.setFile(filterReceiver.getFilter().getCurrentData());
      
    });
    
  }
  
  
  /**
   * 토글 스위치 버튼
   */
  const $toggleButton = $('label.switch > input');
  const $mainMode = $('.main-mode');
  const $list = $('.list-mode');
  
  $toggleButton.on('click', function () {
    if ($toggleButton.is(':checked')) {
      
      if (!$mainMode.hasClass('display-none'))
        $mainMode.addClass('display-none');
      
      if ($list.hasClass('display-none'))
        $list.removeClass('display-none');
    }
    else {
      
      if (!$list.hasClass('display-none'))
        $list.addClass('display-none');
      
      if ($mainMode.hasClass('display-none'))
        $mainMode.removeClass('display-none');
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




