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
        <script>var dirList_array = <?php echo json_encode($dates) ?>;</script>
        <link rel="stylesheet" href="nmonDirStyles.css">
    </head>
    <body>
    <div class="header">
      <?php include_once('header.php') ?>
    </div>
    <div class="button top">
        <button id="some" onclick="heya(this)">Submit</button>
    </div>
    <div class="content"><br>
      <div>
        <!-- add the two or three buttons here -->
      </div>
      <div class="main">
          <div class="directorylist" style="width:35%; float:left">
            <button id="loadall" onclick="addDirectory(this)" style="position:relative; left:48%;">Load All</button>
            <br><br>
            <table id="directory_list_table">
              <tr>
                <th>Directory List</th>
                <th>Checkbox all: <input type="checkbox" onchange="checkall(this)" id="checkbox_all"></th>
              </tr>
            </table>
          </div>
          <div class="calendar" style="width: 35%; float:right">
            CALENDAR
          </div>
          <br style="clear:both;"/>
          <br>
      </div>


    </div>
    <div class="button bottom">
        <button onclick="handleEvents()">Submit</button>
    </div>
    <br><br>
    <div class ="footer">
      <footer>
        <?php include_once('footer.php') ?>
      </footer>
    </div>

    <script src="nmondir.js" charset="utf-8"></script>
    </body>
</html>
