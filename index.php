<html>
    <head>
        <title>SysAdmin's comNmon</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="styles.css">
    </head>

    <body>
        <div id="homepage" style='display: block;'>
            <div class="center">
                <b id="sysadmin">SysAdmin's</b><br>
                <b id="project_name">comNmon</b><br><br>
                Enter the path to the nmon Directory:<br>
                <input type="text" id="directory" />
                <button id='submit' onclick="getFolder()">Submit</button>
            </div>
            <div id="documentation"><a href="lintodocs"><b>Documentation</b></a></div>
        </div>
        <script>
            var dir_location = document.getElementById("directory");

            dir_location.addEventListener("keyup",function(e){
                if (e.keyCode == 13) {
                    getFolder()
                }
            })

            function getFolder() {
                if(dir_location.value != ""){
                    var location_val = dir_location.value;
                    $.ajax({
                        type: "GET",
                        url: "./server.php",
                        data: {'directory_location': location_val }, 
                        dataType: "text"
                        }).done(function(response) {
                            if(response == "not_available"){
                                alert("Directory isn't available")
                            } else {
                                console.log(response)
                            };
                    });
                }
            }

        </script>
    </body>
</html>