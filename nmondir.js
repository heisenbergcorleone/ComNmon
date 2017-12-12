$(document).ready(function(){
  addDirectory();
});

var footer = document.getElementsByClassName("footer")[0];
const docheight = $(document).height();


function addDirectory(element) {
  var dirList_div = document.getElementsByClassName("directorylist")[0];
  var dirList_table = document.getElementById('directory_list_table');
  var limit = 3; // limit defines the number of items to be shown at a time
  var condition = false;
  //alert(limit);
  if(element) {
    if(element.id == 0) {
        limit = dirList_array.length; // the limit exceeds to the length of the array to put all the elements in the table
        //element.id = element.id - 1;
    };

    if(element.id == 'loadall') { // if the button load all is clicked
      limit = dirList_array.length; // limit is all
      $(".loadtable").remove(); // the load more button/ all button is removed
    } else {
      $(element).remove();
    };
  };

    for(var i = 0; i < limit; i++) {
        var table_length = dirList_table.rows.length;

        var row = dirList_table.insertRow(table_length);
        var cell1 = row.insertCell(0); // date directory Name
        var cell2 = row.insertCell(1); // checkbox

        cell1.innerHTML = '<label>' + dirList_array[0] + '</label>';
        cell2.innerHTML = '<input type="checkbox" name="checkbox[]" value='+ dirList_array[0] +' ></input>';
        dirList_array.shift();
    };



    if(dirList_array.length){ // button should be created


    if (!element) { // element doesn't exist
      dirList_div.innerHTML += '<br><button id="3" class="loadtable" onclick="addDirectory(this)">Next 3..</button>'; // id defines how many times the button is going to be displayed
    } else { // element exists
      if(element.id == 1) {
        dirList_div.innerHTML += "<button id='"+ (element.id-1) +"' class='loadtable' onclick='addDirectory(this)'>ALL </button>";
      } else if (element.id > 1) { // that means element.id is not 0 -> because load all button has 0 id
        dirList_div.innerHTML += "<button id='"+ (element.id-1)  +"' class='loadtable' onclick='addDirectory(this)'>Next 3..</button>";
      };
    };

    };

    // the footer becomes relative when the table size is more than the window size
    if ($(document).height() > docheight) {
      footer.style = 'position:relative;';
    }; // makes the position relative

  //alert(limit);
};


function checkall(that) {
  if (that.checked == true) {
      $('table#directory_list_table input').attr('checked', true);
  } else {
      $('table#directory_list_table input').attr('checked', false);
  }
};
