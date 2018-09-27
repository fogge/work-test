class Scrollview {
  constructor(app) {
    this.app = app;
    this.start();
    this.eventHandlers();
  }

  start() {
    this.loadGifs();
    $(window).scroll(() => {
      if ($(window).scrollTop() >= $(document).height() - $(window).height() - 200 && $('.loader').hasClass('d-none') && this.app.view == 2) {
        this.loadGifs();
      }
    });
  }

  loadGifs(offset) {
    $('.loader').removeClass('d-none');
    $.get(`http://api.giphy.com/v1/gifs/trending?&api_key=WZO5hqaoZHky7EoOBDOcQpbUYHadDxsf&limit=30&offset=${offset || this.app.allImgs.length}`)
      .done((data) => {
        if(this.app.view == 2){
          this.app.allImgs = [...this.app.allImgs, ...this.getImageLinks(data.data)]
          $('.reload').removeClass('d-none');
          this.renderScrollView(this.getImageLinks(data.data));
          this.checkIfAllLoaded();
        } else if (this.app.direction == 'next') {
          this.app.allImgs = [...this.app.allImgs, ...this.getImageLinks(data.data)]
          $('.loader').addClass('d-none');
        } else if (this.app.direction == 'previous'){
          this.app.allImgs = [...this.getImageLinks(data.data), ...this.app.allImgs]
          $('.loader').addClass('d-none');
        }
        // Or just do $('.loader').addClass('d-none') after .done
      });
  };

  reloadGifs(){
    this.loadGifs(Math.floor(Math.random()*3000));
  }

  renderScrollView(){
    $('.reload').removeClass('d-none');
    let arr = this.app.allImgs.map(x => {
      return `
      <div class="gif-holder col-5 d-flex justify-content-center align-items-center my-3">
      ${x}
      </div>
      `    
    })
    $('.container article').append(arr);
  }
  
  /**
  * Check each image if it has loaded. 
  * @author Andreas
  */
  checkIfAllLoaded() {
    let imgs = $('img'),
      imgLength = imgs.length,
      counter = imgLength - 30;

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

  getImageLinks(arr) {
    return arr.map(gifObj => {
      return `
    <img src="${gifObj.images.original.url}" alt="${gifObj.title}" class="col-12 picture p-0">
    `
    })
  }

  eventHandlers(){
    $(document).on('click', '.reload', (e) => {
      e.preventDefault();
      $('main article').empty();
      this.app.allImgs = [];
      this.reloadGifs();
    })
  }

}