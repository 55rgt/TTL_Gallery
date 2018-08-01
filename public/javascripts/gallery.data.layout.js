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

let $row = $('.gallery').masonry({
  // set itemSelector so .grid-sizer is not used in layout
  itemSelector: '.col-md-4',
  // // use element for option
  columnWidth: '.col-md-4',
  // initLayout: false,
  percentPosition: true
});

const dataLayout = new function() {
  
  let file = [];
  let elements = [];
  
  this.setFile = (json) => {
    elements = [];
    file = [];
    file = json;
    this.firstLayout();
  };
  
  this.firstLayout = () =>{
    for(let i = 0; i < 30; i++){
      elements.push(new Element(file[i]));
    }
  };
  
  $(window).scroll(function () {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
      const count = elements.length;
      for (let i = 0; i < 30; i++) {
        if (elements.length < file.length)
          elements.push(new Element(file[count + i]));
      }
    }
  });
  
};

$.getJSON('/data/gallery.json', function (json) {
  
  // elements = _.map(json, (d) => new Element(d));
  //
  
  dataLayout.setFile(json);
  
  // file = json;
  //
  // for (let i = 0; i < 30; i++) {
  //   elements.push(new Element(json[i]));
  // }
  
});


const template = `<div class="col-md-4 padding-0">
    <div class="card mb-4 box-shadow margin-0 border-0"><img class="card-img-top background border" />
    </div>
</div>`;

function Element(data) {
  
  const $ele = $(template);
  this.$ele = $ele;
  
  $ele.find('.background').css('background-image', 'url(../images/medium/' + data.mediumFileName + ')');
  
  const num = Number(data.numberOfPeople) - 7;
  
  $row.append($ele).masonry('appended', $ele);
  
  const rowWidth = Number($row.width());
  
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


