<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="Assets/CSS/styles.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/JQuery-Snowfall/1.7.4/snowfall.jquery.min.js"></script>
<script defer="defer" type="text/javascript"  src="Assets/JS/scripts.js"  ></script>


</head>
<body>
<hr/>

<div class="mainContainer" style="width:100%;">
	<div style="width:20%;" >
		<div>
			<button class="tagsToggle"  >
			<img src="Assets/images/burger.png" height="50">
<!-- 			<canvas> </canvas> -->
			</button>
		</div>
		<div class="tagContainer">
		Search History:-<span id="Search-History"></span> <span id="add-the-tag" style="font-size:20px "> <strong> + </strong> </span>
		<div class="searchTag">
			Search tags:-<input type="text" id="live-search" placeholder="search tags" >
			<input type="button" id="reset-live-search" value="Reset">
		</div><br/>
		
		<form class="tagsFilter">
			
			<div>
				Date:-<input id="choosedate" type="date" placeholder="Date" >
			</div>
			<div>
				CP_<select id="cloudProvider">
					<option value="">Select..</option>
					<option value="Linode">Linode</option>
					<option value="Digital_Ocean">Digital Ocean</option>
					<option value="Azure">Azure</option>
					<option value="AWS">AWS</option>
					<option value="Google_cloud_platform">Google cloud platform</option>
				</select>
			</div>
			<div>
				DB_<select id="dataBase">
					<option value="">Select..</option>
					<option value="MySQL 5.6">MySQL 5.6</option>
					<option value="Percona 5.6">Percona 5.6</option>
					<option value="MySQL 5.7">Percona 5.7</option>
					<option value="MariaDB">MariaDB</option>
					<option value="Postgres">Postgres</option>
					
				</select>
			</div>
			<div>
				DB_config_<select id="dataBase_config">
					<option value="">Select..</option>
					<option value="Master Slave">Master Slave</option>
					<option value="Master Master">Master Master</option>
					<option value="Master Standby">Master Standby</option>
					<option value="Galera">Galera</option>
					<option value="PXC">PXC</option>
					
				</select>
			</div>
			<div>
				Load_Balancer_<select>
					<option value="">Select..</option>
					<option value="Hardware">Hardware</option>
					<option value="HAProxy">HAProxy</option>
					<option value="TCP">TCP</option>
					<option value="HTTP">HTTP</option>
					<option value="NFS">NFS</option>
					
				</select>
			</div>
			<div>
				Max_conn_<input type="text" id="maxconn" step="500" placeholder="1000">
			</div>
			<div>
				Moodle_<input type="number"  placeholder="3.1">
			</div>
			<div>
				MUC_<select>
					<option value="">Select..</option>
					<option value="Memcached">Memcached</option>
					<option value="Redis">Redis</option>
									
				</select>
			</div>
			<div>
				Moodledata_<select>
					<option value="">Select..</option>
					<option value="NFS">NFS</option>
					<option value="AFS">AFS</option>
					<option value="GlusterFS">GlusterFS</option>
					<option value="EFS">EFS</option>
					<option value="S3">S3</option>
					
				</select>
			</div>
			<div>
				OS_<select>
					<option value="">Select..</option>
					<option value="Ubuntu_16.04">Ubuntu 16.04</option>
					<option value="Ubuntu_14.04">Ubuntu 14.04</option>
					<option value="AWS_Linux">AWS Linux</option>
					<option value="U14.04">U14.04</option>
					<option value="Centos_7">Centos 7</option>
					<option value="BSD">BSD</option>
					
				</select>
			</div>
			<div>
				<label>PHP_</label>
				<input type="radio" name="php"  value="PHP_5.6"> 5.6 
				<input type="radio" name="php" value="PHP_7.0" > 7.0<br>
			</div>
			<div>
			Sessions_<select>
				    <option value="">Select..</option>
					<option value="Memcached">Memcached</option>
					<option value="Redis">Redis</option>
					<option value="Load_Balancer">Load Balancer</option>
					<option value="DB">DB</option>
				</select>
			</div>
			<div>
				<label>Socket_</label>
				<input type="radio" name="Socket"  value="UDF">UDF
				<input type="radio" name="Socket" value="TCP" > TCP<br>
			</div>
			<div>
				Web_server_<select>
					<option value="">Select..</option>
					<option value="Apache">Apache</option>
					<option value="Nginx">Nginx</option>
				
				</select>
			</div>
			
			
			
			<input type="button" id="applyFilter" class="apply_filter" value="apply" > 
			
		</form>
		


	</div >
	</div >
	<div style="width:80%;" >
	Slected tags are:- <span id="displaySelectedComponenet"> </span>
	</div>
 
 
 <script >
	var cx = document.querySelector("canvas").getContext("2d");
	cx.beginPath();
	for (var y = 5; y < 30; y += 10) {
	cx.moveTo(1, y);
	cx.lineTo(90, y);
}
cx.stroke();
</script >
</div> 
</body>
</html>

