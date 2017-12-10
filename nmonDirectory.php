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
        <link rel="stylesheet" href="nmonDirStyles.css">
    </head>
    <body>
    <div class="header">
      <?php include_once('header.php') ?>
    </div>
    <div class="button top">
        <button>Submit</button>
    </div>
    <div class="directorylist">
        -some-data-here-
    </div>
    <div class="button bottom">
        <button >Submit</button>
    </div>
    <br>
    <div class ="footer">
      <footer>
      <?php include_once('footer.php') ?>
      </footer>
    </div>


    <script>
      var dirlist = document.getElementsByClassName("directorylist")[0];
      var footer = document.getElementsByClassName("footer")[0];
      const docheight = $(document).height();
    </script>

    </body>
</html>
