var chartIds = ["CPU_UTIL"];
var nmonDir;
var currentChartId;

// ajax call function
function ajaxCall(task,filesObj) {

    var ajaxResponse;
    var postData;
    var pyurl;

    if(task == "readFile") {
        postData = {'filesObj': JSON.stringify(filesObj), 'nmonDir': nmonDir, 'chartIds': JSON.stringify(chartIds)};
        pyurl = "./chartDataArray.py";
    } else {
        

    
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


function chartMaker(){


};




function chartView(control={value:"A"}) {
    console.log(control.value);

    // disable the drop down
    // $("#viewDropDown").prop("disabled",true);



    



    //console.log(filesChartData)



    // enable the drop down
    // $("#viewDropDown").attr("disabled",false);
};











$(".chartbuttons>button").on("click",function(){
    var selectedId = this.id.slice(5); // slice the name to get the chart type
    parseFilesData(selectedId); // parse the object
})


