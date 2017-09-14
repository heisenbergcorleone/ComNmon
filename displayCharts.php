<html>
    <head>
    <!-- <link rel="stylesheet" href="./assets/css/dcstyle.css">-->
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src ="./assets/js/scripts.js" ></script>
    </head>
    <body>
    
<select id="displayCharts" multiple>
    <option selected="">Choose one</option>
<?php

$dir    = '..\servers\Templates';
$files = scandir($dir,1);
foreach($files as $name) { 
    if($name != "." && $name != "..") {
    ?>
    <option value="<?php echo $name ?>"><?php echo $name ?></option>
<?php
    }
  } ?>

?>
</select>
<button id="displayData">Display</button><br>

<div class = "buttons" style = "display:none;">
    <button ><b>Configuration</b></button>  
    <button id="draw_TOPSUM" style="color:black;"  ><b>Top Summary</b></button>
    <button id="draw_TOPCMD" style="color:black;" ><b>Top Commands</b></button>
    <br>
    <button id="draw_PHYSICAL_CPU" style="color:black;"><b>Physical CPU</b></button>
    <button id="draw_POOLIDLE" style="color:black;"><b>Pool Idle</b></button>
    <button id="draw_CPU_UTIL" style="color:red;"><b>CPU Util.</b></button>
    <button id="draw_CPU_USE" style="color:red;"><b>CPU Use</b></button>
    <!-- <button id="draw_RUNQ" style="color:red;"><b>RunQ</b></button> -->
    <button id="draw_PSWITCH" style="color:red;"><b>pSwitch</b></button>
    <button id="draw_SYSCALL" style="color:red;"><b>SysCall</b></button>
    <button id="draw_READWRITE" style="color:red;"><b>ReadWrite</b></button>
    <button id="draw_FORKEXEC" style="color:red;"><b>ForkExec</b></button>
    <button id="draw_FILEIO" style="color:red;"><b>File I/O</b></button>
    <button id="draw_REALMEM" style="color:blue;"><b>Real Mem</b></button>
    <button id="draw_VIRTMEM" style="color:blue;"><b>Virt Mem</b></button>
    <button id="draw_FSCACHE" style="color:blue;"><b>FS Cache</b></button>
    <button id="draw_PAGING" style="color:blue;"><b>Paging</b></button>
    <button id="draw_SWAPIN" style="color:blue;"><b>Swaping </b></button>
    <button id="draw_NET" style="color:purple;"><b>Network</b></button>
	<button id="draw_NETPACKET" style="color:purple;"><b>Net Packets</b></button>
	<button id="draw_NETSIZE" style="color:purple;"><b>Net Size</b></button>
	<button id="draw_ADAPT_KBS" style="color:green;"><b>Adapter KBs</b></button>
	<button id="draw_ADAPT_TPS" style="color:green;"><b>Adapter Tps</b></button>
	<button id="draw_DISKBUSY" style="color:brown;"><b>Disk Busy</b></button>
	<button id="draw_DISKBUSYu" style="color:brown;"><b>Unstacked</b></button>
	<button id="draw_DISKREAD" style="color:brown;"><b>Disk Read</b></button>
	<button id="draw_DISKREADu" style="color:brown;"><b>Unstacked</b></button>
	<button id="draw_DISKWRITE" style="color:brown;"><b>Disk Write</b></button>
	<button id="draw_DISKWRITEu" style="color:brown;"><b>Unstacked</b></button>
	<button id="draw_DISKBSIZE" style="color:brown;"><b>Disk BSize</b></button>
	<button id="draw_DISKXFER" style="color:brown;"><b>Disk Xfer</b></button>
	<button id="draw_JFS" style="color:brown;"><b>JFS</b></button>
	<button id="draw_IPC" style="color:black;"><b>IPC</b></button>

</div>

<div id="frames"></div>


<script src ="./assets/js/dcscript.js"></script>

</body>
</html>