$.getJSON('/data/gallery.json', function (json) {
  
  let elements = [];
  
  elements = _.map(json, (d) => new Element(d));
  
  // for (let i = 0; i < 60; i++) {
  //   elements.push(new Element(json[i]));
  // }
  
});


const template = `<div class="list-view">
    <img class="picture" alt="Card image cap" />
    <div class="filename"></div>
    <div class="tags"></div>
</div>`;

const $gallery = $('.gallery');
function Element(data) {
  
  const $ele = $(template);
  
  $ele.find('img').attr('src', '../images/small/' + data.smallFileName);
  
  $ele.find('.filename').text(data.smallFileName);
  // $ele.find('.text-muted').text(data.date);
  // $ele.find('.btn-group').attr('href', data.siteUrl);
  
  
  $gallery.append($ele);
  for (let i = 0; i < data.tags.length; i++) {
    console.log(data.tags[i]);
    $ele.find('.tags').append(`<div class = tag>${data.tags[i]}</div>`);
  }
  
  
  return this;
}

