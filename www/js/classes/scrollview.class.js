class Scrollview {
  constructor(app) {
    this.app = app;
    this.start();
  }

  start() {
    this.loadGifs();
    $(window).scroll(() => {
      if ($(window).scrollTop() >= $(document).height() - $(window).height() - 200 && $('.loader').hasClass('d-none') && this.app.view == 2) {
        this.loadGifs();
      }
    });
  }

  loadGifs() {
    let offset = $('img').length;
    $('.reload').removeClass('d-none');
    $('.loader').removeClass('d-none');
    $.get(`http://api.giphy.com/v1/gifs/trending?&api_key=ANnB9Knl5Ao5IfSVzu1bUTeymhbRTYLY&limit=20&offset=${offset}`)
      .done((data) => {
        $('.container article').append(this.getRenderingItems(data.data));
        this.checkIfAllLoaded();
      });
  };


  checkIfAllLoaded() {
    let imgs = $('img'),
      imgLength = imgs.length,
      counter = imgLength - 20;

    imgs.each((i, x) => {
      x.addEventListener('load', increaseAndCheck, false);
    });

    function increaseAndCheck() {
      counter++;
      if (counter == imgLength) {
        $('.loader').addClass('d-none');
      }
    }
  }

  getRenderingItems(arr) {
    return arr.map(gifObj => {
      return `<div class="gif-holder col-5 d-flex justify-content-center align-items-center my-3">
    <img src="${gifObj.images.original.url}" alt="Another gif bites the dust" class="col-12 picture p-0">
    </div>
    `
    })
  }

}