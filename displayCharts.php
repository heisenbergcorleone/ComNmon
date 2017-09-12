
<select id="displayCharts" multiple>
    <option selected="">Choose one</option>
<?php

$dir    = 'F:\UniServerZ\www\servers\Templates';
$files = scandir($dir);
//print_r($files);
foreach($files as $name) { ?>
    <option value="<?php echo $name ?>"><?php echo $name ?></option>
<?php
  } ?>

?>
</select>
<button id="displayData">Display</button>
<script>
var array = [];
var button = document.getElementById("displayData");

button.addEventListener("click", function(){
    var select = document.getElementsByTagName('select')[0];
    var result = [];
    var options = select && select.options;
    var opt;
    console.log(options)

  for (var i=0; i<options.length; i++) {
    opt = options[i];

    if (opt.selected && result.length <4) {
      result.push(opt.value || opt.text);
    }
  }
  console.log(result);


})


</script>