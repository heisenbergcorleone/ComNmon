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
              <!-- project name -->
              <div class="center">
                  <b>SysAdmin's</b><br>
                  <b id="project_name">comNmon</b><br><br>
                  Change the directory path if needed:<br>
                  <div>
                      <input placeholder="./nmon" type="text" id="directory"></input>
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
        <div id="formModal" class="modal">

          <div class ="modal-content">
            <span onclick="modalToggle()" class="close">&times;</span>
              <form action="chartMaker.php" target="_blank" id="postForm" method="POST">
                Select a sorting mechanism:
                <br><br>
                <input style="display:none;" id ="submitInput" name="filesData" value="" type="text">
                <div style="width:35%; float:left">
                  <button type="button" id="filetypewise" class="submit">FILE-TYPE WISE</button>
                </div>
                <div style="width:35%; float:right">
                  <button type="button" id="runwise" class="submit">RUN WISE</button>
                </div>
                <div style="clear:both;"></div>
              </form>
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
        </div>
        <footer>
          <a href='someimportant'><b>Documentation</b></a>
        </footer>
      </div>
        <script src="script.js"></script>
        <script type="text/javascript">
          $(document).ready(function(){
            showTab(currentTab); // Display the current tab
          })
        </script>
    </body>
</html>
