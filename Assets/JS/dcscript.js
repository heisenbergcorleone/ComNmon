var result = []; // this global array stores the selected file names
console.log(Object.prototype.constructor)

$(document).ready(function(){
var button = document.getElementById("displayData");
var firstFrame = document.getElementById("one");
var displayFrames = document.getElementById("frames");
var currentFrame;

button.addEventListener("click", function(){
    var table_object = {};
    result = [];
    var divElem = document.getElementById("frames");
    $("#frames").empty();

    var select = document.getElementsByTagName('select')[0];
    var options = select && select.options;
    var opt;

  for (var i=0; i<options.length; i++) {
    opt = options[i];

    if (opt.selected && opt.value != "Select File(s)") {
      result.push(opt.value);
    }
  }

  var fileNameCounter = 0;
  var tableCounter = 1;


  function fetch_table_contents() {

    if(fileNameCounter == result.length) {
      append_table_details();
      return;
    };


    var file_location = "./Templates/"+result[fileNameCounter]; ;
    
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file_location, false);
    
    rawFile.onreadystatechange = function () {
      if(rawFile.readyState === 4) {
        if(rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          
          handleData(allText,result[fileNameCounter]);
          fileNameCounter++;
          fetch_table_contents();
        }
      }
    }
    
    rawFile.send(null);
  };


  fetch_table_contents();


function handleData (data,filename) { // this function fetches the table content from each file and appends it into table_object
  var table_contents = "";
  var condition = false;

  for (var i = 0; i < data.length ; i++) {
    
    
    if (data.charAt(i) == "<" && data.charAt(i+1) == "/" && data.charAt(i+2) == "b" && data.charAt(i+3) == "o" ) {
      if (!Object.keys(table_object).length) { 
        table_object["tab"+tableCounter] = table_contents;
        table_object["tab"+parseInt(tableCounter)+"_file"] = filename;
        tableCounter++;
      } else  { // if the table_object isn't empty then check for the differnce
        check_difference(table_contents,filename);
      }
      
      table_contents = "";
      break;
    }
    


    if(data.charAt(i) == "<" && data.charAt(i+1) == "t" && data.charAt(i+2) == "a" && data.charAt(i+3) == "b" ) {
      condition = true;
    }

    if (condition) {
      table_contents += data.charAt(i);
    }
  
  
  };
};



function check_difference (data,filename) {

  var condition = false;
  var index_of_Interval = data.indexOf("<li>Interval"); // reducing the data as we don't want to include `time` as the basis of camparison 
  var data_for_comparison = data.slice(index_of_Interval);


  Object
  .keys(table_object)
  .filter(function (k) { return !/_/.test(k); }) // checks the difference with only the table in the object
  .forEach(function (k) { 
    var table_content_for_comparison = table_object[k].slice(table_object[k].indexOf("<li>Interval"));

    if(data_for_comparison == table_content_for_comparison) {
      table_object[k+"_file"] += ', ' + filename;
      condition = true;
    }
  
  });



  if (condition == false) {
    table_object["tab"+tableCounter] = data;
    table_object["tab"+parseInt(tableCounter)+"_file"] = filename;
    tableCounter++;
  };
};

function append_table_details() { //table will be appened in the dom
  console.log(table_object); 
};



  

})// button click closes





});// window.ready closes