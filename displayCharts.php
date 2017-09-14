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
<div>   
    <input type="button" name="Top Summary" value="Top Summary" id="topSummary"
    style="color:red;" >
    <input type="button" name="Top Commands" value="Top Commands" id="topCommands">
    <input type="button" name="Physical CPU" value="Physical CPU" id="physicalCpu" >
    <input type="button" name="RunQ" value="RunQ" id="run_q" >
</div>
<div id="frames"></div>

<script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src ="./assets/js/dcscript.js"></script>
<script src ="./assets/js/scripts.js"></script>
</body>
</html>