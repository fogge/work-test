function app(){
  loadGifs();
  $(window).scroll(() => {
    if($(window).scrollTop() >= $(document).height() - $(window).height() -200 && $('.loader').hasClass('d-none')) {
      loadGifs();
    }
  });
}

function loadGifs(){
  let offset = $('img').length;
  $('.loader').removeClass('d-none');
  $.get(`http://api.giphy.com/v1/gifs/trending?&api_key=ANnB9Knl5Ao5IfSVzu1bUTeymhbRTYLY&limit=20&offset=${offset}`)
  .done((data) => { 
    $('.container article').append(getRenderingItems(data.data));
    checkIfAllLoaded();
  });
};


function checkIfAllLoaded() {
  let imgs = $('img'),
  imgLength = imgs.length,
  counter = imgLength - 20;

  imgs.each((i, x) => {
    console.log('this is in each statement!', x);
    x.addEventListener( 'load', increaseAndCheck, false );

  });
  function increaseAndCheck(){
    counter++;
    console.log(counter, imgLength);
    if (counter == imgLength) {
      console.log('hellooo');
      $('.loader').addClass('d-none');
    }
  }
}


function getRenderingItems(arr){
  return arr.map(gifObj => {
    return `
    <div class="gif-holder col-6 d-flex align-items-center justify-content-center">
      <img src="${gifObj.images.original.url}" alt="Another gif bites the dust" class="col-12">
    </div>
    `
  })
}

app();