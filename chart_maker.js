//google.load("visualization", "1.1", {packages:["corechart"], callback: function(){setupCharts();}});

		//google.setOnLoadCallback(setupCharts);rts);
		
		function setupCharts() {

            //var button = parent.document.getElementById(dataPHP[2]).trigger("click");
		var types_of_charts = ["AreaChart","ColumnChart","BubbleChart"];
		var chart = null;

		var data = google.visualization.arrayToDataTable(dataPHP[0]);
        var options = dataPHP[1];
		options.tooltip = { trigger: 'selection' }; 
		if(options.explorer){options.explorer.actions = [];};
		const element_id = (window.frameElement.id);

		document.getElementById(dataPHP[2]).addEventListener("click", function() {
		if (chart && chart.clearChart) chart.clearChart();
		var i = 0;
		if(this.id == "draw_CPU_USE") {
			i=1;
		} else if (this.id == "draw_TOPSUM") {
			i=2;
		}

		chart = new google.visualization[types_of_charts[i]](document.getElementById("chart_master"));
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