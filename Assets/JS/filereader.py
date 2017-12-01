#!/usr/bin/python3
# -*- coding: UTF-8 -*-# enable debugging
print("Content-Type: text/html;charset=utf-8")
print()
import cgi,cgitb,json
cgitb.enable()

form = cgi.FieldStorage()
counter = 1
table_details = {'table1': ""}
filenameArray = ((form['filenames'].value)).split(',') # the split method is used in order to convert the string into a list
table_directory = {}
table_counter = 1
table_arrayy = []

def difference_interval_snapshots():
    
    return True

def difference_configuration():

    return True





def compareTable(filename,data):
    indexofinterval = data.index("<li>Interval")
    diff_int_snap = difference_interval_snapshots()
    diff_config = difference_configuration()

    if(diff_int_snap):
        print("difference in intervals and snapshots")

    elif(diff_config):
        print("difference in config")
    else:
        print("no difference at all")



def fileReader(filename):
    global table_counter
    code = ""
    with open("../../Temp/"+str(filename)) as f:
        content = f.read()
        # the closing and opening position-index required for trimming the string
        closingIndex = content.index("</body>")
        openingIndex = content.index("<table>")
        counter = openingIndex
        while counter < closingIndex:
            code +=content[counter]
            counter +=1
            #if the directory isn't empty
        if(len(table_directory)):
            compareTable(filename,code)
            #print("comparing the directory")
        else:
            #put it into the directory
            table_directory['data'+str(table_counter)] = code
            table_directory['filename'+str(table_counter)] = '<li>'+ filename
            table_counter = table_counter + 1

    #print(table_directory)

for filename in filenameArray:
    fileReader(filename)



'''
#print(filenameArray)
for filename in filenameArray:
    if table_details['table'+str(counter)] == "":
        table_details['table'+str(counter)] += filename
    else:
        table_details['table'+str(counter)] += ", "+filename

#somevalue = (json.dumps({'6': 5, '6': 7}, sort_keys=True, indent=4))
print(table_details)
def fileReader(): #building a file reader for the selected files which prepares the table_details dictionary!
    
    return("Hi, I am the file reader")

print(fileReader())

'''