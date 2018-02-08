var noOfIframes;
var currentFrame = 0;

$(".chartbuttons>button").on("click",function(){
    var selectedId = this.id.slice(5); // slice the name to get the correct id
    parseFilesData(selectedId);
})

function parseFilesData(id){ // parses the selected files with respect to the button id

    const files = filesData.files; // store the selected files
    const sortingMethod = filesData.sortingMethod; // store the sorting method
    //console.log(files);

    // if noOfIframes is one then the same window will be used to make the charts else multiple iframes will be used
    noOfIframes = Object.keys(files).length;

     

    prepIframeTable();
    
    
    if(sortingMethod == "filetypewise") {

        for (var key in files) {
            var timestamp = files[key];
            if(Object.keys(timestamp).length == 1) {
                console.log(timestamp);
                console.log("+++ sorting")
                sortingPoints(timestamp,key,id);

            } else {
                console.log(timestamp);
                console.log("+++ average")
            }
        
        };

    } else if (sortingMethod == "runwise") {
        
        for (var key in files) {
            var server = files[key];
            if(Object.keys(server).length == 1) {
                sortingPoints(server,key,id);
            } else {
                console.log(server);
                console.log("+++ average")
            }     
        };

    } else {
        alert("parsing error- please report at ksinghdhir1@gmail.com");
    }

};

var once = 0;

function sortingPoints (list,iframeHeading,id) {

    var fileArray = list[Object.keys(list)[0]];
    var timestampDir;
    Number(iframeHeading)? timestampDir = Number(iframeHeading): timestampDir = Number(Object.keys(list)[0]);

    var interval = 3;
    var snapshot = 10;
    // case 1 -> intervals and snapshots are same for the selected files+   


if(once) {return}

    $.ajax({
        type: "POST",
        async: false,
        url: "./fileReader.py",
        data: {'fileListObj': JSON.stringify(fileArray), 'timestampDir': JSON.stringify(timestampDir), 'chartId': id }, // or use result.toString() to convert the JS array into string
        dataType: "text"
    }).done(function(response) {
        console.log(String(response));
    }); 

    one = true;

};


function prepIframeTable() {

    if (noOfIframes == 1) { // use the current window


    } 
    else { // use the multiple iframe windows
        //noOfIframes is the number of iframe windows used in the file

    }


    // build the table here --->>
    // the intervals and snapshots will be fetched from each table

    //update the interval and snapshot 
    
};