let mynewdata;

let xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=ANnB9Knl5Ao5IfSVzu1bUTeymhbRTYLY&limit=20")
.done((data) => { 
  mynewdata = data;
})
.always(() => {
  $('.loader').hide();
}).then(startEverything);

function startEverything(){
  let renderGifs = getRenderingItems(mynewdata.data)
  $('.container').append(renderGifs);
  $(window).scroll(() => {
    console.log($(window).scrollTop(), $(document).height(),  $(window).height())
    if($(window).scrollTop() >= $(document).height() - $(window).height() -2) {
      console.log('i should render more now...')
          // ajax call get data from server and append to the div
          $('.loader').show();
          xhr = $.get("http://api.giphy.com/v1/gifs/search?q=cats&api_key=ANnB9Knl5Ao5IfSVzu1bUTeymhbRTYLY&limit=20")
          .done((data) => { 
          renderGifs = getRenderingItems(data.data);
          $('.container').append(renderGifs);
          }).always(() => $('.loader').hide());
    }
  });
}

function getRenderingItems(arr){
  return arr.map(gifObj => {
    return `
    <div class="gif-holder">
      <img src="${gifObj.images.original.url}" alt="Another gif bites the dust" class="gif">
    </div>
    `
  })
}