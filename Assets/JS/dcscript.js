var result = []; // this global array stores the selected file names

$(document).ready(function(){
var button = document.getElementById("displayData");
var displayFrames = document.getElementById("frames");
var table_div = document.getElementById("tables");
var mess_el = document.getElementById("message");
var difference_found = false;
var currentFrame;

button.addEventListener("click", function(){
    var table_object = {};
    result = [];
    var iframeEl = document.getElementById("iframe");
    $("#iframe").empty(); // frames div is cleared out
    $('#tables').empty(); // likewise table div

    var select = document.getElementsByTagName('select')[0];
    var options = select && select.options;
    var opt;

  for (var i=0; i<options.length; i++) {
    opt = options[i];

    if (opt.selected && opt.value != "Select File(s)") {
      result.push(opt.value);
    }
  }
  console.log(result) // the selected files are displayed here
  var fileNameCounter = 0;
  var tableCounter = 1;


  function fetch_table_contents() {

    if(fileNameCounter == result.length) {
      append_table_iframe();
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
  var bodyClosedIndex = data.indexOf("</body>"); // index of the closed body tag
  var tableOpenedIndex = data.indexOf("<table>") // index of the opened table tag
  for (var i = 0; i < data.length ; i++) {
    
    
    if (i == bodyClosedIndex) {
       // console.log(i+ "when the index if found via logic"); break;
      if (!Object.keys(table_object).length) { 
        table_object["tab"+parseInt(tableCounter)] = table_contents;
        table_object["tab"+parseInt(tableCounter)+"_file"] = '<li>' + filename;
        tableCounter++;
      } else  { // if the table_object isn't empty then check for the difference
        check_difference(table_contents,filename);
      }
      
      table_contents = "";
      break;
    }
    


    if( i == tableOpenedIndex) {
      condition = true;
    }

    if (condition) {
      table_contents += data.charAt(i);
    }
  
  
  };
};



function check_difference (data,filename) {

  var condition = false;
  var index_of_Interval = data.indexOf("<li>Interval"); // reducing the data to exclude `time` from comparison
  var data_for_comparison = data.slice(index_of_Interval);


  Object
  .keys(table_object)
  .filter(function (k) { return !/_/.test(k); }) // checks the difference with only the table in the object
  .forEach(function (k) { 
    var table_content_for_comparison = table_object[k].slice(table_object[k].indexOf("<li>Interval"));
    if(data_for_comparison == table_content_for_comparison) {
      table_object[k+"_file"] += '<li>' + filename;
      condition = true;
    }
  
  });

  if (condition == false) {
      // here the rest of the different tables are checked with the first ones to see if the interval and snapshots differ or no
    table_object["tab"+tableCounter] = data;
    table_object["tab"+parseInt(tableCounter)+"_file"] = '<li>' + filename;
    tableCounter++;
  };

 



};

  // an object is created with the table contents and the respective file names
function append_table_iframe() { //table will be appended in the dom
  check_diff_inter_snap(); // checks if the interval and snapshots are different



  iframeEl.width = window.innerWidth/1.1;
  iframeEl.height = window.innerHeight/1.1;
  mess_el.style = 'display: none;'
  iframeEl.style = 'display: block';
  (iframe.contentWindow.document.getElementsByTagName("body")[0]).setAttribute("bgcolor", "#EEEEFF"); 
  var iframe_message = '<h2 style="color:blue">Click on a Graph button above, to display that graph</h2>';
  difference_found == true ? iframe_message += '<br><h3>Interval/Snapshots are different. Check tables!</h3>' : iframe_message;
  (iframe.contentWindow.document.getElementsByTagName("body")[0]).innerHTML = iframe_message;  
  
  
  Object.keys(table_object).forEach(function(k,index){ // the table along with the file names are appended in the element

      if(index%2){
        table_div.innerHTML += '<b>' + "FILE(S): " + table_object[k] + '</b>';
      } else {
      table_div.innerHTML +=table_object[k]
    };
  });
}; 

function check_diff_inter_snap () { // checks if the intervals and snapshots are different between the tables
  
  if (Object.keys(table_object).length >= 3) {  // checks for 3 or more means that there are atleast two tables
    var firstTable = table_object.tab1; // first table is set as the basis for comparison
    const get_CompIntervalIndex = firstTable.indexOf("Interval"); 
    const get_CompClosingIndex = firstTable.indexOf('<td>\n<li>Number');
  
    const string_for_comp = firstTable.slice(get_CompIntervalIndex,get_CompClosingIndex);

    Object
    .keys(table_object)
    .filter(function (k) { return !/_/.test(k); }) 
    .forEach(function (k,index) { //if the interval and snapshot is different then they are marked red
      if (index == 0) {return};

      var get_IntervalIndex = table_object[k].indexOf("Interval"); 
      var get_ClosingIndex = table_object[k].indexOf('<td>\n<li>Number');
        
      var table_string = table_object[k].slice(get_IntervalIndex,get_ClosingIndex);

      if(table_string != string_for_comp) {
        table_object[k] = table_object[k].replace(table_string, ('<font color="red">' + table_string + '</font>'));
        difference_found = true;
      };
    });

  };

};


  

})// button click closes





});// window.ready closes