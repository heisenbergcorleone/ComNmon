<!DOCTYPE html>
<html>

   <head>
   <meta charset="utf-8">
    <title> Welcome </title>
    
    </head>
   
   <body>
   <p>Hello files </p>
<?php

$searchDir = "./Templates"; 
// './';
$searchString = 'nginx';

$showme = shell_exec('grep -Ri "'.$searchString.'" '.$searchDir);
print_r($showme);
echo '<pre>'.$showme.'</pre>';


//$result= shell_exec('echo hello');
$result= shell_exec("grep -E nginx chart.html ");
print_r($result);
echo '<pre>'.$result.'</pre>';

?>
   
<?php
    #echo shell_exec('D:\UniServerZ\www\Jmeter\Templates\chart.html');
    #echo "done";
?>   
  
   </body>
</html>
