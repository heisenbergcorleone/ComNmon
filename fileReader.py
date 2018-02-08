#!/usr/bin/python3
# -*- coding: UTF-8 -*-# enable debugging
print("Content-Type: text/html;charset=utf-8")
print()
import cgi,cgitb,json
cgitb.enable()
form = cgi.FieldStorage() #stores the get or post request values

# store the relevant file data
fileListObj = form['fileListObj'].value # fetch the JSON object with the corresponding key
timestampDir = form['timestampDir'].value  # store the directory name
chartId = form['chartId'].value # store the chartId
fileList = json.loads(fileListObj) # convert the json object into python list
fileList = fileList[::-1] # reversed list



print("for directory "+timestampDir+ " the files are:")
print()

interval = 3
snapshots = 10

chartLinesList = list()
chartDatesList = list()


once = False

def fileReader(filename):
    global once, chartDatesList, chartDatesList
    if once:
        return

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
        



# read the files and store the chart points and dates
for filename in fileList:
    fileReader(filename)


# the following function assu,ed that the selected files belong to the onerun-onetype group

# and therefore the timelines will be extended and shown in the graph


structurePoints = list()

structureDates = list()

structure = list()

def combineFiles(): # for a file belonging to a single server type and single run
    global chartDatesList, chartLinesList, structure, structurePoints

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


# run the function when the selected set of file belong to a particular server and run
combineFiles()



# merges all the separeted dates into one single file

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


for some in mergeList:
    print(some)































#print(json.dumps(fileListDict))
#fileHeading = (list(fileListDict.keys())[0]) #store the file naem in a variable
#print(fileHeading)
#print(((form['fileListObj'].value)).split(','))
