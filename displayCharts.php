<html>
    <head>
    <!-- <link rel="stylesheet" href="./assets/css/dcstyle.css">-->
    </head>
    <body>
    
<select id="displayCharts" multiple>
    <option selected="">Choose one</option>
<?php

$dir    = '..\servers\Templates';
$files = scandir($dir,1);
foreach($files as $name) { ?>
    <option value="<?php echo $name ?>"><?php echo $name ?></option>
<?php
  } ?>

?>
</select>
<button id="displayData">Display</button><br>
<div id="frames"></div>

<script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src ="./assets/js/dcscript.js"></script>
</body>
</html>