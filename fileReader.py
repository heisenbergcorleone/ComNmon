#!/usr/bin/python3
# -*- coding: UTF-8 -*-# enable debugging
print("Content-Type: text/html;charset=utf-8")
print()
import cgi,cgitb,json
cgitb.enable()
form = cgi.FieldStorage() #stores the get or post request values
fileListObj = form['fileListObj'].value # fetch the JSON object with the corresponding key
timestampDir = form['timestampDir'].value  # store the directory name

print("for directory "+timestampDir+ " the files are:")
print()



fileList = json.loads(fileListObj) #convert the json object into python dict
fileList = fileList[::-1] # reversed list

for val in fileList:
    print("+++"+val)


#print(json.dumps(fileListDict))
#fileHeading = (list(fileListDict.keys())[0]) #store the file naem in a variable
#print(fileHeading)
#print(((form['fileListObj'].value)).split(','))




print()
print()