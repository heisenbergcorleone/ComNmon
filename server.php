<?php
     $dir_location = $_GET['directory_location'];
     
     if($dir_location != "") { // the value is again checked if it's empty of or in case the file is used again for another ajax call
        if (file_exists($dir_location)) {
            $dates = scandir($dir_location,1);
            
            if (($dotkey = array_search('.', $dates)) && ($doubledotkey = array_search('..', $dates))) {
                unset($dates[$dotkey]);
                unset($dates[$doubledotkey]);
            }

            foreach($dates as $name) { 
                    
            };

        } else {
            echo "not_available";
        };
    } 
?>