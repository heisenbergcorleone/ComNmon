$(document).ready(function(){

var result = [];
var button = document.getElementById("displayData");
var firstFrame = document.getElementById("one");
var displayFrames = document.getElementById("frames");

button.addEventListener("click", function(){

    var divElem = document.getElementById("frames");
    $("#frames").empty();

    var select = document.getElementsByTagName('select')[0];
    var options = select && select.options;
    var opt;

  for (var i=0; i<options.length; i++) {
    opt = options[i];

    if (opt.selected && result.length < 4 && opt.value != "Choose one") {
      result.push(opt.value);
    }
  }

  var fileNameCounter = 0;

  var loadIframe = function() {
    if (fileNameCounter == result.length){
      syncScroll();
      syncCursor();
      $("div.buttons").show(); 
      result=[];
      return;
    }
    
    var frame = document.createElement("iframe");
    frame.src = "Templates/"+ result[fileNameCounter];
    frame.width = (window.innerWidth/2.20);
    frame.height = (window.innerHeight/1.90);
    displayFrames.appendChild(frame);
    
    
    frame.onload = function() {
      console.log(result[fileNameCounter]);
      fileNameCounter++;
      loadIframe();
    }

  };

  loadIframe();

  function syncScroll() {
    console.log("scrollbars will be synced!");
    var iframeArray = $("iframe").map(function(){return this});
     // syncs the scrollbars of all the iframes
     iframeArray.each(function(e){
      var frElement = iframeArray[e];
      frElement.contentWindow.onscroll = function() {
        var xPos = frElement.contentWindow.scrollX;
        var yPos = frElement.contentWindow.scrollY;
        // applies the positions of scrollbar of one iframe element to the rest
        iframeArray.each(function(x){
          if(frElement != iframeArray[x]){ // optional!
            iframeArray[x].contentWindow.scrollTo(xPos,yPos);
          }
        })
      }
    })
  };

  function syncCursor() {

    var iframeEl = document.getElementsByTagName("iframe");
    iframeEl[0].contentWindow.document.body.addEventListener("click", function(event){
      console.log(event.clientX,event.clientY);
    });

  }






})

  $('#frames > button').hide();
});