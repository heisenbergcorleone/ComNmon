<?php 

$jsonData = file_get_contents("Assets\sampleData.json");
#echo $jsonData;

$dir    = 'F:\UniServerZ\www\servers\Templates';

$files2 = scandir($dir, 1);

print_r($files2);
?>