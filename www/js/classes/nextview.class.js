class Nextview {
  constructor(app) {
    this.app = app;    
    this.indexInImgs;
  }

  start(indexInImgs) {
    this.app.view = 3;
    this.indexInImgs = indexInImgs;
    this.eventHandlers();
    $('main article').empty();
    this.render();
  }

  render() {
    $('main .next-view-container').append(`
    <div class="row main-picture align-self-center mt-3 col-10 p-3"></div>
    <div class="row col-10 justify-content-between align-items-center mt-4 flex-nowrap p-0 mb-4">
      <div class="left-picture col-4 card p-2 p-md-3"></div>
      <button class="quit-to-second" title="Go back to scrolling mode"><i class="fas fa-times"></i></button>
      <div class="right-picture col-4 card p-2 p-md-3"></div>
    </div>
    `)
    $('.main-picture').append(this.app.allImgs[this.indexInImgs]);
    $('.left-picture').append(this.app.allImgs[this.indexInImgs - 1]);
    $('.right-picture').append(this.app.allImgs[this.indexInImgs + 1]);
  }

  eventHandlers() {
    $(document).on('click', '.quit-to-second', () => {
      $('main article').empty();
      this.app.view = 2;
      // fixa denna
      this.app.scrollView.renderScrollView(this.app.allImgs);
    })

    $(document).on('click', '.right-picture', () => {
      if (!this.app.allImgs[this.indexInImgs + 2]) {
        this.app.direction = 'next';
        this.app.scrollView.loadGifs();
      } else {
        this.indexInImgs++;
        $('main article').empty();
        this.render();
      }
    })

    $(document).on('click', '.left-picture', () => {
      if (!this.app.allImgs[this.indexInImgs - 2]) {
        this.app.direction = 'previous';
        this.app.scrollView.loadGifs();
        this.indexInImgs = 31;
      } else {
        this.indexInImgs--;
        $('main article').empty();
        this.render();
      }
    })
  }

}