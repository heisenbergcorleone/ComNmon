var result = []; // this global array stores the selected file names

$(document).ready(function(){
var button = document.getElementById("displayData");
var firstFrame = document.getElementById("one");
var displayFrames = document.getElementById("frames");
var currentFrame;
window.iframe_charts = []; // this array stores chart data -> used for syncing the mouse click event

button.addEventListener("click", function(){
    result = [];
    var divElem = document.getElementById("frames");
    $("#frames").empty();

    var select = document.getElementsByTagName('select')[0];
    var options = select && select.options;
    var opt;

  for (var i=0; i<options.length; i++) {
    opt = options[i];

    if (opt.selected && result.length < 4 && opt.value != "Select File(s)") {
      result.push(opt.value);
    }
  }

  var fileNameCounter = 0;
// a recursive loadIframe function is used in order to make the iframes load synchronously
  var loadIframe = function() {
    if (fileNameCounter == result.length){
      syncScroll();
      $("div.buttons").show();  //  the buttons are only displayed when all the iframes are loaded
      return;
    }
    
    var frame = document.createElement("iframe");
    frame.src = "default_file.html"; // a single html file is used as a blueprint for all the iframes -> data of different iframes will appened into this file
    frame.id = parseInt((fileNameCounter));
    frame.width = (window.innerWidth/2.20);
    frame.height = (window.innerHeight/1.90);
    displayFrames.appendChild(frame);
    
    
    frame.onload = function() {
      currentFrame = frame;
      fetchTable(result[fileNameCounter]); // this function fetches the table element along with its children and appends it into the default file
      fecthFileName(result,fileNameCounter);
      fileNameCounter++;
      loadIframe();
    }

  };

  loadIframe();

  function syncScroll() {
    //console.log("scrollbars will be synced!");
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

  function fecthFileName (result,fileNameCounter) {
    var frame = document.getElementsByTagName("iframe")[fileNameCounter];
    var frame_dom = frame.contentWindow.document;
    frame_dom.getElementById("filename").innerText = result[fileNameCounter];
  };

function fetchTable (filename) {
  var filelocation = "./Templates/"+filename;
  readTextFile(filelocation); 
};


function readTextFile(file) {
  // ajax is used to convert the whole file into string and extract the required information
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                //alert(allText);
                get_table_contents(allText); 
            }
        }
    }
    rawFile.send(null);
}

  function get_table_contents (filetext) { // this function reads the data and selects the required information
    var table_contents = "";
    var condition = false;

    for (var i = 0; i < filetext.length ; i++) {
      
      
      if (filetext.charAt(i) == "<" && filetext.charAt(i+1) == "/" && filetext.charAt(i+2) == "b" && filetext.charAt(i+3) == "o" ) {
        appendTable(table_contents);
        table_contents = "";
        break;
      }
      


      if(filetext.charAt(i) == "<" && filetext.charAt(i+1) == "t" && filetext.charAt(i+2) == "a" && filetext.charAt(i+3) == "b" ) {
        condition = true;
      }

      if (condition) {
        table_contents += filetext.charAt(i);
      }
    
    
    };
  };

  function appendTable (table_contents) {
    var table_div = currentFrame.contentWindow.document.getElementById("table");
    table_div.innerHTML = table_contents;
  }


}) // button click event closes

// the resize jquery method syncs the window's size with the iframes
$(window).resize(function() {
  if($("iframe").length){
    $("iframe").each(function() {
      this.height = window.innerHeight/1.90;
      this.width = window.innerWidth/2.20;
    })
  }; 
});





});// window.ready closes