<?php
if(isset($_POST['filesDetails'])){
    $filesDetails= json_encode($_POST['filesDetails']);
} else {
    echo "<h1>INVALID REQUEST</h1>";
    die;
}
?>
<html>
    <head>
        <title>comNmon ChartMaker</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <!-- Latest compiled Bootstrap JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript">
        // Load Charts and the corechart package.
            google.charts.load('current', {'packages':['corechart']});
        </script>
        <!-- google chart apis -->
        <!-- <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        <script>google.load("visualization", "1.1", {packages:["corechart"]})</script> -->
        <style>
        body {
            background-color: #EEEEFF;
        }
        .hide {
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
        #charts > div {
            border:2px solid black;
        }


        </style>
    </head>
    <body>
    <div>select view type :
        
        <select id="viewDropDown" onchange="chartView(this)">
            <option value="A">Type-wise averages - one chart for each type</option>
            <option value="B">Type-wise average for all types in a single chart</option>
            <option value="C">Type-wise but individually for each server - one chart for each type</option>
            <option value="D">All servers in a single chart</option>
            <option value="E">All servers in a separate charts</option>
        </select>



    </div>




    <div class = "chartbuttons hide">
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
    
    <div id="heading">
        <h2>Click on a Graph button above, to display that graph</h2>
    </div>

    <div id="comNmonCharts">
    </div>




    <script src="chartMakerScript.js"></script>
    <script>
        var filesDetails = <?php echo "JSON.parse($filesDetails)"; ?>;
        
        console.log(filesDetails)
        
        var filesChartData;

        $(document).ready(function(){

            // update the nmon dir location
            nmonDir = filesDetails.nmon;

            // update the currentChartId
            currentChartId = "CPU_UTIL";

            // stores all the chart data array
            filesChartData =  ajaxCall("readFile",filesDetails.runwise);

            // console.log(filesChartData);

            // console.log(JSON.parse(filesChartData));

            // for (n in JSON.parse(filesChartData)){
            //     console.log(n)
            //     console.log((JSON.parse(filesChartData))[n]);
            //     console.log("")
            // }


            // make chart according the view type
            chartView();

        });


    </script>
    </body>
</html>