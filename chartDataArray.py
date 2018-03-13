#!/usr/bin/python3
# -*- coding: UTF-8 -*-# enable debugging
print("Content-Type: text/html;charset=utf-8")
print()
from collections import OrderedDict
import cgi,cgitb,json
cgitb.enable()
form = cgi.FieldStorage() #stores the get or post request values

filesDict = json.loads(form['filesObj'].value, object_pairs_hook=OrderedDict) # fetch the file object/dict and fix the positions
nmonDir = form['nmonDir'].value # store the nmon dir loc
chartIdList = json.loads(form['chartIds'].value) # store the chart ids


chartDataArray = OrderedDict()


def getContent(filelocation,chartId):
    with open(nmonDir+filelocation) as f:
        content = f.read()
        fileLength = len(content)
        chartIndex = content.index("data_"+chartId)
        linesString = ""
        condition = False
        while chartIndex < fileLength:
            if content[chartIndex] == "]" and content[chartIndex + 1] == ")" and content[chartIndex + 2] == ";":
                break
            if content[chartIndex] == "," and content[chartIndex + 1] == "[" and content[chartIndex + 2] == "'":
                condition = True
            if condition == True:
                linesString += content[chartIndex] #add characters in the lines string
            chartIndex += 1
        # convert string into list
        linesList = linesString.split("\n")
        # fix the list by removing the last element -> i.e \t 
        linesList.pop()
        
        chartDataArray[filelocation+"/"+chartId] = json.dumps(linesList)



def getChartDataArray():
    for run in filesDict:
        for filetype in filesDict[run]:
            for filename in filesDict[run][filetype]:
                fileLocation = run+"/"+filename
                for chartId in chartIdList:
                    getContent(fileLocation,chartId)
    
    print(json.dumps(chartDataArray))


getChartDataArray()
