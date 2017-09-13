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
    console.log(options)

  for (var i=0; i<options.length; i++) {
    opt = options[i];

    if (opt.selected && result.length < 4) {
      result.push(opt.value);
    }
  }
  console.log(result);


  for(var i = 0; i < result.length; i++) {
    var frame = document.createElement("iframe");
    frame.src= "templates/"+result[i];
    console.log(frame);
    console.log(frame.src);
    frame.width = (window.innerWidth/2.20);
    console.log(window.innerWidth,window.innerHeight)
    frame.height = (window.innerHeight/1.90);
    displayFrames.appendChild(frame);
  }

result=[];
})