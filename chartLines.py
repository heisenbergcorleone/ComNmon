#!/usr/bin/python3
# -*- coding: UTF-8 -*-# enable debugging
print("Content-Type: text/html;charset=utf-8")
print()
from collections import OrderedDict
import cgi,cgitb,json
cgitb.enable()
form = cgi.FieldStorage() #stores the get or post request values

# fileDict = json.loads(form['fileListObj'].value, object_pairs_hook=OrderedDict) # fetch the file object/dict and fix the positions