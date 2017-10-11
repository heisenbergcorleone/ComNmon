//google.load("visualization", "1.1", {packages:["corechart"], callback: function(){setupCharts();}});

		//google.setOnLoadCallback(setupCharts);rts);
		
		function setupCharts() {

            //var button = parent.document.getElementById(dataPHP[2]).trigger("click");
		
		var chart = null;

		var data = google.visualization.arrayToDataTable(dataPHP[0]);
        var options = dataPHP[1];
        options.tooltip = { trigger: 'selection' };
      
		document.getElementById(dataPHP[2]).addEventListener("click", function() {
		if (chart && chart.clearChart) chart.clearChart();

		chart = new google.visualization.AreaChart(document.getElementById("chart_master"));
		chart.draw( data, options);
		});

	};

setupCharts();