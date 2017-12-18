<html>
    <head>
        <title>SysAdmin's comNmon</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="styles.css">
    </head>

    <body>

      <form action="server.php" method="post" onsubmit="return false">
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
        <div class="tab">
          HEY There <button type="button" class="prevBtn" onclick="nextPrev(-1)">Previous</button>
    <button type="button" class="nextBtn" onclick="nextPrev(1)">Next</button>


        </div>
        <!-- time directory page -->
        <div class="tab">
          <button type="button" class="prevBtn" onclick="nextPrev(-1)">Previous</button>
    <button type="button" class="nextBtn" onclick="nextPrev(1)">Next</button>
        </div>
        <!-- optional conditon page -->
        <div class="tab">
          <button type="button" class="prevBtn" onclick="nextPrev(-1)">Previous</button>
        </div>
          <div class ="footer">
            <!-- Circles which indicates the steps of the form: -->
            <div style="text-align:center;margin-top:40px;">
              <span class="step"></span>
              <span class="step"></span>
              <span class="step"></span>
              <span class="step" style="background-color:red;"></span>
            </div>


            <footer>
              <a href='someimportant'><b>Documentation</b></a>
            </footer>
          </div>
      </form>
        <script src="script.js"></script>
        <script type="text/javascript">
          $(document).ready(function(){
            handleLog();
            showTab(currentTab); // Display the crurrent tab
          })
        </script>
    </body>
</html>
