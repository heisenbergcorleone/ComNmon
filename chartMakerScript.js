var chartIds = ["CPU_UTIL"];
var nmonDir;
var currentChartId = "CPU_UTIL";

// ajax call function
function ajaxCall(task,filesObj,chartDataArray,chartType) {

    var ajaxResponse;
    var postData;
    var pyurl;

    if(task == "readFile") {
        postData = {'filesObj': JSON.stringify(filesObj), 'nmonDir': nmonDir, 'chartIds': JSON.stringify(chartIds)};
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
    // $("#viewDropDown").prop("disabled",true);

    // create the sorted chartData to send only the relevant data corresponding to the current chart id
    var sortedChartData = {}

    // return data array of only the current chart id
    Object.keys(JSON.parse(filesChartData)).filter(function (k) { return RegExp(currentChartId).test(k); }).forEach(function (k) { return sortedChartData[k] = JSON.parse(filesChartData)[k]; });


    var chartFileDetails = filesDetails.typewise;

    if(control.value == "D" || control.value == "B"){ // for chart view type D and B make send the runwise sorted selected files
        chartFileDetails = filesDetails.runwise;
        console.log("changed")
        console.log("")
        console.log(filesDetails.runwise)

    }


    // call ajaxCall to make the chartsLines obj for chart formation
    var chartsObj = (ajaxCall("chartlines",chartFileDetails,sortedChartData,control.value));


    
    // each key in chartsLines represents the chartHeading and the data inside the key includes the chart data
    // console.log(chartsObj)

    // for(n in chartsObj){
    //     console.log(n)
    //     console.log(JSON.stringify(chartsObj[n].chart))
    //     console.log(chartsObj[n].blacklist)
    // }

    console.log(chartsObj)

    //console.log(filesChartData)



    // enable the drop down
    // $("#viewDropDown").attr("disabled",false);
};











$(".chartbuttons>button").on("click",function(){
    var selectedId = this.id.slice(5); // slice the name to get the chart type
    parseFilesData(selectedId); // parse the object
})


