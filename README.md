# comNmon
comNmon is a comparative tool for Nmon Charts that compares the charts in the browser itself.

### View Type
The charts/servers/nmonfiles can be handled in 5 different way to make the comparison:

#### 1. Average Runs - One chart for Each type
The files will be divided Server Wise, meaning each type of server will have its own chart.
Each line in the chart will represent the Run (average value of all the files of the same type from that run).

#### 2. Average Types - One chart for Each Run
The files will be divided Run wise, therefore each Run will have its own chart.
Each line in every chart will represent the Server Type (average of all the type of server of the same type).

#### 3. Individual Servers - Type Wise
The charts will be divided type wise. All the servers will be represented by a single line and differentiated on the basis of run by different colors withtin the same chart.

#### 4. Individual Servers - Run Wise
The charts will be divided run wise. All the servers will be represented by a single line and differentiated on the basis of type by different colors withtin the same chart.

#### 5. All Servers in their separate charts
All the servers will have their own chart, divided and subdivided by run and type respectively.

## Naming and maintenance

### How run-directory should be named?
* The run directory should be named after the timestamp at the creation of the whole run or set of files. Users can add their info or give a unique name to the directory after the underscore symbol.
_syntax: 1509532200000_myfirstnmonrun_

### How the files should be named?
* Likewise the run-directory, files should also be named in a similar manner. Notice the filename should always start with the type it belong to, and the program isn't compatible in understanding abbreviation ( databaseserver_file1.html, dbserver_file2.html and database_file3.html -  all are of different types), so stick with your native server type naming convention.
_syntax: webserver_file1_numberofusers_anyinfo.html_

### Nmon Directory 
* All the run directories should be placed inside the parent Nmon directory and all the files belonging to the same run should be placed inside their respective run directories.


## Incompatibility
The program is not yet compatible with servers or nmon charts of whose snapshots have been captured at different intervals.
Users are requested to have prior knowledge if they are comparing such charts as it may lead to unexpected results.


## Languages\Library used:
* JavaScript\Jquery
* Php
* Python


## Setting up Python for browser
* Refer to the link to enable cgi: [https://code-maven.com/set-up-cgi-with-apache](https://code-maven.com/set-up-cgi-with-apache)
* Enable python for browser: [https://www.digitalocean.com/community/tutorials/how-to-set-up-an-apache-mysql-and-python-lamp-server-without-frameworks-on-ubuntu-14-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-apache-mysql-and-python-lamp-server-without-frameworks-on-ubuntu-14-04)
* Do not forget to make the python script executable before running the program.
