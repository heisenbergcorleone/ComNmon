var dir_location = document.getElementById("directory");
var dir_log_table = document.getElementById("dir_log");
//console.log(localStorage)
var currentTab = 0; // Current tab is set to be the first tab (0)
var [timeStampArray,checked_timestamps,dateListArray,print_dateListArray] = [[],[],[],[]];
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
            checked_timestamps = [];
            (document.getElementsByClassName("nextBtn")[0]).setAttribute("onclick", 'secondToThird(this)');
            (document.getElementsByClassName("nextBtn")[2]).setAttribute("onclick", 'secondToThird(this)');
        }
        return;
    };
    // switch condition populates the tab
    switch(currentTab){

        case 1: 
            timeStampArray =[]; dateListArray = []; print_dateListArray =[];
            // the second tab 
            //document.getElementById("dirnum").innerText = ajaxCall("directory_path",directory_path);
            timeStampArray = JSON.parse(ajaxCall("directory_path",directory_path));
    
            timeStampArray.forEach(function(e){
                var d = new Date(Number(e));
                var dirDate = (((d.getDate()<10?'0':'') + d.getDate()) + '/' + (((d.getMonth()+1)<10?'0':'') + (d.getMonth()+1)) + '/' + d.getFullYear());
                dateListArray.push(dirDate);
            })

            // create an array with no duplicate dates - this array will be used to create tables
            print_dateListArray = dateListArray.filter(function(item, pos) {
                return dateListArray.indexOf(item) == pos;
            });
            
            $("#secondtab").replaceWith(secondTab.clone());
            addDirectory();
            (document.getElementsByClassName("nextBtn")[0]).setAttribute("onclick", 'secondToThird(this)');
            (document.getElementsByClassName("nextBtn")[2]).setAttribute("onclick", 'secondToThird(this)');

            break;
        case 2:
            // the third tab
            buildThirdTab(checked_timestamps);
            (document.getElementsByClassName("nextBtn")[0]).setAttribute("onclick", 'checkFileType(this)');
            (document.getElementsByClassName("nextBtn")[2]).setAttribute("onclick", 'checkFileType(this)');
            
            break;
    };

};

// functions for creating second tab

function addDirectory(element) {
    var dirList_button = document.getElementsByClassName("tableButton")[0];
    var dirList_table = document.getElementById('directory_list_table');
    var limit = 3; // limit defines the number of items to be shown at a time
    var condition = false;
    //alert(limit);
        if(element) {
            if(element.id == 0) {
                limit = print_dateListArray.length; // the limit exceeds to the length of the array to put all the elements in the table
                //element.id = element.id - 1;
            };

            if(element.id == 'loadall') { // if the button load all is clicked
            limit = print_dateListArray.length; // limit is all
            $(".loadtable").remove(); // the load more button/ all button is removed
            } else {
            $(element).remove();
            };
        } else if(limit > print_dateListArray.length) { // if the limit is greater than the array length
            limit = print_dateListArray.length;
        };
  
        for(var i = 0; i < limit; i++) {
            var table_length = dirList_table.rows.length;

            var row = dirList_table.insertRow(table_length);
            var cell1 = row.insertCell(0); // date directory Name
            var cell2 = row.insertCell(1); // checkbox

            cell1.innerHTML = '<label>' + print_dateListArray[0] + '</label>';
            cell2.innerHTML = '<input type="checkbox" value='+ print_dateListArray[0] +' ></input>';
            print_dateListArray.shift();
        };
  
            if(print_dateListArray.length){ // button should be created

                if (!element) { // element doesn't exist
                    dirList_button.innerHTML += '<br><button id="3" class="loadtable" onclick="addDirectory(this)">Next 3..</button>'; // id defines how many times the button is going to be displayed
                } else { // element exists
                    if(element.id == 1) {
                    dirList_button.innerHTML += "<button id='"+ (element.id-1) +"' class='loadtable' onclick='addDirectory(this)'>ALL </button>";
                    } else if (element.id > 1) { // that means element.id is not 0 -> because load all button has 0 id
                    dirList_button.innerHTML += "<button id='"+ (element.id-1)  +"' class='loadtable' onclick='addDirectory(this)'>Next 3..</button>";
                    };
                };

            };
  
      fixFooterPosition()
};
  
  function checkall(that,tabname="secondtab") {

    if(tabname == "thirdtab") {
        var table_body = that.closest("tbody");
        // unlike prev, prevAll selects all the previous elements and then we can sort the first one out of them
        var selectedNumberSpan = ($(that).closest(".files").prevAll(".selectedByTotal:first").children(".selectedNumbers"))[0];

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
    if(!checked_dates.length){return;}
    checked_dates.each(function(i,e){
        if(e.value){
        count(dateListArray,e.value,selectedIndex);
        };
    })
    
    
    checked_timestamps = [];
    selectedIndex.forEach(function(i){
        //console.log(timeStampArray); 
        checked_timestamps.push(timeStampArray[i]);
    });

    (document.getElementsByClassName("nextBtn")[0]).setAttribute("onclick", 'nextPrev(1)');
    (document.getElementsByClassName("nextBtn")[2]).setAttribute("onclick", 'nextPrev(1)');
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

function buildThirdTab(x){
    var thirdtabcontent = document.getElementById("thirdtabcontent");
    thirdtabcontent.innerHTML = "";
    
    x.forEach(function(stamp){
    var d = new Date(Number(stamp));
    var dates = document.getElementsByClassName("date");
    var dateFormat = (((d.getDate()<10?'0':'') + d.getDate()) + '/' + (((d.getMonth()+1)<10?'0':'') + (d.getMonth()+1)) + '/' + d.getFullYear());
    var timeFormat = (((d.getHours()<10?'0':'') + d.getHours()) + ':' + ((d.getMinutes()<10?'0':'') + d.getMinutes()) + ':' + ((d.getSeconds()<10?'0':'') + d.getSeconds()));
    // converts into array
    dates = [].slice.call(dates);

    if(dates.length){
        dates.some(function(e){
            if(e.id == dateFormat){
                e.parentElement.innerHTML += '<br><div class="timeformat" id='+ stamp +'>'+ timeFormat +'<div class="selectedByTotal" style="display: inline;"></div><div style="display:inline; cursor:pointer;" onclick="displayFiles(1,this)"> &#8609;</div><br><div class="files"><br>Files:<br><table></table></div></div>';
                
                return;
            } else if (e==dates[dates.length-1]) {
                thirdtabcontent.innerHTML += '<div class = "stamp"><div class="date" id="'+ dateFormat +'">'+ dateFormat +'</div><br><div class="timeformat" id="'+ stamp +'">'+ timeFormat+'<div class="selectedByTotal" style="display: inline;"></div><div style="display:inline; cursor:pointer;" onclick="displayFiles(1,this)"> &#8609;</div><br><div class="files"><br>Files:<br><table></table></div></div></div><br><br><br>';
            };
        });
    } else {
        thirdtabcontent.innerHTML += '<div class = "stamp"><div class="date" id="'+ dateFormat +'">'+ dateFormat +'</div><br><div class="timeformat" id="'+ stamp +'">'+ timeFormat+'<div class="selectedByTotal" style="display: inline;"></div><div style="display:inline; cursor:pointer;" onclick="displayFiles(1,this)"> &#8609;</div><br><div class="files"><br>Files:<br><table></table></div></div></div><br><br><br>';
    };

    });
    // positioning problem
    setTimeout(function(){
            
        fixFooterPosition();

    }, 1);

};

function displayFiles(n,that){
    var nmonDir = document.getElementById("selected_directory").innerText;
    if(n == 1){
        that.innerHTML=' &#8607;';
        $(that).siblings('.files')[0].style='display: block;';
        var nmonFiles = JSON.parse(ajaxCall("timestamp_path",nmonDir+that.parentElement.id));
        // sets the div to show number of files selected
        ($(that).prev('.selectedByTotal')[0]).innerHTML = '&nbsp;(<span class="selectedNumbers">0</span>/'+nmonFiles.length+')';
        
        // sets the rest of the contents and table
        contentSetUp(nmonFiles,that.parentElement);
        that.setAttribute("onclick", 'displayFiles(0,this)');
    } else if (n==0) {
        that.innerHTML=' &#8609;';
        $(that).siblings('.files')[0].style='display: none;';

        that.setAttribute("onclick", 'displayFiles(2,this)');
    } else if (n==2) {
        that.innerHTML=' &#8607;';
        $(that).siblings('.files')[0].style='display: block;';
        that.setAttribute("onclick", 'displayFiles(0,this)');
    };

    fixFooterPosition();
}

function contentSetUp(nmonFiles,parentDiv){
    // the array is first sorted then reversed
    nmonFiles.sort();nmonFiles.reverse();

    var nmonHeader = [];
    nmonFiles.forEach(function(e,i){
        var el = e.substr(0, e.indexOf('_'));
        if(!nmonHeader.length){
            nmonHeader.push(el);
        } else {
            if(nmonHeader[nmonHeader.length-1] == el){
                return;
            } else {
                nmonHeader.push(el);
            }
        };
    });

    var files_log_table = parentDiv.getElementsByTagName("table")[0];
    loadTable();

    function loadTable() {
        for(var i = 0; i < nmonHeader.length; i ++) {
            
            //insert the heading
            var table_length = files_log_table.rows.length;
            var row = files_log_table.insertRow(table_length);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = '<b>'+nmonHeader[i]+'</b>';
            cell2.innerHTML = '<b>Check all:</b> <input type="checkbox" class="'+ nmonHeader[i] +'" onchange="checkall(this,\'thirdtab\')" >';

            //insert the file names
            nmonFiles.forEach(function(filename){
                var el = filename.substr(0, filename.indexOf('_'));
                if(el == nmonHeader[i]){
                    var table_length = files_log_table.rows.length;
                    var row = files_log_table.insertRow(table_length);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.innerHTML = filename;
                    cell2.innerHTML = '<input type="checkbox" class="'+nmonHeader[i]+'" id="'+ filename +'" onclick="updateCheckedNumber(this)"></input>';
                }; 
            });
        };

    };

};

function updateCheckedNumber(that) {    
    var selectedNumberSpan = ($(that).closest(".files").prevAll(".selectedByTotal:first").children(".selectedNumbers"))[0];
    // update the values
    if(that.checked) {
        selectedNumberSpan.innerHTML = (Number(selectedNumberSpan.innerText) + 1);
    } else {
        selectedNumberSpan.innerHTML = (Number(selectedNumberSpan.innerText) - 1);
    };
};


function checkFileType(that) {
    var checked_files = ($(".files :checkbox[id]:checked"));
    if(!checked_files.length){return;};
    
    if(checked_files.length == 1) { // if only one file is selected
        // then open the file
        var nmonDir = document.getElementById("selected_directory").innerText;
        var dirName =  checked_files[0].closest("div[id]").id;
        var fileName = checked_files[0].id; 
        if(1) { // relative path

            var nmonLocation = nmonDir.slice(1,nmonDir.length);
            // redirect to the file location
            window.open(location.href+nmonLocation+dirName+"/"+fileName);

        } else { // absolute path

        };
        return;
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