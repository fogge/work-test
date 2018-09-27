class App {
  constructor(){
    this.scrollview = new Scrollview(this);
    this.eventHandlers();
    this.view = 2;
  }  
  
  eventHandlers(){
    let that = this;
    $(document).on('click', '.gif-holder', function() {
      const thisImg = $(this).find('img')[0];
      const allImgs = $('img');
      this.nextview = new Nextview(that, allImgs, thisImg);
      $('.reload').addClass('d-none');
    })
  }

}








// app();