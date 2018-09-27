class Nextview {
  constructor(app, allImgs, clickedImg){
    this.app = app;
    this.app.view = 3;
    this.allImgs = allImgs;
    this.clickedImg = clickedImg;
    this.indexInImgs = $.inArray(this.clickedImg, this.allImgs);
    this.start();
    this.eventHandlers();
  }

  start(){
    $('main article').empty();
    this.render();
  }

  render(){
    $('main article').append(`
    <div class="row col-8 main-picture align-items-center justify-content-center align-self-center"></div>
    <div class="row justify-content-between align-items-center mt-2">
      <div class="left-picture col-3"></div>
      <button class="btn btn-primary quit-to-second">X</button>
      <div class="right-picture col-3"></div>    
    </div>
    `)
    $('.main-picture').append(this.allImgs[this.indexInImgs]);
    $('.left-picture').append(this.allImgs[this.indexInImgs-1]);
    $('.right-picture').append(this.allImgs[this.indexInImgs+1]);
  }

  eventHandlers(){
    $(document).on('click', '.quit-to-second', () => {
      $('main article').empty();
      console.log(this.app);
      this.app.view = 2;
      this.app.scrollview.loadGifs();
    })
    
    $(document).on('click', '.right-picture', () => {
      this.indexInImgs++;
      $('main article').empty();
      this.render();
    })
    
    $(document).on('click', '.left-picture', () => {
      this.indexInImgs--;
      $('main article').empty();
      this.render();
    })
  }

}