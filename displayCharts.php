<html>
    <head>
    <link rel="stylesheet" href="styles.css">
    </head>
    <body>
<select id="displayCharts" multiple>
    <option selected="">Choose one</option>
<?php

$dir    = 'F:\UniServerZ\www\servers\Templates';
$files = scandir($dir);
foreach($files as $name) { ?>
    <option value="<?php echo $name ?>"><?php echo $name ?></option>
<?php
  } ?>

?>
</select>
<button id="displayData">Display</button><br>
<div id="frames"></div>

<script>
var result = [];
var button = document.getElementById("displayData");
var firstFrame = document.getElementById("one");
var displayFrames = document.getElementById("frames");

button.addEventListener("click", function(){
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
    console.log(frame.src);
    frame.width = "600"; frame.height = "600";
    displayFrames.appendChild(frame);
  }

result=[];
})


/*var secondFrame = document.getELementById("two");
var thirdFrame = document.getELementById("three");
var fourthFrame = document.getELementById("four");
*/



</script>
</body>
</html>