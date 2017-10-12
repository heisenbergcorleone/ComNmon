//google.load("visualization", "1.1", {packages:["corechart"], callback: function(){setupCharts();}});

		//google.setOnLoadCallback(setupCharts);rts);
		
		function setupCharts() {

            //var button = parent.document.getElementById(dataPHP[2]).trigger("click");
		
		var chart = null;

		var data = google.visualization.arrayToDataTable(dataPHP[0]);
        var options = dataPHP[1];
        options.tooltip = { trigger: 'selection' };
		const element_id = (window.frameElement.id);

		document.getElementById(dataPHP[2]).addEventListener("click", function() {
		if (chart && chart.clearChart) chart.clearChart();

		chart = new google.visualization.AreaChart(document.getElementById("chart_master"));
		chart.draw( data, options);
		parent.window.iframe_charts[element_id] = chart;

		google.visualization.events.addListener(chart,'select',function() {
				parent.window.iframe_charts.forEach(function(element) {
					element.setSelection(chart.getSelection());
				});

			})	
			
		});

	};

setupCharts();