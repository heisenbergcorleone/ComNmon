var noOfIframes;
var currentFrame = 0;

$(".chartbuttons>button").on("click",function(){
    var selectedId = this.id.slice(5); // slice the name to get the chart type
    parseFilesData(selectedId); // parse the object
})


function parseFilesData(id){
    const files = filesData.files

    $.ajax({
        type: "POST",
        async: false,
        url: "./fileReader.py",
        data: {'fileListObj': JSON.stringify(files), 'chartId': id }, 
        dataType: "text"
    }).done(function(response) {
        console.log(String(response));
    }); 
    

};
