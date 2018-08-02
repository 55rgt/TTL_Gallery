// let $row = $('.gallery').masonry({
//   // set itemSelector so .grid-sizer is not used in layout
//   itemSelector: '.col-md-4',
//   // // use element for option
//   columnWidth: '.col-md-4',
//   // initLayout: false,
//   percentPosition: true
// });
//
// function DataLayout() {
//   let file;
//   let elements = [];
//   $.getJSON('/data/gallery.json', function (json) {
//
//     file = JSON.parse(JSON.stringify(json));
//
//     for (let i = 0; i < 30; i++) {
//       elements.push(new Element(json[i]));
//     }
//
//   });
//
//   const template = `<div class="col-md-4 padding-0">
//     <div class="card mb-4 box-shadow margin-0 border-0"><img class="card-img-top background border" />
//     </div>
// </div>`;
//
//   function Element(data) {
//
//     const $ele = $(template);
//
//     $ele.find('.background').css('background-image', 'url(../images/medium/' + data.mediumFileName + ')');
//
//     $row.append($ele).masonry('appended', $ele);
//
//     const rowWidth = Number($row.width());
//
//     const unit = Math.floor(rowWidth / 6);
//
//     if (Number(data.numberOfPeople) < 4) {
//       $ele.css('max-width', `${unit}px`);
//     }
//     else if (Number(data.numberOfPeople) > 3 && Number(data.numberOfPeople) < 8) {
//       $ele.css('max-width', `${unit * 2}px`);
//     }
//     else {
//       $ele.attr('id', Number(data.numberOfPeople));
//       $ele.css('max-width', `${unit * 3}px`);
//     }
//
//     if (Number(data.numberOfPeople) < 4) {
//       $ele.find('img').css('height', `${unit}px`);
//     }
//     else if (Number(data.numberOfPeople) > 3 && Number(data.numberOfPeople) < 8) {
//       $ele.find('img').css('height', `${unit * 2}px`);
//     }
//     else {
//       $ele.find('img').css('height', `${unit * 2}px`);
//     }
//
//     this.hasTag = (val) => {
//
//       for (let i = 0; i < data.tag.length; i++) {
//         const tagValue = data.tag[i].toLowerCase();
//         if (tagValue.indexOf(val) !== -1) {
//
//           if ($ele.hasClass('display-none'))
//             $ele.removeClass('display-none');
//
//           break;
//         }
//         else {
//
//           if (!$ele.hasClass('display-none'))
//             $ele.addClass('display-none');
//
//         }
//       }
//
//     };
//
//     $row.imagesLoaded().progress(function () {
//       $row.masonry('layout');
//     });
//
//
//     return this;
//   }
//
//   $row.imagesLoaded().progress(function () {
//     $row.masonry('layout');
//   });
//
//   $(window).scroll(function () {
//     var scrollHeight = $(document).height();
//     var scrollPosition = $(window).height() + $(window).scrollTop();
//     if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
//       const count = elements.length;
//       for (let i = 0; i < 30; i++) {
//         if (elements.length < file.length)
//           elements.push(new Element(file[count + i]));
//       }
//     }
//   });
// }

let $row = $('.main-mode').masonry({
  // set itemSelector so .grid-sizer is not used in layout
  itemSelector: '.col-md-4',
  // // use element for option
  columnWidth: '.col-md-4',
  // initLayout: false,
  percentPosition: true
});

const $list = $('.list-mode');

const dataLayout = new function () {
  
  let file = [];
  let mainElements = [];
  // let listElements = [];
  this.setFile = (json) => {
    mainElements = [];
    file = [];
    file = JSON.parse(JSON.stringify(json));
    this.firstLayout(file.length);
  };
  
  this.firstLayout = (length) => {

    let maxIndex = length < 30 ? length : 30;

    for (let i = 0; i < maxIndex; i++) {
      mainElements.push(new Element(file[i]));
    }
  };
  
  $(window).scroll(function () {
    let scrollHeight = $(document).height();
    let scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
      const count = mainElements.length;
      for (let i = 0; i < 30; i++) {
        if (mainElements.length < file.length)
          mainElements.push(new Element(file[count + i]));
      }
    }
  });
  
};

$.getJSON('/data/gallery.json', function (json) {

  dataLayout.setFile(json);
  
});


const mainTemplate = `<div class="col-md-4 padding-0">
    <div class="card mb-4 box-shadow margin-0 border-0"><img class="card-img-top background border"/>
    </div>
</div>`;

const listTemplate = `<div class="list-view">
    <img class="img picture" alt="Card image cap" />
    <div class="filename"></div>
    <div class="tags"></div>
</div>`;



function Element(data) {

  console.log(data);
  const $ele = $(mainTemplate);

  $ele.find('img').attr('src', '../images/medium/' + data.mediumFileName);

  let $img = $('img');

  $img.on('click', function () {
      console.log('clicked');
      window.open(this.src);
  });
  
  $row.append($ele).masonry('appended', $ele);
  
  const rowWidth = Number($('.gallery').width());
  
  const unit = Math.floor(rowWidth / 6);

  if (Number(data.numberOfPeople) < 4) {
    $ele.css('max-width', `${unit}px`);
  }
  else if (Number(data.numberOfPeople) > 3 && Number(data.numberOfPeople) < 8) {
    $ele.css('max-width', `${unit * 2}px`);
  }
  else {
    $ele.attr('id', Number(data.numberOfPeople));
    $ele.css('max-width', `${unit * 3}px`);
  }
  
  if (Number(data.numberOfPeople) < 4) {
    $ele.find('img').css('height', `${unit}px`);
    // $ele.find('.card-img-top').css('max-height', width + 'px !important');
  }
  else if (Number(data.numberOfPeople) > 3 && Number(data.numberOfPeople) < 8) {
    $ele.find('img').css('height', `${unit * 2}px`);
    // $ele.find('.card-img-top').css('max-height', width + 'px !important');
  }
  else {
    $ele.find('img').css('height', `${unit * 2}px`);
    // $ele.find('.card-img-top').css('max-height', width * (2 / 3) + 'px !important');
  }

  
  
  const $listEle = $(listTemplate);
  
  $listEle.find('img').attr('src', '../images/small/' + data.smallFileName);
  
  $listEle.find('.filename').text(data.smallFileName);
  // $ele.find('.text-muted').text(data.date);
  // $ele.find('.btn-group').attr('href', data.siteUrl);
  
  $list.append($listEle);
  
  for (let i = 0; i < data.tags.length; i++) {
    $listEle.find('.tags').append(`<div class = tag>${data.tags[i]}</div>`);
  }
  
  
  
  
  this.hasTag = (val) => {
    
    for (let i = 0; i < data.tags.length; i++) {
      const tagValue = data.tags[i].toLowerCase();
      if (tagValue.indexOf(val) !== -1) {
        
        if ($ele.hasClass('display-none'))
          $ele.removeClass('display-none');
        
        break;
      }
      else {
        
        if (!$ele.hasClass('display-none'))
          $ele.addClass('display-none');
        
      }
    }
    
  };
  
  $row.imagesLoaded().progress(function () {
    $row.masonry('layout');
  });
  
  
  return this;
}

$row.imagesLoaded().progress(function () {
  $row.masonry('layout');
});




//
// function ListElement(data) {
//
//   return this;
// }
//

