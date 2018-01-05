<?php
$fileobject="";
if(isset($_POST['fileobject'])){
    $fileobject= json_encode($_POST['fileobject']);
    
    echo "<script>console.log(JSON.parse($fileobject))</script>";
} else {
    echo "<h1>INVALID REQUEST</h1>";
    die;
}
?>
<html>
    <head>
    </head>
    <body>
        Hello
        <div id="fileobject"></div>
    <script>
        var x = <?php echo $fileobject;?>;
        document.getElementById("fileobject").innerText = x;
        console.log(x);
    </script>
    </body>
</html>