$(document).ready(function(){

//to trigger the chart button
var dataPHP = []; // stores the chart data, options and id values of a specific chart 
var condition = true;
$("div.buttons > button").click(function(e){
dataPHP[2] = '"' + this.id + '"';
if(this.innerText == "Configuration") {
	return console.log("config");
}

var core_id = (this.id).slice(5);


for (var i = 0 ; i < result.length; i++) {

	get_file_details(result[i],core_id); // fetches the chart's data and option and stores into the dataPhp varible
	get_chart_details(i); // appends the chart_maker.js file into the iframes
};
var buttonId = this.id;

$("iframe").each(function(){ // this function triggers the button the iframe -> to make the chart displayed
	var sum_button = $(this).contents().find('button#'+buttonId);
	if(sum_button.length){
		sum_button.trigger("click");
	}
});



});


function get_chart_details (i) { // fetches the content inside the chart_maker file

var file_location = "chart_maker.js";

var rawFile = new XMLHttpRequest();
rawFile.open("GET", file_location, false);

rawFile.onreadystatechange = function () {
	if(rawFile.readyState === 4) {
		if(rawFile.status === 200 || rawFile.status == 0) {
			var allText = rawFile.responseText;
			appendData(i,allText);
		}
	}
}

rawFile.send(null);


};

function appendData (i,chart_data_function) { // appends all the required data that are necessary to make the chart into the iframes
var iframe = document.getElementsByTagName("iframe")[i];
var iframe_dom = iframe.contentWindow.document;

if(iframe_dom.getElementById("chart_data") != null && iframe_dom.getElementById("chart_function") != null) {
	iframe_dom.getElementById("chart_data").remove();
	iframe_dom.getElementById("chart_function").remove();
}

var script_data = document.createElement("script");
script_data.id = "chart_data";
script_data.innerHTML =  "var dataPHP = ["+ dataPHP +"]";
iframe_dom.body.insertBefore(script_data,iframe_dom.body.lastElementChild);

var script_function = document.createElement("script");
script_function.id = "chart_function";
script_function.innerHTML = chart_data_function;
iframe_dom.body.appendChild(script_function);

};






function get_file_details (filename,core_id) {

var file_location = "Templates/" + filename;

var rawFile = new XMLHttpRequest();
rawFile.open("GET", file_location, false);
rawFile.onreadystatechange = function () {
	if(rawFile.readyState === 4) {
		if(rawFile.status === 200 || rawFile.status == 0) {
			var allText = rawFile.responseText;
			get_chart_data(allText,core_id);
			get_chart_option(allText,core_id);

		}
	}
}
rawFile.send(null);
};

function get_chart_data (filetext,core_id) { // filters the whole file and gets the chart data
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


function get_chart_option (filetext,core_id) { // filters the whole file and gets the option data
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

};


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