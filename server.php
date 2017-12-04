<?php
if(isset($_GET['directory_location'])) { // the value is again checked if it's empty of or in case the file is used again for another ajax call
        $dir_location = $_GET['directory_location'];
        if (file_exists($dir_location)) {
            echo "available";
        } else {
            echo "not_available";
        };
    } 
?>