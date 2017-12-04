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
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="styles.css">
        Directory Selected: <?php echo  $nmonDir?>
    </head>
    <body>
        <div id="homepage" style='display: block;'>
            
            <div class="topleft">
                <table id="dir_log" style='display: block;'>
                </table>
            </div>
        </div>

    <script>

    </script>
    </body>
</html>