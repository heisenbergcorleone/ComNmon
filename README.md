# comNmon
comNmon is a comparative tool for Nmon Charts that compares the charts in the browser itself. Users will be asked to group the charts/files in the one of the two ways to make comparison:
### 1. Run wise
A run is a whole specific time in while a bunch of nmon charts/files are made. Each run may have multiple types of files i.e files from different servers. To separate a group of files made in a particular run from another, all the file of a particular run should be placed in a particular directory named after the timestamp at the creation of that run.

Files will be grouped considering the run.  For example: All the selected nmon charts in the same run will be compared with each other, if there are more than one file of the same type then points of the those charts will be converted into average points. 

### 2. Server Type wise
Server type refers to the type of server of which the nmon chart is made i.e webs server, database server etc.

Files will be grouped considering the type. For example: All the selected webserver files/charts will be compared with each other in a single chart, if files are from different runs then points from the same run will be converted into average points.

###### _Multiple iframes will be used if the sorting method is Run wise and multiple runs are selecte or if sorting method is Server Type and multiple types are selected._

## Naming Convention

### How run-directory should be named?
* The run directory should be named after the timestamp at the creation of the whole run or set of files.

### How the files should be named?
__type-timestamp-users-rampup.html__
* Where type defines the type of the file, webserver or database server or cache etc. 
* Timestamp is the time when the file was created. 
* Users stand for the number of users or load taken by the server. 
* rampup is the total time of execution of the program.

## Maintenance 
__The files should be maintained in the nested form as below:__

![comNmon dir](https://github.com/ksdhir/comNmon/blob/master/comNmon_directory.png)


## Languages\Library used:
* JavaScript\Jquery
* Php
* Python


## Setting up Python for browser
* Refer to the link to enable cgi: [https://code-maven.com/set-up-cgi-with-apache](https://code-maven.com/set-up-cgi-with-apache)
* Enable python for browser: [https://www.digitalocean.com/community/tutorials/how-to-set-up-an-apache-mysql-and-python-lamp-server-without-frameworks-on-ubuntu-14-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-apache-mysql-and-python-lamp-server-without-frameworks-on-ubuntu-14-04)
