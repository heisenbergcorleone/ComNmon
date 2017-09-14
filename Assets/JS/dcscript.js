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


  for(var i = 0; i < result.length; i++) {
    var frame = document.createElement("iframe");
    
  if(i == result.length-1) {
    frame.onload =function () {
      $("div.buttons").show();
    }
  }

    frame.src= "templates/"+result[i];
    frame.width = (window.innerWidth/2.20);
    frame.height = (window.innerHeight/1.90);
    displayFrames.appendChild(frame);
  }

var x = document.getElementsByTagName('button');
result=[];

})

  $('#frames > button').hide();
});