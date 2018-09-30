class App {
  constructor(){
    this.eventHandlers();
    this.setBackgroundWidth();
    this.view = 2;
    this.allImgs = [];
    this.scrollView = new Scrollview(this);
    this.nextview = new Nextview(this);
    this.direction;
  }  
  
  setBackgroundWidth(){
    $('.background').css("width", $('nav div').eq(0).width())
    $( window ).resize(function() {
      $('.background').css("width", $('nav div').eq(0).width())
    });
  }

  eventHandlers(){
    $(document).on('click', '.gif-holder', (e) => {
      let indexInImgs = $.inArray(e.target, $('img'));
      this.nextview.start(indexInImgs);
      $('.reload').addClass('d-none');
    })

    $(document).on('click', '.reload', (e) => {
      e.preventDefault();
      $('main article').empty();
      this.scrollView.reloadGifs();
    })
    
    $(document).on('click', '.scrollview-loader', (e) => {
      e.preventDefault();
      $('main article').empty();
      this.scrollView.renderScrollView();
    })

  }

}








// app();