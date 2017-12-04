<?php 
    if(isset($_GET['nmonDirectory'])) {
        $nmonDir = $_GET['nmonDirectory'];
    } else {
        echo "Directory not available";
        die;
    }
?>

<html>
    <head>
        <title>
            comNmon: Directory
        </title>
        Directory Selected: <?php echo  $nmonDir?>
    </head>
    <body>


    </body>

    <script>
    
    </script>
</html>