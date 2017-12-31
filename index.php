<html>
    <head>
        <title>SysAdmin's comNmon</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="styles.css">
    </head>

    <body>
      <div class="header">
        <header>
        Selected Directory: <b><span id='selected_directory'></span></b>
        </header>
      </div>
      <div class="button top">
        <button type="button" class="prevBtn" onclick="nextPrev(-1)">Previous</button>
        <button type="button" class="nextBtn" onclick="nextPrev(1)">Next</button>
      </div>

      <div id="content">
<!-- index page -->
        <div class="tab">
          <!-- directory log table -->
          <div class="topleft">
                  <table id="dir_log" style='display: none;'>
                  </table>
          </div>
              <!-- project name -->
              <div class="center">
                  <b>SysAdmin's</b><br>
                  <b id="project_name">comNmon</b><br><br>
                  Enter the path of the nmon directory:<br>
                  <div>
                      <input type="text" id="directory"></input>
                      <button class='nextBtn' onclick="return getFolder(this.previousSibling.previousSibling.value);">Next</button>
                  </div>
              </div>
        </div>
<!-- date directory page -->
        <div class="tab" id="secondtab"><br>
            <div class="main">
              <div class="directorylist" style="width:35%; float:left">
                <button  id="loadall" onclick="addDirectory(this)">Load All</button>
                <br><br>
                <table id="directory_list_table">
                  <tr>
                    <th>Directory List</th>
                    <th>Check all: <input type="checkbox" onchange="checkall(this)" id="checkbox_all"></th>
                  </tr>
                </table>
                <div class="tableButton">
                </div>
              </div>
              <div class="calendar" style="width: 35%; float:right">
                CALENDAR
              </div>
              <br style="clear:both;"/>
              <br>
          </div>

        </div>
<!-- time directory page -->
        <div class="tab" id="thirdtab"><br>
          <div id="thirdtabcontent"></div>
          <!-- this tab will be built up by the javascript function -->
        </div>
<!-- optional conditon page -->
        <div class="tab">
          <button type="button" id="lastPrev" class="prevBtn" onclick="nextPrev(-1)">Previous</button>
          <div  id="fourthtab">
            <div id ="fourthtabcontent">
              <h4><i>It seems that the selected files are of Multiple Types and are from different Timestamp directories, kindly choose the sorting mechanism to help the program in making the chart(s) by clicking on one of the buttons below.</i></h4>
                <br>
                <div id="form"><h3>Select your option: </h3> <br><br>
                  <form id="postForm" action="displayCharts.php" target="_blank" method="POST">
                    <input style="display:none;" id ="submitInput" name="fileobject" value="" type="text">  
                    <div class="submitButton" style="width: 35%; float:left">
                      The 'File Types' button will group the selected files according to their file type:
                      <button id="filetype" class="submit">FILE TYPES</button>
                    </div>
                    <div class="submitButton" style="width: 35%; float:right">
                      The 'Timestamp Directory' Button will group them according to the directories:
                      <button id="timestamp" class="submit">TIMESTAMP DIRECTORIES</button>
                    </div>
                    <br style="clear:both;"/>
                  </form>
                </div>
            </div>
          </div>
        </div>
          
      </div> <!-- content -->

      <div class="button bottom">
        <button type="button" class="prevBtn" onclick="nextPrev(-1)">Previous</button>
        <button type="button" class="nextBtn" onclick="nextPrev(1)">Next</button>
      </div>
      <div class ="footer">
        <!-- Circles which indicates the steps of the form: -->
        <div style="text-align:center;margin-top:40px;">
          <span class="step" title="Nmon Directory"></span>
          <span class="step" title="Dates"></span>
          <span class="step" title="Time"></span>
          <span class="step" title="Optional tab - displays when multiple file types are selected" style="background-color:red;"></span>
        </div>
        <footer>
          <a href='someimportant'><b>Documentation</b></a>
        </footer>
      </div>
        <script src="script.js"></script>
        <script type="text/javascript">
          $(document).ready(function(){
            handleLog();
            showTab(currentTab); // Display the current tab
          })
        </script>
    </body>
</html>
