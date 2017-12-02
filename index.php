<html>
    <head>
        <title>SysAdmin's comNmon</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="styles.css">
    </head>

    <body> 
        <div id="homepage" style='display: block;'>
        
        <!-- directory log table -->
            
        <div class="topleft">
                <table id="dir_log" style='display: none;'>
                </table>
            </div>

            <!-- project name -->
            
            <div class="center">
                <b id="sysadmin">SysAdmin's</b><br>
                <b id="project_name">comNmon</b><br><br>
                Enter the path to the nmon Directory:<br>
                <input type="text" id="directory" />
                <button id='submit' onclick="getFolder()">Submit</button>
            </div>
            
            <!-- Doucmentation -->
            
            <div id="documentation"><a href="lintodocs"><b>Documentation</b></a></div>
        
        </div>
        <script>
            
            var dir_location = document.getElementById("directory");
            var dir_log_table = document.getElementById("dir_log");
            var storeDirArray = []; // this array stores the last 3 directory locations
            //console.log(localStorage)

            function handleLog () {
                if (localStorage["comNmonDir"] != undefined) { // when comNmonDir is found i.e if the directory location is available
                    dir_log_table.innerHTML = '<tr><th>Directory Log:</th></tr>';
                    dir_log_table.style = 'display: block;';
                    storeDirArray = JSON.parse(localStorage.getItem("comNmonDir"));
                    // style='display: block;' // table is made visible
                    
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
                        sel_button.setAttribute("onclick", 'selButton(this)'); // select function attribute added
                        cell2.appendChild(sel_button);
                        
                        var del_button = document.createElement("button");
                        del_button.setAttribute("onclick", 'delButton(this)'); // delete function attribute added
                        del_button.innerText = "DEL";
                        cell3.appendChild(del_button);
                    
                    });
                      

                }; // if closed
            }; // handle log closed

            handleLog(); // called
        
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





            dir_location.addEventListener("keyup",function(e){
                if (e.keyCode == 13) {
                    getFolder(dir_location.value)
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
                if(folderVal != ""){ // checks if the value isn't empty
                    
                    var location_val = fixString(folderVal); // the fixString function manipulates the string and returns the value

                    $.ajax({
                        type: "GET",
                        url: "./server.php",
                        data: {'directory_location': location_val }, 
                        dataType: "text"
                        }).done(function(response) {
                            if(response == "not_available"){
                                alert("Directory isn't available")
                            } else {
                                // checks for duplication
                                if(storeDirArray[0] != location_val && storeDirArray[1] != location_val && storeDirArray[2] != location_val) {
                                    if(storeDirArray.length == 3) { // deletes the last element if the length is equal to 3
                                        storeDirArray.pop();
                                    }
                                    storeDirArray.unshift(location_val);          
                                    localStorage.setItem("comNmonDir", JSON.stringify(storeDirArray));
                                }

                                console.log("directory " + location_val + " selected!")
                        }
                            
                        //console.log(storeDirArray);
                    });
                }
            }

        </script>
    </body>
</html>