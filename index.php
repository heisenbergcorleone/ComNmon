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
        <script src="script.js"></script>
    </body>
</html>