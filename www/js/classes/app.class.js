class App {
  constructor(){
    this.eventHandlers();
    this.setBackgroundWidth();
    this.view = 2;
    this.allImgs = [];
    this.scrollView = new Scrollview(this);
    this.direction;
  }  
  
  setBackgroundWidth(){
    $('.background').css("width", $('nav div').eq(0).width())
  }

  eventHandlers(){
    $(document).on('click', '.gif-holder', (e) => {
      let indexInImgs = $.inArray(e.target, $('img'));
      this.nextview = new Nextview(this, indexInImgs);
      $('.reload').addClass('d-none');
    })
  }

}








// app();