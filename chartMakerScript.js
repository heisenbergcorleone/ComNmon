var chartTypes = ["CPU_UTIL"];
var nmonDir;
var currentChartType = "CPU_UTIL";






// charts object data
var chartsObject;
// stores the keys of the object or heading so the charts
var chartIds = []
// stores the chart id for the chart being processed
var currentChartId;







// ajax call function
function ajaxCall(task,filesObj,chartDataArray,chartType) {

    var ajaxResponse;
    var postData;
    var pyurl;

    if(task == "readFile") {
        postData = {'filesObj': JSON.stringify(filesObj), 'nmonDir': nmonDir, 'chartIds': JSON.stringify(chartTypes)};
        pyurl = "./chartDataArray.py";
    } else {
        
        postData = {'filesObj': JSON.stringify(filesObj), 'chartDataArray': JSON.stringify(chartDataArray), 'chartType': chartType};
        pyurl = "./chartLines.py";
    
    };



    $.ajax({
        type: "POST",
        async: false,
        url: pyurl,
        data: postData, 
        dataType: "text"
    }).done(function(response) {
         ajaxResponse = response;
    }); 
    
    return ajaxResponse;
    
};



function chartView(control={value:"A"}) {

    // disable the drop down
    $("#viewDropDown").prop("disabled",true);

    // create the sorted chartData to send only the relevant data corresponding to the current chart id
    var sortedChartData = {}

    // return data array of only the current chart id
    Object.keys(JSON.parse(filesChartData)).filter(function (k) { return RegExp("CPU_UTIL").test(k); }).forEach(function (k) { return sortedChartData[k] = JSON.parse(filesChartData)[k]; });


    var chartFileDetails = filesDetails.typewise;

    if(control.value == "D" || control.value == "B"){ // for chart view type D and B make send the runwise sorted selected files
        chartFileDetails = filesDetails.runwise;
    }


    // call ajaxCall to make the chartsLines obj for chart formation
    var chartsObj = (ajaxCall("chartlines",chartFileDetails,sortedChartData,control.value));


    // update the global variable
    chartsObject = chartsObj;
    chartIds = Object.keys(JSON.parse(chartsObj))

    // Prepare the html content
    prepareHTML();


    // prepare the charts
    prepareCharts()
    

    // enable the drop down
    setTimeout(function(){ $("#viewDropDown").attr("disabled",false); }, 1000);
};







// prepares the html base for all chart types
function prepareHTML(){

    // clear the charts
    $("#comNmonCharts").empty()

    var chartDiv = $("#comNmonCharts")[0];

    var bootstrapClassName = "col-sm-6";
    if(chartIds.length == 1){
        bootstrapClassName = "col-sm-12"
    }


    // update the html page with the div for chart and the respective heading
    for(var heading in JSON.parse(chartsObject)){
    
        var chartHTML = `<div class=${bootstrapClassName}>
      <h3>${heading}</h3>
      <div id=${heading} style="width:100%; height:75%;"></div>
      </div>`;
    
      
      chartDiv.innerHTML += chartHTML;
      
    };

};


// prepares the charts
var pointer = 0;
function prepareCharts(){

    if(chartIds[pointer] == undefined){
        return;
    }

    currentChartId = chartIds[pointer];

    google.charts.setOnLoadCallback(drawChart);

};





function drawChart() {


    console.log(currentChartId)


    

    var data_CPU_UTIL = google.visualization.arrayToDataTable(JSON.parse(chartsObject)[currentChartId].chart);

    var hAxisCount = JSON.parse(chartsObject)[currentChartId].chart.length - 1;


    var options_CPU_UTIL = {
        chartArea: {left: "5%", width: "85%", top: "10%", height: "80%"},
        title: "CPU Utilisation Percentages",
        focusTarget: "category",
        hAxis: {
          gridlines: {
            color: "lightgrey",
            count: hAxisCount
          }
        },
        vAxis: {
          gridlines: {
            color: "lightgrey",
            count: 11
          }
        },
        explorer: { actions: ["dragToZoom", "rightClickToReset"],
          axis: "horizontal",
          keepInBounds: true,
          maxZoomIn: 20.0
        },
        isStacked:  1
      };

      chart = new google.visualization.AreaChart(document.getElementById(currentChartId));
      chart.draw( data_CPU_UTIL, options_CPU_UTIL);


    pointer++;
    prepareCharts()

};









$(".chartbuttons>button").on("click",function(){
    var selectedId = this.id.slice(5); // slice the name to get the chart type
    parseFilesData(selectedId); // parse the object
})


