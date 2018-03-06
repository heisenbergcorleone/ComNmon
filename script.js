var dir_location = document.getElementById("directory");
var dir_log_table = document.getElementById("dir_log");
//console.log(localStorage)
var currentTab = 0; // Current tab is set to be the first tab (0)
var [timeStampArray,checked_Dirs,dateListArray,print_dateListArray] = [[],[],[],[]];
// constants
const docheight = $(document).height();
const secondTab = $("#secondtab").clone();


dir_location.addEventListener("keydown",function(e){
    if (e.keyCode == 13) {
      e.preventDefault(); 
        getFolder(dir_location.value);
    }
})

function fixString(x) { // adds slash at the end of the string also checks for adjacent slashes and removes them
            if(x.charAt(x.length-1) != "/") {
                x+="/";
            };
            for (var i = 0; i < x.length ; i++) {
                if (x.charAt(i) == "/" && x.charAt(i+1) == "/"){
                    x = x.slice(0,i) + x.slice(i+1);
                    i = i-1;
                }
            };
            if(x.charAt(0) == ".") {
                x = x.slice(1, x.length);
            }
            return x; // returns the value
};

function getFolder(folderVal) {
    if(folderVal == ""){folderVal = dir_location.placeholder}// checks if the value isn't empty

        var location_val = fixString(folderVal); // the fixString function manipulates the string and returns the value
        var ajaxResponse = ajaxCall("directory_location",location_val);

        if(ajaxResponse == "not_available"){
            alert("Directory isn't available")
        } else if (ajaxResponse = "available") {
            // calls the nextPrev function
            nextPrev(1,location_val);
        }

};

// check for the duplicated value in the array
function checkDuplication(array,value) {
    return (array.some(function(e){
            return value == e;
    }));
}

function ajaxCall(keyname,locationValue,method="GET") {
    var serverResponse;
    $.ajax({
        type: method,
        async: false,
        url: "./server.php",
        data:{[keyname]:locationValue},
        dataType: "text"
        }).done(function(response) {
            serverResponse = response;   
    });
    return serverResponse;
};


function fixFooterPosition() {
    if ($(document).height() > docheight) {
        $(".footer").addClass("relative");
    } else {
        $(".footer").removeClass("relative");
    };
};


function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // toggle the footer style to adjust the position
    fixFooterPosition();
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n,value) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    if(n === 1){
        // current tab is the global variable -> value is 0 and increments when the tab changes
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // hanlde the current tab data
    handleCurrentTab(currentTab,n,value);
    // Display the correct tab:
    showTab(currentTab);
}


function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

function handleCurrentTab(currentTab,n,directory_path) {
    // inputs the value
    if(currentTab == 1 && n === 1) {
        // sets the directory path to header
        $("#selected_directory").text(directory_path);
    }
    // toggle the display
    if(currentTab > 0){
        $(".header").addClass("show");
        $(".button").addClass("show");
    } else if (currentTab == 0) {
        $(".header").removeClass("show");
        $(".button").removeClass("show");
    };


    // return if n is -1
    if(n === -1) { 
        if(currentTab==1){
            checked_Dirs = [];
            (document.getElementsByClassName("nextBtn")[0]).setAttribute("onclick", 'secondToThird(this)');
            (document.getElementsByClassName("nextBtn")[2]).setAttribute("onclick", 'secondToThird(this)');
        }
        return;
    };
    // switch condition populates the tab
    switch(currentTab){

        case 1:
            // built the timestamp list of all the directories -> take no more buttons
            // list all the directories
            // just that -> basically need to change the whole layout of the second tab

            // rawTimeStamp records the set of original names of the timestamped directories
            rawTimeStamp = JSON.parse(ajaxCall("directory_path", directory_path));

            // validate the directory names
            let excludedDirs = [];
            timeStampArray = rawTimeStamp.filter(function(e){
                
                var unixTimeStamp = e.slice(0,13)
                var valid = (new Date(Number(unixTimeStamp))).getTime() > 0;       
                
                if(valid){
                    return e
                } else {
                    excludedDirs.push(e);
                };
            });

            // alert the excluded directories name

            if(excludedDirs.length){
                alert("The excluded directories that don't fit the naming convention are: \n\n"+excludedDirs.join("\n"))
            }
            
            $("#secondtab").replaceWith(secondTab.clone()); // clear the tab
            addDirectory(timeStampArray); // build the tab
            

            (document.getElementsByClassName("nextBtn")[0]).setAttribute("onclick", 'secondToThird(this)');
            (document.getElementsByClassName("nextBtn")[2]).setAttribute("onclick", 'secondToThird(this)');

            break;
        case 2:
            // the third tab
            buildThirdTab(checked_Dirs);
            (document.getElementsByClassName("nextBtn")[0]).setAttribute("onclick", 'checkFileType(this)');
            (document.getElementsByClassName("nextBtn")[2]).setAttribute("onclick", 'checkFileType(this)');
            
            break;
    };

};

// functions for creating second tab


function addDirectory(timeStampArray){

    var dirList_table = document.getElementById('directory_list_table');


    timeStampArray.forEach(function(e,index){

        var unixTimeStamp = e.slice(0,13)

        var d = new Date(Number(unixTimeStamp));
        var dateFormat = (((d.getDate()<10?'0':'') + d.getDate()) + '/' + (((d.getMonth()+1)<10?'0':'') + (d.getMonth()+1)) + '/' + d.getFullYear());
        var timeFormat = (((d.getHours()<10?'0':'') + d.getHours()) + ':' + ((d.getMinutes()<10?'0':'') + d.getMinutes()) + ':' + ((d.getSeconds()<10?'0':'') + d.getSeconds()));

        var directoryFormat =  (dateFormat + "_" + timeFormat + e.slice(13,e.length));



        var dirTableLength = dirList_table.rows.length;

        var row = dirList_table.insertRow(dirTableLength);

        var cell1 = row.insertCell(0); // for directory's formatted name
        var cell2 = row.insertCell(1); // for checkbox

        cell1.innerHTML = '<label>' + directoryFormat + '</label>'

        cell2.innerHTML = '<input type="checkbox" value='+ e +'></input>';

    })


    fixFooterPosition()

};



  
  function checkall(that,tabname="secondtab") {

    if(tabname == "thirdtab") {
        var table_body = that.closest("tbody");
        // unlike prev, prevAll selects all the previous elements and then we can sort the first one out of them
        var selectedNumberSpan = ($(that).closest(".stamp").find(".selectedNumbers"))[0];

        if(that.checked){
            // keeps record of the unchecked checkbox
            var toBeChecked = ((($(table_body).find("."+that.className).not(that)).filter(":checkbox:not(:checked)")).length);
            // add the selected file number i.e all the number of listed files
            selectedNumberSpan.innerHTML = Number(selectedNumberSpan.innerText)+toBeChecked;
        } else {
            // keeps record of the checked checkbox
            var toBeUnchecked = ((($(table_body).find("."+that.className).not(that)).filter(":checkbox:checked")).length);
            // subtract the unselected file number i.e all the number of listed files
            selectedNumberSpan.innerHTML = Number(selectedNumberSpan.innerText)-toBeUnchecked;
        };
        
        // every checkbox is checked/unchecked now
        ($(table_body).find("."+that.className).not(that)).filter(':checkbox').prop('checked', that.checked);

    } else {
        $('table#directory_list_table td input').filter(':checkbox').prop('checked', that.checked);
    }
};




function secondToThird(that) {
    
    var selectedIndex = [];
    var checked_dates = $("#directory_list_table :checkbox:checked");
    if(!checked_dates.length || (checked_dates.length == 1 && checked_dates[0].value == "on")){return;}
    checked_dates.each(function(i,e){
    
        if(e.value != "on") {
            checked_Dirs.push(e.value);
        }

    })
    
    nextPrev(1);
}

   

function count(array,element,store){
    for (i = 0; i < array.length; i++){
      if (array[i] === element) {  
        store.push(i);
      }
    }
  return;
}

// functions for third tab

function buildThirdTab(runArray){
    
    var nmonDir = document.getElementById("selected_directory").innerText;
    var thirdtabcontent = document.getElementById("thirdtabcontent");
    thirdtabcontent.innerHTML = ""; // empty the contents

    
    
    var tableData = JSON.parse(ajaxCall("directory_array",[nmonDir,runArray]));



    runArray.forEach(function(e,i){

        var unixTimeStamp = e.slice(0,13)

        var d = new Date(Number(unixTimeStamp));
        var dateFormat = (((d.getDate()<10?'0':'') + d.getDate()) + '/' + (((d.getMonth()+1)<10?'0':'') + (d.getMonth()+1)) + '/' + d.getFullYear());
        var timeFormat = (((d.getHours()<10?'0':'') + d.getHours()) + ':' + ((d.getMinutes()<10?'0':'') + d.getMinutes()) + ':' + ((d.getSeconds()<10?'0':'') + d.getSeconds()));

        var directoryFormat =  (dateFormat + "_" + timeFormat + e.slice(13,e.length));

    
        // build the third tab    
        thirdtabcontent.innerHTML += `<div class="stamp" id=${e}>
            <div class="directoryName">
                ${directoryFormat}
                <div class="selectedByTotal" style="display: inline;">
                    &nbsp;<span class="selectedNumbers">0</span>/<span class="total">${tableData[i].length}</span>
                </div>
                <div style="display:inline; cursor:pointer;" onclick="toggleChart(0,this)" class=${i}> &#8607;</div>
            </div><br>
            <div class="fileTable">
                <table id="table${i}"></table>
            </div>
        </div><br><br>`;

        // populate the file table
        prepareTable(tableData[i],"table"+i); // prepare the table

    });

    fixFooterPosition();

};



function prepareTable(tableFiles,tableId) {

    tableFiles.sort();tableFiles.reverse(); // sort the tablefiles

    var table = document.getElementById(tableId);

    var nmonHeader = []; // array of all the headings

    tableFiles.forEach(function(filename,i){
        var fileType = filename.substr(0, filename.indexOf('_')); // is the table heading
        if(nmonHeader.length == 0 || nmonHeader[nmonHeader.length-1] != fileType ) { // check if the array is empty or if the last element is different
            nmonHeader.push(fileType); // make filetype heading
        }
    });


    for(var i = 0; i < nmonHeader.length; i++) {
        // insert the heading
        var tableLength = table.rows.length;
        var row = table.insertRow(tableLength);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML ='<b>'+ nmonHeader[i] +'</b>'
        cell2.innerHTML = '<b>Check all:</b> <input type="checkbox" class="'+nmonHeader[i]+'" onchange="checkall(this,\'thirdtab\')" >';
        

        // insert the file names
        tableFiles.forEach(function(filename){
            var fileType = filename.substr(0, filename.indexOf('_')); // is the table heading

            if(fileType == nmonHeader[i]){
                var tableLength = table.rows.length;
                var row = table.insertRow(tableLength);
                var cell1 = row.insertCell(0); // cell for filename
                var cell2 = row.insertCell(1); // cell for checkbox


                cell1.innerHTML = filename;
                cell2.innerHTML = cell2.innerHTML = '<input type="checkbox" class="'+nmonHeader[i]+'" id="'+ filename +'" onclick="updateCheckedNumber(this)"></input>';
            }

        })
    };

};



function toggleChart(n,that){

    if(n == 0) { // hide the table
        that.innerHTML=' &#8609;';
        $("#table"+that.className)[0].style='display: none;';
        that.setAttribute("onclick", 'toggleChart(1,this)');
    } else if (n == 1) { // show the table
        that.innerHTML=' &#8607;';
        $("#table"+that.className)[0].style='display: block;';
        that.setAttribute("onclick", 'toggleChart(0,this)');
    }

    fixFooterPosition();
}



function updateCheckedNumber(that) {
    var selectedNumberSpan = ($(that).closest(".stamp").find(".selectedNumbers"))[0];
    // update the values
    if(that.checked) {
        selectedNumberSpan.innerHTML = (Number(selectedNumberSpan.innerText) + 1);
    } else {
        selectedNumberSpan.innerHTML = (Number(selectedNumberSpan.innerText) - 1);
    };
};


function checkFileType(that) {
    var checked_files = ($(".fileTable :checkbox[id]:checked"));
    if(!checked_files.length){return;};
    
    if(checked_files.length == 1) { // if only one file is selected
        // then open the file
        var nmonDir = document.getElementById("selected_directory").innerText;
        var dirName =  checked_files[0].closest("div[id]").id;
        var fileName = checked_files[0].id; 
        if(1) { // relative path

            var nmonLocation = nmonDir.slice(1,nmonDir.length);
            var x = location.href;
            // redirect to the file location
            window.open(x.slice(0,x.length-9)+nmonLocation+dirName+"/"+fileName);

        } else { // absolute path

        };
};

    var condition = false; // condition to check is the file type and directory are single

    checked_files.toArray().every(function(element){
        return element.className == checked_files[0].className && element.closest("div[id]").id == (checked_files[0]).closest("div[id]").id ? condition = true: condition = false; 
    });


    if(condition) { // if the file type and directory are single
        // then the sorting method is filetypewise
        // construct the object with respect to the selected sorting method
        sendData("filetypewise");
    } else {
        // display modal
        modalToggle();
        // ask the user for selecting a sorting method -> filetype or runwise
        
        // for that callbacks are used
        $("#filetypewise").unbind().click(sendData);
        $("#runwise").unbind().click(sendData);
    };
    
    function sendData(e) {
        var sortingMethod;
        e.target != undefined ? sortingMethod = e.target.id : sortingMethod = e;
        // construct the object with respect to the selected sorting method
        var fileData = makeFileObject(checked_files,sortingMethod);
        // submit the form
        $("#submitInput").attr('value',JSON.stringify(fileData));
        $("#postForm").submit();
        console.log(fileData);
    };
    return;    
};

function modalToggle (value) {
    $("#formModal").toggleClass("show");
};

function makeFileObject (checked_files,sortingMethod) {

    // initialise an empty fileObject object
    var fileObject = {};

    checked_files.each(function(i,e){
        // the first and the second keys are used in nested manner to make the object
        var [firstKey,secondKey] = [e.className,e.closest("div[id]").id] ; // by default -> filetypewise

        if(sortingMethod == "runwise") {
            [firstKey,secondKey] = [secondKey,firstKey] // interchange the values;
        };

        // check if the firstKey exists
        var firstKeyExists = (checkDuplication(Object.keys(fileObject), firstKey));
        
        if (firstKeyExists) {      // is the timestamp already exists
            var secondKeyExists = (checkDuplication(Object.keys(fileObject[firstKey]),secondKey));

            if(secondKeyExists) { // if the file type already exists inside it then...
                fileObject[firstKey][secondKey].push(e.id);
            } else { // if the file type doesn't exist then...
                // define the array
                fileObject[firstKey][secondKey] = [];
                // push the value
                fileObject[firstKey][secondKey].push(e.id);
            };

        } else {                     // if it doesn't then add it
            // add the firstKey in the object
            fileObject[firstKey] = {};
            // define the array with the key value of filetype
            fileObject[firstKey][secondKey]=[];
            // store the file name inside it
            fileObject[firstKey][secondKey].push(e.id);
        };

    }); 
    // return the object upon completion
    return {files:fileObject, sortingMethod:sortingMethod};
};