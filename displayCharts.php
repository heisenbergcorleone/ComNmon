<select id="displayCharts">
    <option selected="">Choose one</option>
<?php

$dir    = 'F:\UniServerZ\www\servers\Templates';
$files = scandir($dir);
//print_r($files);
foreach($files as $name) { ?>
    <option value="<?php echo $name ?>"><?php echo $name ?></option>
<?php
  } ?>

?>
</select>
<button id="displayData"></button>
<script>
var array = [];
var doc = document.getElementById("displayCharts");
console.log(doc);

// Event listner to check if a value has been changed? if yes, it pushes the value to the array
doc.addEventListener("change", function() {
    if(array.length < 4) {
        var value = this.value;
        // checks for a condition: that the value has been already added to the array or no!
        if(array[0] != value && array[1] != value && array[2] != value && array[3] != value){
            array.push(this.value);
        }
        console.log(array)
    }
    
})

</script>