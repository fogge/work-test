class Scrollview {
  constructor(app) {
    this.app = app;
    this.offset = 0;
    this.loadAmount = 30;
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
    $('.loader').removeClass('d-none');
    $.get(`http://api.giphy.com/v1/gifs/trending?&api_key=WZO5hqaoZHky7EoOBDOcQpbUYHadDxsf&limit=${this.loadAmount}&offset=${this.offset}`)
      .done((data) => {
        if(this.app.view == 2){
          let newImages = this.getImageLinks(data.data);
          this.app.allImgs = [...this.app.allImgs, ...newImages];
          this.renderNewGifs(newImages);
          this.checkIfAllLoaded();
        } else if (this.app.direction == 'next') {
          this.app.allImgs = [...this.app.allImgs, ...this.getImageLinks(data.data)];
          $('.loader').addClass('d-none');
        } else if (this.app.direction == 'previous'){
          this.app.allImgs = [...this.getImageLinks(data.data), ...this.app.allImgs];
          $('.loader').addClass('d-none');
        }
      });
  };

  reloadGifs(){
    this.app.allImgs = [];
    this.offset = Math.floor(Math.random()*3000)
    this.loadGifs();
  }

  renderNewGifs(arr){
    $('.reload').removeClass('d-none');
    arr = arr.map(x => {
      return `
      <div class="card p-4 gif-holder d-none">
      ${x}
      </div>
      `    
    })
    $('.container article.card-columns').append(arr);
  }

  renderScrollView(){
    $('.reload').removeClass('d-none');
    let arr = this.app.allImgs.map(x => {
      return `
      <div class="card p-4 gif-holder">
      ${x}
      </div>
      `    
    })
    $('.container article.card-columns').append(arr);
  }
  
  /**
  * Check each image if it has loaded. 
  * @author Andreas
  */
  checkIfAllLoaded() {
    let imgs = $('.gif-holder.d-none').find('img'),
      imgLength = imgs.length,
      counter = 0;

    imgs.each((i, x) => {
      x.addEventListener('load', increaseAndCheck, false);
    });

    function increaseAndCheck() {
      counter++;
      if (counter == imgLength) {
        $('.loader').addClass('d-none');
        $('.gif-holder.d-none').removeClass('d-none');
      }
    }
  }

  getImageLinks(arr) {
    this.offset += arr.length;
    return arr.map(gifObj => {
      return `
    <img src="${gifObj.images.original.url}" alt="${gifObj.title}" class="col-12 p-0 picture">
    `
    })
  }

}