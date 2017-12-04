<?php 
    if(isset($_GET['nmonDirectory'])) {
        $nmonDir = $_GET['nmonDirectory'];
        $dates = scandir($nmonDir,1);
        // removes dot and double dot from the array
        if (($dotkey = array_search('.', $dates)) && ($doubledotkey = array_search('..', $dates))) {
            unset($dates[$dotkey]);
            unset($dates[$doubledotkey]);
        }
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
    </head>
    <body>
    <div class="information">
        Directory Selected: <?php echo  "<b>".$nmonDir ."</b>" ?><br>
        Number of Sub-directories: <?php echo "<b>".sizeof($dates)."</b>"?>
    </div>

    <script>

    </script>
    </body>
</html>