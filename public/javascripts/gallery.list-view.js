// $.getJSON('/data/gallery.json', function (json) {
//
//   let elements = _.map(json, (d) => new ListElement(d));
//
//   // for (let i = 0; i < 60; i++) {
//   //   elements.push(new Element(json[i]));
//   // }
//   console.log('sss');
// });


const listTemplate = `<div class="list-view">
    <img class="picture" alt="Card image cap" />
    <div class="filename"></div>
    <div class="tags"></div>
</div>`;

const $list = $('.list-mode');
function ListElement(data) {
  
  const $ele = $(listTemplate);
  
  $ele.find('img').attr('src', '../images/small/' + data.smallFileName);
  
  $ele.find('.filename').text(data.smallFileName);
  // $ele.find('.text-muted').text(data.date);
  // $ele.find('.btn-group').attr('href', data.siteUrl);
  
  $list.append($ele);
  
  for (let i = 0; i < data.tags.length; i++) {
    $ele.find('.tags').append(`<div class = tag>${data.tags[i]}</div>`);
  }
  
  
  return this;
}

