var dir_location = document.getElementById("directory");
var dir_log_table = document.getElementById("dir_log");
var storeDirArray = []; // this array stores the last 3 directory locations
//console.log(localStorage)
var currentTab = 0; // Current tab is set to be the first tab (0)
var timeStampArray; var checked_timestamps = [];
var dateListArray = []; var print_dateListArray = []; // dateListArray has duplications print is used to make the list and has no duplications
const docheight = $(document).height();
const secondTab = $("#secondtab").clone();

function handleLog () {
    if (localStorage["comNmonDir"] == undefined) {return} // when comNmonDir is found i.e if the directory location is available
        dir_log_table.innerHTML = '<tr><th>Directory Log:</th></tr>';
        dir_log_table.style = 'display: block;'; // table is made visible
        storeDirArray = JSON.parse(localStorage.getItem("comNmonDir"));

        storeDirArray.forEach(function(val,index){
            var table_length = dir_log_table.rows.length;
            var row = dir_log_table.insertRow(table_length);
            row.setAttribute("id", index);

            var cell1 = row.insertCell(0); // directory location
            var cell2 = row.insertCell(1); // select button
            var cell3 = row.insertCell(2); // delete button

            cell1.innerHTML = val;

            var sel_button = document.createElement("button");
            sel_button.innerText = "SEL";
            sel_button.setAttribute('class','sel'); // class added
            sel_button.setAttribute("onclick", 'selButton(this)'); // select function attribute added
            cell2.appendChild(sel_button);

            var del_button = document.createElement("button");
            del_button.setAttribute('class','del'); // class added
            del_button.setAttribute("onclick", 'delButton(this)'); // delete function attribute added
            del_button.innerText = "DEL";
            cell3.appendChild(del_button);

        });
}; // handle log closed



function selButton (button) {
    getFolder(button.parentNode.parentNode.firstChild.innerText);
};

function delButton (button) {
    var row_container = button.parentNode.parentNode;
    if (row_container.id > -1) { // the value is deleted from the array
        storeDirArray.splice(row_container.id, 1);
    }
    //console.log(storeDirArray);
    if(storeDirArray.length > 0) {
        localStorage.setItem("comNmonDir", JSON.stringify(storeDirArray)); // and the array is overwritten
    } else {
        delete localStorage['comNmonDir'];
    };


    while (dir_log_table.firstChild) {
        dir_log_table.removeChild(dir_log_table.firstChild);
    }

    handleLog();

    /* the function is called again in order to make the rows again, as the rows' ids
        are appended considering the index of the value from the array.
        The delete button removes the selected element from the array, now the array has changed but not
        the rows' ids, so in order to make them sync the handleLog function is called again.
    */
};





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
            return x; // returns the value
        };

function getFolder(folderVal) {
    if(folderVal == ""){return}// checks if the value isn't empty

        var location_val = fixString(folderVal); // the fixString function manipulates the string and returns the value
        var ajaxResponse = ajaxCall("directory_location",location_val);
        
        if(ajaxResponse == "not_available"){
            alert("Directory isn't available")
        } else if (ajaxResponse = "available") {
            // checks the duplication
            if(!checkDuplication(storeDirArray,location_val)) {
                if(storeDirArray.length == 3) { // deletes the last element if the length is equal to 3
                    storeDirArray.pop();
                }
                storeDirArray.unshift(location_val);
                localStorage.setItem("comNmonDir", JSON.stringify(storeDirArray));
            };

            // calls the nextPrev function
            nextPrev(1,location_val);

        }



} // getfolder function closed

// this function checks if any of the array's element is equal to the value
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



function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    document.getElementsByClassName("footer")[0].removeAttribute("style");
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n,value) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // change the step color
    if(n === 1){
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
        document.getElementById("selected_directory").innerText = directory_path;
    }
    // toggle the display
    if(currentTab > 0 && currentTab < 3){
        document.getElementsByClassName("header")[0].style = "display:block;";
        document.getElementsByClassName("button top")[0].style = "display:block";    
        document.getElementsByClassName("button bottom")[0].style = "display:block";
    } else if (currentTab == 0 || currentTab==3) {
    document.getElementsByClassName("header")[0].style = "display:none;";
    document.getElementsByClassName("button top")[0].style = "display:none";
    document.getElementsByClassName("button bottom")[0].style = "display:none";
    };


    // return if n is -1
    if(n === -1) { 
        if(currentTab==1){
            checked_timestamps = [];
            (document.getElementsByClassName("nextBtn")[0]).setAttribute("onclick", 'secondToThird(this)');
            (document.getElementsByClassName("nextBtn")[2]).setAttribute("onclick", 'secondToThird(this)');
        } else if (currentTab==2) {
            console.log("change the buttons onclick event");
        }
        return;};
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
            //document.getElementsByClassName("nextBtn")[0].onclick = 'secondToThird(this)';
            (document.getElementsByClassName("nextBtn")[0]).setAttribute("onclick", 'secondToThird(this)');
            (document.getElementsByClassName("nextBtn")[2]).setAttribute("onclick", 'secondToThird(this)');

            break;
        case 2:
            // the third tab
            console.log("second next");
            buildThirdTab(checked_timestamps); 
            console.log(checked_timestamps);
            (document.getElementsByClassName("nextBtn")[0]).setAttribute("onclick", 'checkFileType(this)');
            console.log((document.getElementsByClassName("nextBtn")[2]));
            (document.getElementsByClassName("nextBtn")[2]).setAttribute("onclick", 'checkFileType(this)');
            
            break;
        case 3:
            // the fourth tab
            console.log("last next"); 
            
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
  
      // the footer becomes relative when the table size is more than the window size
      if ($(document).height() > docheight) {
        document.getElementsByClassName("footer")[0].style = 'position:relative; width:100%';
      }; // makes the position relative
  
    //alert(limit);
  };
  
  function checkall(that,tabname="secondtab") {

    if(tabname == "thirdtab") {
        var table_body = that.closest("tbody");
        ($(table_body).find("."+that.className)).filter(':checkbox').prop('checked', that.checked);
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
                e.parentElement.innerHTML += '<br><div class="timeformat" id='+ stamp +'>'+ timeFormat +'<div style="display:inline; cursor:pointer;" onclick="displayFiles(1,this)"> &#8609;</div><br><div class="files"><br>Files:<br><table></table></div></div>';
                
                return;
            } else if (e==dates[dates.length-1]) {
                thirdtabcontent.innerHTML += '<div class = "stamp"><div class="date" id="'+ dateFormat +'">'+ dateFormat +'</div><br><div class="timeformat" id="'+ stamp +'">'+ timeFormat+'<div style="display:inline; cursor:pointer;" onclick="displayFiles(1,this)"> &#8609;</div><br><div class="files"><br>Files:<br><table></table></div></div></div><br><br><br>';
            };
        });
    } else {
        thirdtabcontent.innerHTML += '<div class = "stamp"><div class="date" id="'+ dateFormat +'">'+ dateFormat +'</div><br><div class="timeformat" id="'+ stamp +'">'+ timeFormat+'<div style="display:inline; cursor:pointer;" onclick="displayFiles(1,this)"> &#8609;</div><br><div class="files"><br>Files:<br><table></table></div></div></div><br><br><br>';
    };

    });
    // positioning problem
    setTimeout(function(){
            
    if ($(document).height() > docheight) {
        document.getElementsByClassName("footer")[0].style = 'position:relative; width:100%';
      }; // makes the position relative

    }, 1);

};

function displayFiles(n,that){
    var nmonDir = document.getElementById("selected_directory").innerText;
    if(n == 1){
        that.innerHTML=' &#8607;';
        $(that).siblings('.files')[0].style='display: block;';
        var nmonFiles = JSON.parse(ajaxCall("directory_path",nmonDir+that.parentElement.id));
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

    // toggle the footer style to adjust the position
    if ($(document).height() > docheight) {
        document.getElementsByClassName("footer")[0].style = 'position:relative; width:100%';
      }; // makes the position relative
    if($(document).height() < docheight) {
        document.getElementsByClassName("footer")[0].style = 'position:absolute; width:99%'
    } // makes the position absolute
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
            
            //inserts the heading
            var table_length = files_log_table.rows.length;
            var row = files_log_table.insertRow(table_length);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = '<b>'+nmonHeader[i]+'</b>';
            cell2.innerHTML = '<b>Check all:</b> <input type="checkbox" class="'+ nmonHeader[i] +'" onchange="checkall(this,\'thirdtab\')" >';

            //inserts the file names
            nmonFiles.forEach(function(filename){
                var el = filename.substr(0, filename.indexOf('_'));
                if(el == nmonHeader[i]){
                    var table_length = files_log_table.rows.length;
                    var row = files_log_table.insertRow(table_length);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.innerHTML = filename;
                    cell2.innerHTML = '<input type="checkbox" class="'+nmonHeader[i]+'" id="'+ filename +'" ></input>';
                }; 
            });
        };

    };

};

function checkFileType(that) {
    var checked_files = $(".files :checkbox[id]:checked");
    if(!checked_files.length){return;}
    console.log(checked_files);
    // initialise a javascript object to store the selected files
    var selectedFiles = {};

    checked_files.each(function(i,e){

        var filetypeExists = (checkDuplication(Object.keys(selectedFiles),e.className));
        // if the filetype exists
        if(filetypeExists) {
            var timestampExists = (checkDuplication(Object.keys(selectedFiles[e.className]),(e.closest("div[id]")).id));
            if(timestampExists){
                selectedFiles[e.className][(e.closest("div[id]")).id].push(e.id);
            } else {
                // define the array that keeps record of the file names
                selectedFiles[e.className][(e.closest("div[id]")).id] = [];
                // the selected file name are stored inside the array
                selectedFiles[e.className][(e.closest("div[id]")).id].push(e.id);
            };
        // if file type doesn't exist then create one
        } else {
            selectedFiles[e.className] = {};
            // define the array that keeps record of the file names
            selectedFiles[e.className][(e.closest("div[id]")).id] = [];
            // the selected file name are stored inside the array
            selectedFiles[e.className][(e.closest("div[id]")).id].push(e.id);  
        };

    });

    console.log(selectedFiles)

    scrutiniseObject(selectedFiles);
};

function scrutiniseObject(filesObject) {
    if(Object.keys(filesObject).length == 1){
        console.log("single file type");
        console.log("file type wise");
        var filesData = {files: filesObject, sorting:"filetype"};
        sendData(filesData);

    } else { // else multiple files type exist

        // both the types have are from a single timestamp directory -> then make a chart within directory
        if(singleDirectory(filesObject)){
            var filesData = {files: filesObject, sorting:"timestamp"};
            sendData(filesData);
        } else {
            console.log("multiple file type + multiple directory")
            console.log("ask the user if he wants the charts to make timestamp wise or file type wise");
            console.log("take to the next tab to ask");
        };
    };

    function singleDirectory(obj){
        // saves the timestamp of the first key
        var timestamp = Object.keys(obj[Object.keys(obj)[0]])[0];
        // returns true if all the files are from only one timestamp directory
        return (Object.keys(obj).every(function(e){
        // if the length of the key object is one and the timestamp match -> means that files from a single timestamp directory are selected
        if((Object.keys(obj[e]).length==1)&&(Object.keys(obj[e])[0]==timestamp)){return true;}
        }));   
    };

};

// send data via post method to make chart
function sendData(filesData){
    console.log(filesData);
    console.log($("#submitInput"));
    $("#submitInput").attr('value',JSON.stringify(filesData));
    $( "#submitform" ).trigger( "click" );
};

// functions for the fourth tab
