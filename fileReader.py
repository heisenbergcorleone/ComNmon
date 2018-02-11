#!/usr/bin/python3
# -*- coding: UTF-8 -*-# enable debugging
print("Content-Type: text/html;charset=utf-8")
print()
from collections import OrderedDict
import cgi,cgitb,json
cgitb.enable()
form = cgi.FieldStorage() #stores the get or post request values

fileDict = json.loads(form['fileListObj'].value, object_pairs_hook=OrderedDict) # fetch the file object/dict and fix the positions
chartId = form['chartId'].value # store the chart id/type
print("")

print(fileDict)

print("")


# function for mergeFiles -> One server One Run
def oneRunTypeReader(filename, timestampDir ,chartDatesList, chartLinesList):

    with open("./nmon/"+str(timestampDir)+"/"+str(filename)) as f:
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
        #print(linesList)

        # split the lines list into the chartDateList and chartLinesList

        #chartDateList
        temp = list()
        for lines in linesList:
            char = "'"
            temp.append(lines[lines.find(char)+len(char):lines.rfind(char)])
        chartDatesList.append(temp)

        #chartLinesList
        temp = list()
        for lines in linesList:
            char = ","
            # appends the 100 minus last number of each of the string element-> 100-Idle% or the total consumed %
            temp.append(round(100-float(lines[lines.rfind(char)+len(char):len(lines)-1]),2)) 
        chartLinesList.append(temp)        




# for files belonging to a single server type and single run
def combineFiles(chartDatesList,chartLinesList,structure,structurePoints): 

    for index,datelist in enumerate(chartDatesList):

        # for points
        pointList = chartLinesList[index]

        if(index == 0):
            for i,date in enumerate(datelist):
                structure.append([date])
                # append the points in the structurePoints array 
                structurePoints.append([pointList[i]])

        else: # if there are multiple selected files
            
            
            
            curPoint = pointList

            # current file list
            curList = datelist

            # previous list
            prevList = chartDatesList[(index-1)]
            
            

            # formatted values for comparison
            # first value of the current list
            fcurVal = (curList[0][curList[0].find("(")+1:curList[0].rfind(")")].replace(", ", "").replace(" ", ""))
            # last value of the prev list
            fprevVal = ((prevList[len(prevList)-1])[(prevList[len(prevList)-1]).find("(")+1:(prevList[len(prevList)-1]).rfind(")")].replace(", ", "").replace(" ", ""))
            
            
            if (fcurVal <= fprevVal): # means the date can be merged
                diff = list()
                for prevdate in prevList:
                    fprevdate = (prevdate[prevdate.find("(")+1:prevdate.rfind(")")].replace(", ", "").replace(" ", ""))
                    diff.append(int(fcurVal)-int(fprevdate))                
                
                closestZero = min((abs(x),x) for x in diff)[0]
                indexclosestZero = diff.index(closestZero)

                # store the breakpoint or the point of closest matching time
                breakpoint = ""
                for elements in structure:
                     if(elements[(len(elements)-1)] == prevList[indexclosestZero]):
                         breakpoint = structure.index(elements)
                         break

                minIter = 0
                maxIter = int(breakpoint) + len(curList)
                

                while minIter < maxIter:
                    
                    if(minIter < breakpoint):
                        structure[minIter].append("x")
                        structurePoints[minIter].append(0.0)

                    else: # when breakpoint is achieved
                        if(minIter < len(structure)): # add with existing points
                            structure[minIter].append(curList[minIter-breakpoint])
                            
                            # append the points in the list
                            structurePoints[minIter].append(pointList[minIter-breakpoint])
                        
                        else: # create new points
                            
                            iterate = 0
                            temp = []
                            tempPoint = []
                            while iterate < index:
                                temp.append("x")
                                tempPoint.append(0.0)

                                iterate = iterate + 1
                            temp.append(curList[minIter-breakpoint])

                            tempPoint.append(pointList[minIter-breakpoint])

                            structure.append(temp)
                            # append the points
                            structurePoints.append(tempPoint)

                    minIter = minIter + 1

                
            else: # if no common points are found between the current and previous points
                for indexSt,datepoints in enumerate(structure):
                    # add the second column
                    datepoints.append("x")

                    # append points
                    structurePoints[indexSt].append(0.0) 

                
                # add the rows 
                for i,date in enumerate(datelist):
                    row = []
                    rowPoint = []

                    iteration = 0
                    while iteration < index:
                        row.append("x")
                        rowPoint.append(0.0)

                        iteration = iteration + 1
                    row.append(date)
                    rowPoint.append(pointList[i])

                    structure.append(row)
                    structurePoints.append(rowPoint)



# merge files if they belong to the same run and type of server
def mergeFiles(filenameList,timestampDir):
    # sort the list first
    filenameList.sort() 
    chartDatesList = list()
    chartLinesList = list()

    for filename in filenameList:
        # get the contents of the specific chart
        oneRunTypeReader(filename, timestampDir, chartDatesList, chartLinesList)
    
    structurePoints = list()
    structure = list()

    # coombine the data of the files to form a single chart
    combineFiles(chartDatesList,chartLinesList,structure,structurePoints)

    structureDates = list()

    i = 0
    for index,dateRow in enumerate(structure):
        if(dateRow[i] == "x"):
            i = i + 1
            structureDates.append([dateRow[i]])
        else:    
            structureDates.append([dateRow[i]])
        
    mergeList = list()

    for index,dateRow in enumerate(structureDates):
        mergeList.append(dateRow+(structurePoints[index]))


    for data in mergeList:
        print(data)




# reads the file dictionary and to merge and sort average points from the files
def parseFileDict(fileDict): 
    for index,heading in enumerate(fileDict):
        # print(heading)
        headingValue = fileDict[heading]
        print('')
        print("for heading: "+ str(heading) + ", the length is: " +str(len(headingValue)))
        print("")


        for subHead in headingValue:
            
            # set the timestamp directory name
            timestampDir = subHead if subHead.isdigit() else heading
            

            if(len(headingValue) == 1):
                # means the selected file type are of one type of server and belong to a single run too
                print("")
                print("merge")
                mergeFiles(headingValue[subHead],timestampDir)
                print("")
            elif(len(headingValue) > 1):
                print("average")
                #print(subHead)
                #print(headingValue[subHead])


# parse the file dictionary
parseFileDict(fileDict)
