const filterNavigator = new function () {
  const $window = $(window);
  const $mainTitle = $('.main-title');
  const $filterNavigator = $('.filter-navigator');
  
  let scrollPosition = 'up';
  
  /**
   * 홈페이지 스크롤 시 필터 네비바 제어
   */
  $window.scroll(function () {
    
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
          {
            'position': 'fixed',
            'top': 0,
            'width': $filterNavigator.parent().width()
          });
        
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
        
        filterReceiver.setValue(parseInt($minInput.val()), parseInt($maxInput.val()));
        filterReceiver.updateFilter();
        console.log(filterReceiver.getFilteredData());
        
        $searchInput.val('');
  
        $('.gallery').empty();
        dataLayout.setFile(filterReceiver.getFilter().getCurrentData());
  
  
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
          else filterReceiver.getFilter().filterByTagNames(tagArray, false);
          // console.log(filterReceiver.getFilter().getCurrentData());
          
          
          $('.gallery').empty();
          dataLayout.setFile(filterReceiver.getFilter().getCurrentData());
          
        });
      }
    });
  });
  
  /**
   * 토글 스위치 버튼
   */
  const $toggleButton = $('label.switch > input');
  
  $toggleButton.on('click', function () {
    if ($toggleButton.is(':checked')) {
      // 버튼이 오른쪽에 있을 때
    }
    else {
      // 버튼이 왼쪽에 있을 때
    }
  })
  
};



