<?php
if(isset($_POST['filesData'])){
    $filesData= json_encode($_POST['filesData']);
} else {
    echo "<h1>INVALID REQUEST</h1>";
    die;
}
?>
<html>
    <head>
        <title>comNmon ChartMaker</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <style>
        body {
            background-color: #EEEEFF;
        }
        .chartbuttons {
            display: none;
        }
        #sortingMethod {
            font-weight: bold;
        }
        h2 {
            color:blue;
        }

        .show {
            display: block;
        }


        </style>
    </head>
    <body>
    <div>files sorting method: <span id="sortingMethod"></span></div>
    <div class = "chartbuttons">
        <button id="draw_TOPSUM" style="color:black;"><b>Top Summary</b></button>
        <button id="draw_TOPCMD" style="color:black;"><b>Top Commands</b></button>
        <br>
        <button id="draw_CPU_UTIL" style="color:red;"><b>CPU Util.</b></button>
        <button id="draw_CPU_USE" style="color:red;"><b>CPU Use</b></button>
        <button id="draw_RUNQ" style="color:red;"><b>RunQ</b></button>
        <button id="draw_PSWITCH" style="color:red;"><b>pSwitch</b></button>
        <button id="draw_FORKEXEC" style="color:red;"><b>ForkExec</b></button>
        <button id="draw_MEM_LINUX" style="color:blue;"><b>Memory</b></button>
        <button id="draw_SWAP_LINUX" style="color:blue;"><b>Swap</b></button>
        <br>
        <button id="draw_NET" style="color:purple;"><b>Network</b></button>
        <button id="draw_NETPACKET" style="color:purple;"><b>Net Packet</b></button>
        <button id="draw_DISKBUSY" style="color:brown;"><b>Disk Busy</b></button>
        <button id="draw_DISKBUSYu" style="color:brown;"><b>Unstacked</b></button>
        <button id="draw_DISKREAD" style="color:brown;"><b>Disk Read</b></button>
        <button id="draw_DISKREADu" style="color:brown;"><b>Unstacked</b></button>
        <button id="draw_DISKWRITE" style="color:brown;"><b>Disk Write</b></button>
        <button id="draw_DISKWRITEu" style="color:brown;"><b>Unstacked</b></button>
        <button id="draw_DISKBSIZE" style="color:brown;"><b>Disk BSize</b></button>
        <button id="draw_DISKXFER" style="color:brown;"><b>Disk Xfers</b></button>
        <br>
        <button id="draw_DGBUSY" style="color:brown;"><b>Disk Grp Busy</b></button>
        <button id="draw_DGBUSYu" style="color:brown;"><b>Unstacked</b></button>
        <button id="draw_DGREAD" style="color:brown;"><b>Disk Grp Read</b></button>
        <button id="draw_DGREADu" style="color:brown;"><b>Unstacked</b></button>
        <button id="draw_DGWRITE" style="color:brown;"><b>Disk Grp write</b></button>
        <button id="draw_DGWRITEu" style="color:brown;"><b>Unstacked</b></button>
        <button id="draw_DGSIZE" style="color:brown;"><b>Disk Grp BSize</b></button>
        <button id="draw_DGXFER" style="color:brown;"><b>Disk Grp Xfers</b></button>
        <button id="draw_JFS" style="color:brown;"><b>JFS</b></button>
    </div>
    
    <div id="chart">
        <div id="chart_master">
            <h2>Click on a Graph button above, to display that graph</h2>
        </div>
    </div>

    <script src="chartMakerScript.js"></script>
    <script>
        var filesData = <?php echo "JSON.parse($filesData);" ?>;
        $(document).ready(function(){
            $("#sortingMethod").text(filesData.sortingMethod);            
        
            // makeIframes();  make the iframes as soon as the document is ready -> this function also makes the table for the selected files and displays the headings
            // prepIframe(); 
            parseFilesData("CPU_UTIL"); // takes in the default chart Id
        });


    </script>
    </body>
</html>