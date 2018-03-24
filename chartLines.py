#!/usr/bin/python3
# -*- coding: UTF-8 -*-# enable debugging
print("Content-Type: text/html;charset=utf-8")
print()
from collections import OrderedDict
import cgi,cgitb,json
cgitb.enable()
form = cgi.FieldStorage() #stores the get or post request values

# fileDict = json.loads(form['fileListObj'].value, object_pairs_hook=OrderedDict) # fetch the file object/dict and fix the positions

#print(form)

filesDict = json.loads(form['filesObj'].value, object_pairs_hook=OrderedDict) # fetch the file object/dict and fix the positions
chartData = json.loads(form['chartDataArray'].value, object_pairs_hook=OrderedDict) # store chart data array
chartType = form['chartType'].value


# for data in chartData:
#     print(data)
#     print()

chartLines = {}
chartLinesList = list()
chartDatesList = list()
# aligned lists
commonLinesList = list()
commonDatesList = list()

def combineFiles(structure,structurePoints):
    for index,datelist in enumerate(chartDatesList):

        # for points
        pointList = chartLinesList[index]

        if(index == 0): # for the first selected file
            for i,date in enumerate(datelist):
                structure.append([date])
                # append the points in the structurePoints array 
                structurePoints.append([pointList[i]])

        else: # if there are multiple selected files
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



def makeRunsAverage(averageRunsList,averageList):

    if(len(averageRunsList) == 0): # checks if the list is empty
        
        for line in averageList:
            date = line[:1]
            point = [round((sum(line[1:]))/(len(line[1:])),1)]
            newLine = date + point
            averageRunsList.append(newLine)            


    else: # if the list is not empty
        # checks if the length isn't equal then crop either of the two lists
        if(len(averageRunsList)>len(averageList)):
            averageRunsList = averageRunsList[:(len(averageList))]
        elif(len(averageRunsList)<len(averageList)):
            averageList = averageList[:(len(averageRunsList))]

        # append the point
        for i,line in enumerate(averageList):
            point = round((sum(line[1:]))/(len(line[1:])),1)
            # append next to the line i.e the last point for the line
            averageRunsList[i].append(point)

            







def makeAverage(structure,structurePoints,averageValue):

    commonStructurePoints = list() # keeps the list of common structure points
    commonStructure = list() # keeps the list of common structures

    for index,dateRow in enumerate(structure):
        for i,date in enumerate(dateRow):

            if(date == "x"):
                break
            else:
                if (i+1 == len(dateRow)):
                    commonStructure.append(dateRow[0])
                    commonStructurePoints.append(round(((sum(structurePoints[index])/(len(structurePoints[index])))),1))


    if(len(averageValue) == 0): # means the list is empty
        for i,date in enumerate(commonStructure):
            row = [date]
            averageValue.append(row)
        
    else: # the average value list is not empty then make comparison and append the required values
        #comparisons
        if((len(averageValue)) > (len(commonStructurePoints))): # means averageValue has more elements, then crop it
            averageValue = averageValue[:(len(commonStructurePoints))]
        
        elif((len(averageValue)) < (len(commonStructurePoints))): # means the common Structure has more elements, then crop it
            commonStructurePoints = commonStructurePoints[:(len(averageValue))]

    
    for i,value in enumerate(commonStructurePoints):
        averageValue[i].append(value)









def alignDatePoints(step,structurePoints,structure,run,fileList,blacklist):

    if(len(fileList)==1): # if there's only one file then just combine it
        combineFiles(structure,structurePoints)
        return
    
    # for the purpose of aligning the date/points of the file the first file shall be considered to serve as the basis for comparison
    # check if the first file fits for comparison purpose
    if(step == 1):
        # store the datelist of the first and second files
        firstList = chartDatesList[0]
        secondList = chartDatesList[1]
        
        #lDFF = Last Date of First File
        lDFF = firstList[(len(firstList))-1]
        # formatted lDFF
        numberlDFF = (lDFF[lDFF.find("(")+1:lDFF.rfind(")")].replace(", ", "").replace(" ", ""))

        # compare it with the 4th consecutive date of the next/second chart/file
        # 4th date is selected as it makes three lines on the graph -> this can be changed to greater than 4 too!
        
        #tDSF = 4th Date of Second File
        tDSF = secondList[3]
        # formatted tDSF
        numbertDSF = (tDSF[tDSF.find("(")+1:tDSF.rfind(")")].replace(", ", "").replace(" ", ""))

        if numberlDFF >= numbertDSF: # test passed
            step = 2
            # run this function again to handle the 2nd Step
            alignDatePoints(step,structurePoints,structure,run,fileList,blacklist)
        else: 
            # TEST FAILED
            # remove the file, it's datelist and lineslist and put the filename in the blacklist
            del chartDatesList[0]
            del chartLinesList[0]
            blacklist.append(fileList[0])
            del fileList[0]
            
            # run the function again to check the next set of files
            alignDatePoints(step,structurePoints,structure,run,fileList,blacklist)
    
    # the second step checks if the last file is to be included or no for average data, hence making correct range
    elif(step == 2):

        firstList = chartDatesList[0]
        lastList = chartDatesList[(len(chartDatesList))-1]
        #lDFF = Last Date of First File
        lDFF = firstList[(len(firstList))-1]
        # formatted lDFF
        numberlDFF = (lDFF[lDFF.find("(")+1:lDFF.rfind(")")].replace(", ", "").replace(" ", ""))

        # tDLF = 4th Date of Last File
        tDLF = lastList[3]
        # formatted tDLF
        numbertDLF = (tDLF[tDLF.find("(")+1:tDLF.rfind(")")].replace(", ", "").replace(" ", ""))

        # if the last date of the first file is greater or equal to the 4th date of the last file
        if numberlDFF >= numbertDLF: # TEST PASSED
            step = 3
            alignDatePoints(step,structurePoints,structure,run,fileList,blacklist)
        else: # TEST FAILED

            # remove the last date - the points - and put the file in the blacklist
            del chartDatesList[(len(chartDatesList))-1]
            del chartLinesList[(len(chartLinesList))-1]
            blacklist.append(fileList[(len(fileList))-1])
            del fileList[(len(fileList))-1]
            
            #run the function again to check the next set of files
            alignDatePoints(step,structurePoints,structure,run,fileList,blacklist)
    # make structured points and date
    elif (step == 3):
        #combineFiles(chartDatesList,chartLinesList,structure,structurePoints)
        combineFiles(structure,structurePoints)
        return






def mergeFiles(fileList,run,mergeList):
    # sort the list first
    # clear the contents of the lists
    del chartLinesList[:]
    del chartDatesList[:]

    # make chart list to append values in chartLinesList and chartDatesList for the listed/selected file group/list
    makeChartLists(run,fileList,"CPU_UTIL")


    structurePoints = list()
    structure = list()

    # coombine the data of the files to form a single chart
    combineFiles(structure,structurePoints)



    mergeDates = list()

    i = 0
    for index,dateRow in enumerate(structure):
        if(dateRow[i] == "x"):
            i = i + 1
            mergeDates.append([dateRow[i]])
        else:    
            mergeDates.append([dateRow[i]])




    for index,dateRow in enumerate(mergeDates):
        mergeList.append(dateRow+(structurePoints[index]))






def mergeSets(runMergeList):
    
    singleSet = list()

    # update the longest merge list
    longestList = runMergeList[0]
    for mergeSet in runMergeList:
        if(len(longestList) < len(mergeSet)):
            longestList = mergeSet


    # append the dates in the singleSet
    for date in longestList:
        temp = list()
        temp.append(date[0])
        singleSet.append(temp)
    

    # update the points now

    for runMerge in runMergeList:
        # prepare the zerolist to append the empty points
        zeroList = [0.0] * (len((runMerge[0])[1:]))
        for index,line in enumerate(singleSet):

                try:
                    points = (runMerge[index])[1:]
                    for n in points:
                        line.append(n)
                except IndexError:
                    for n in zeroList:
                        line.append(n)


    # return the singleSet for one type of server
    return singleSet



















# this function makes the chart list according to the given type of chart
def makeChartLists(run,fileList,chartType):


    if(chartType == "CPU_UTIL"): # handle the data when the chart type is cpu_util
        for filename in fileList:
            fullname = run+"/"+filename+"/"+chartType
            linesList = chartData[fullname]
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
                temp.append(round(100-float(lines[lines.rfind(char)+len(char):len(lines)-1]),1)) 
            chartLinesList.append(temp)
            
        # print("------------------------------------")
        
        # for lines in chartLinesList:
        #     print(lines)
        #     print()
        # print("------------------------------------")
        
        # for dates in chartDatesList:
        #     print(dates)
        #     print()

    else:
        print("wip")
        





def dumpJSON(jsonDict):
    #print(jsonDict)
    #print("dump the json object")
    #json.dumps(jsonDict)
    print(json.dumps(jsonDict))


def makeChartData():
    # object to be dumped
    jsonDict = OrderedDict()

    if(chartType == "A"): # type wise averages- one chart for each type/ average of all runs



        # fileDict is the object with the selected filenames
        for indexServer,server in enumerate(filesDict):
            # each server refer to the runs
            serverRuns = filesDict[server]


            # needed variables
            # contains the newChartData array
            averageList = list()
            # label is used for the new chart data array
            labelValue = [[{"type": 'datetime', "label": 'Datetime' }]]
            # contains list of files that cannot be processed
            blacklist = list()
       

            for indexRun,run in enumerate(serverRuns):                

                # clear the contents of the lists
                del chartLinesList[:]
                del chartDatesList[:]

                # list of the filenames
                fileList = sorted(serverRuns[run])

                
                # make chart lines
                makeChartLists(run,fileList,"CPU_UTIL")


                # variables for alignDataPoints
                step = 1
                structurePoints = list()
                structure = list()
                
                # align the date points
                alignDatePoints(step,structurePoints,structure,run,fileList,blacklist)

                # make averages
                makeAverage(structure,structurePoints,averageList)
                
                # append the legend name
                labelValue[0].append(run)
                

                if(indexRun == (len(serverRuns)-1)): # when the last file of the server is processed

                    # in the case of average files the list should be added to the a average variable first 
                    # and then when the list ends, the whole variable should be added to the json file here
                    # after that empty the variable.
                    
                    newChartData = labelValue + averageList

                    # prepare the json object

                    # make the chartSet
                    chartSet = OrderedDict()
                    chartSet["chart"] = newChartData
                    chartSet["blacklist"] = blacklist
                    
                    # update the jsonDict
                    
                    jsonDict[server] = chartSet
                    
            
            
            if(indexServer == (len(filesDict)-1)): # dump the json file when the list ends
                dumpJSON(jsonDict)
            
                    

    elif(chartType == "B"): # type-wise average for all types in a single chart

        # contains the average of the runs
        averageRunsList = list()
        # label is used for the new chart data array
        labelValue = [[{"type": 'datetime', "label": 'Datetime' }]]
        # contains list of files that cannot be processed
        blacklist = list()

        # fileDict is the object with the selected filenames
        for indexServer,server in enumerate(filesDict):
            # each server refer to the runs
            serverRuns = filesDict[server]


            # needed variables
            # contains the newChartData array
            averageList = list()
            
       

            for indexRun,run in enumerate(serverRuns):                

                # clear the contents of the lists
                del chartLinesList[:]
                del chartDatesList[:]

                # list of the filenames
                fileList = sorted(serverRuns[run])

                
                # make chart lines
                makeChartLists(run,fileList,"CPU_UTIL")


                # variables for alignDataPoints
                step = 1
                structurePoints = list()
                structure = list()
                
                # align the date points
                alignDatePoints(step,structurePoints,structure,run,fileList,blacklist)

                # make averages
                makeAverage(structure,structurePoints,averageList)

                
                # append the legend name
                # labelValue[0].append(run)
                

                if(indexRun == (len(serverRuns)-1)): # when the last file of the server is processed
                    # append the legend name
                    labelValue[0].append(server)

                    makeRunsAverage(averageRunsList,averageList) # or make average of all the runs of a type i.e to make a single average that represents a single type consisting of all the runs
                    
            if(indexServer == (len(filesDict)-1)): # dump the json file when the list ends
                
                newChartData = labelValue + averageRunsList

                jsonDict["All Types"] = newChartData

                dumpJSON(jsonDict)
                

    elif(chartType == "C"): # type-wise average for all types in a single chart
        



        # fileDict is the object with the selected filenames
        for indexServer,server in enumerate(filesDict):

            # merge list contains data for the particular type of server(selected)
            runMergeList = list()
            # label value
            labelValue = [[{"type": 'datetime', "label": 'Datetime' }]]
            # each server refer to the runs
            serverRuns = filesDict[server]

            for indexRun,run in enumerate(serverRuns):
                fileList = sorted(serverRuns[run])


                # contains the temp merge file list of particular type per run
                curMergeList = list()
                # mergeFiles makes the mergeList and also appends the labelValue
                mergeFiles(fileList,run,curMergeList)

                
                # update the labels
                # add the run name along the files to differentiate between the lists
                def addRunName(filename):
                    return run+"/"+filename

                filenamelist = list(map(addRunName,fileList))

                # update the filenamelist
                labelValue[0] = labelValue[0] + filenamelist

                
                
                
                # append the cur merge list to mergeList
                runMergeList.append(curMergeList)


                if(indexRun == (len(serverRuns)-1)): # when the last file of the server is processed

                    # update the set or merge the set
                    newChartlines = mergeSets(runMergeList)

                    # update the newChartData for the particular server type
                    newChartData = labelValue + newChartlines

                    dataDict = OrderedDict()
                    dataDict["chart"] = newChartData

                    jsonDict[server] = dataDict
                    

        if(indexServer == (len(filesDict)-1)):
            
            dumpJSON(jsonDict)


    elif(chartType == "D"): # all the servers in a single chart per run

        for indexRun,run in enumerate(filesDict):
            serverList = filesDict[run]
            
            # serverMergedList per run 
            serverMergedList = list()

            # label list for the selected run
            labelValue = [[{"type": 'datetime', "label": 'Datetime' }]]

            for indexServer,server in enumerate(serverList):
                
                fileList = sorted(serverList[server])
                
                
                curMergeList = list()
                # merging the files together 
                mergeFiles(fileList,run,curMergeList)


                # update the labelValue for legends
                labelValue[0] = labelValue[0] + fileList
                
                # update the serverMergedList
                serverMergedList.append(curMergeList)
                

                if(indexServer == (len(serverList)-1)):

                    newChartlines = mergeSets(serverMergedList)

                    # update the newChartData for the particular run

                    newChartData = labelValue + newChartlines

                    dataDict = OrderedDict()
                    dataDict["chart"] = newChartData

                    jsonDict[run] = dataDict
            

            if(indexRun == (len(filesDict)-1)):
                # dump the json object
                dumpJSON(jsonDict)




    else:
        print("wip")



makeChartData()