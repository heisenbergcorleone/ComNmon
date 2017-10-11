
$(document).ready(function(){
	$('h2').hide();	
	if($("iframes").context != undefined){
		var iframebody = ($("iframes").context.body);
		$(iframebody).find("button").hide();
	};

	$('.myTable td').hide();

$(".tagsToggle").click(function(){
	 $(".tagContainer").fadeToggle();
			 
})
//to trigger the chart button
var dataPHP = [];
var condition = true;
$("div.buttons > button").click(function(e){
dataPHP[2] = '"' + this.id + '"';
if(this.innerText == "Configuration") {
	return console.log("config");
}
console.log("hello")
var core_id = (this.id).slice(5);


for (var i = 0 ; i < result.length; i++) {

	get_file_details(result[i],core_id);
	get_chart_details(i);
	//appendData(i);
};
var buttonId = this.id;
//setTimeout(function(){

$("iframe").each(function(){
	var sum_button = $(this).contents().find('button#'+buttonId);
	console.log(buttonId);
	if(sum_button.length){
		sum_button.trigger("click");
	}
});

//},1000)


});


function get_chart_details (i) {

var file_location = "chart_maker.js";

var rawFile = new XMLHttpRequest();
rawFile.open("GET", file_location, false);

rawFile.onreadystatechange = function ()
{
	if(rawFile.readyState === 4)
	{
		if(rawFile.status === 200 || rawFile.status == 0)
		{
			var allText = rawFile.responseText;
			appendData(i,allText);
		}
	}
}

rawFile.send(null);


};

function appendData (i,chart_data_function) {
var iframe = document.getElementsByTagName("iframe")[i];
var iframe_dom = iframe.contentWindow.document;

if(iframe_dom.getElementById("chart_data") != null && iframe_dom.getElementById("chart_function") != null) {
	iframe_dom.getElementById("chart_data").remove();
	iframe_dom.getElementById("chart_function").remove();
}

//var chart_data = iframe_dom.getElementById("chart_data");
//var chart_function = iframe_dom.getElementById("chart_function");
var script_data = document.createElement("script");
script_data.id = "chart_data";
script_data.innerHTML =  "var dataPHP = ["+ dataPHP +"]";
iframe_dom.body.insertBefore(script_data,iframe_dom.body.lastElementChild);

var script_function = document.createElement("script");
script_function.id = "chart_function";
script_function.innerHTML = chart_data_function;
iframe_dom.body.appendChild(script_function);

//chart_data.innerHTML = "var dataPHP = ["+ dataPHP +"]";
//chart_function.innerHTML = chart_data_function;

};






function get_file_details (filename,core_id) {

var file_location = "Templates/" + filename;

var rawFile = new XMLHttpRequest();
rawFile.open("GET", file_location, false);
rawFile.onreadystatechange = function ()
{
	if(rawFile.readyState === 4)
	{
		if(rawFile.status === 200 || rawFile.status == 0)
		{
			var allText = rawFile.responseText;
			get_chart_data(allText,core_id);
			get_chart_option(allText,core_id);

		}
	}
}
rawFile.send(null);
};

function get_chart_data (filetext,core_id) {
var data_id = "data_" + core_id;
var pos_of_data = (filetext.indexOf(data_id)+(data_id.length));
var data_contents = ""; var data_condition = false;

for(var i = pos_of_data ; i < filetext.length; i++) {
	if(filetext.charAt(i) == ")" && filetext.charAt(i+1) == ";") {
		dataPHP[0] = data_contents;
		break;
	};

	if(filetext.charAt(i) == "[") {
		data_condition = true;
	};
	
	if(data_condition) {
		data_contents += filetext.charAt(i)
	}

};
//console.log(data_contents);
};


function get_chart_option (filetext,core_id) {
var option_id = "options_" + core_id;
var pos_of_option = (filetext.indexOf(option_id)+(option_id.length));
var option_contents = ""; var option_condition = false;

for(var i = pos_of_option; i < filetext.length ; i++) {
	if(filetext.charAt(i-1) == "}" && filetext.charAt(i) == ";") {
		dataPHP[1] = option_contents;
		break;
	}
	if(filetext.charAt(i) == "{") {
		option_condition = true;
	}

	if (option_condition) {
		option_contents += filetext.charAt(i);
	}
}
//console.log(option_contents);
};





// Live search 
$("#live-search").keyup(function(){
		
	var filter = $(this).val(), count = 0;
	$(".tagsFilter div").each(function(){
		
		if ($(this).text().search(new RegExp(filter, "i")) < 0) {
			$(this).fadeOut();
		}else {
			$(this).show();
			// count++;
		}
		
	});
	// var numberItems = count;
   
		
		
})//---Live search end here---	

// Tag search History
var searchTags = "";
$("#add-the-tag").click(function(){

 searchTags += $("#live-search").val() + " ,";
 // if(searchTags===''){
	 // alert("Nothing to be add");
 // } 
 
 $( "#Search-History").text(searchTags);
 $("#live-search").val('');
 //searchTags += searchTags;
})


$("#reset-live-search").click(function(){
 $("#live-search").val("");
 $(".tagsFilter div").show();
}); // Tag Search history end here 



// for filter the files on click the filter button

$("#applyFilter").click(function(){
	   $("div.tagContainer").hide();
	//masterFilterArray = $.unique(masterFilterArray);
	masterFilterArray = jQuery.unique( masterFilterArray );
  $("#displaySelectedComponenet").append(masterFilterArray.join("\n"));
})

// get the value of all selected tags in one Master filter Array

var masterFilterArray = [];
$('select#cloudProvider').on('change',function(){
   masterFilterArray.push($(this).find(":selected").val());
   console.log(masterFilterArray);
});

$('select#dataBase').on('change',function(){
	masterFilterArray.push($(this).find(":selected").val());
	console.log(masterFilterArray);
});
$('select#dataBase_config').on('change',function(){
	masterFilterArray.push($(this).find(":selected").val());
	console.log(masterFilterArray);
});


$('input[type="date"]').change(function(){
	masterFilterArray.push(this.value);
	console.log(masterFilterArray);
});


$('input[type="radio"]').change(function(){
	masterFilterArray.push(this.value);
	console.log(masterFilterArray);
});

$('#maxconn').blur(function(){
  masterFilterArray.push($('#maxconn').val());
  console.log(masterFilterArray);
});





});


//

// window.onload = ()=>{


// console.time("My operation");
// maxCount = 100000;
// for(var n = 0; n < maxCount; n++){
// /*perform the operation to be measured*/
// }
// console.timeEnd("My operation");


// }