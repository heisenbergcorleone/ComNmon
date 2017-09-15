
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
//for trigger the chart button

$("div.buttons > button").click(function(e){
	if(this.innerText == "Configuration") {
		return console.log("config");
	}
	var buttonId = this.id;
	$("iframe").each(function(){
		var sum_button = $(this).contents().find('button#'+buttonId);
		if(sum_button.length){
			sum_button.trigger("click");
		}
	})
})




	
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