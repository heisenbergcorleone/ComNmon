<?php
if(isset($_GET['directory_location'])) { // the value is again checked if it's empty of or in case the file is used again for another ajax call
        $dir_location = __DIR__ .  $_GET['directory_location'];
        if (file_exists($dir_location)) {
            echo "available";
        } else {
            echo "not_available";
        };
    }
if(isset($_GET['directory_path'])){
    $nmonDir = __DIR__ . $_GET['directory_path'];
    $rawSubDir = scandir($nmonDir,1);
    $subdir = array_map(function($e){ return  substr($e, 0, 13);},$rawSubDir);
        // removes dot and double dot from the array
        if (($dotkey = array_search('.', $subdir)) && ($doubledotkey = array_search('..', $subdir))) {
            unset($subdir[$dotkey]);
            unset($subdir[$doubledotkey]);
        }
    echo json_encode($subdir);
}
if(isset($_GET['timestamp_path'])){
    $timestampDir = glob(__DIR__ . $_GET['timestamp_path'] . "*");
    $subdir = scandir($timestampDir[0],1);
        // removes dot and double dot from the array
        if (($dotkey = array_search('.', $subdir)) && ($doubledotkey = array_search('..', $subdir))) {
            unset($subdir[$dotkey]);
            unset($subdir[$doubledotkey]);
        }
    echo json_encode($subdir);
}
?>