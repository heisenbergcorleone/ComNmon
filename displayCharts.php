<html>
    <head>
    <link rel="stylesheet" href="./Assets/CSS/dcstyle.css">
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src ="./Assets/JS/scripts.js" ></script>
    </head>
    <body>

<div style="height:30%">

    <div id="dropDown">   
    <select id="displayCharts" multiple>
        <option selected="">Select File(s)</option>
    <?php

    $dir    = './Templates';
    $files = scandir($dir,1);
    foreach($files as $name) { 
        if($name != "." && $name != "..") {
        ?>
        <option value="<?php echo $name ?>"><?php echo $name ?></option>
    <?php
        }
    } ?>

    ?>
    </select><br>
    <button id="displayData">Display</button>
    </div>

    <div class = "buttons">
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

</div><br>



<div id="frames"></div>


<script src ="./Assets/JS/dcscript.js"></script>

</body>
</html>