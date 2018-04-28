from django.shortcuts import render
from django.http import HttpResponse
import requests
import urllib.parse as urlparse
import json
from astropy import constants as const
from datetime import date

# Create your views here.
 
def index(response):
    return HttpResponse("Hii there")


    

def fun(self):
    obj = {}
    url= 'http://localhost:8000/'+self.get_full_path()
    par = urlparse.parse_qs(urlparse.urlparse(url).query)
    obj['p'] = par['p'][0]
    obj['q'] = par['q'][0]
    json_data = json.dumps(obj)
    return HttpResponse(json_data)

def dtime(self):
    dTime = {}
    url = 'http://localhost:8000/'+self.get_full_path()
    par = urlparse.parse_qs(urlparse.urlparse(url).query)
    day = int(par['day'][0])
    month = int(par['month'][0])
    year = int(par['year'][0])
    birthday = date(1993, 1,3)
    dTime['days']= date(year, month,day) - birthday

    json_data = json.dumps(dTime,default = str )
    json_data = json_data[:-16]+'"}'
    return HttpResponse (json_data)

def angle(self):
    dAngle = {}
    url = 'http://localhost:8000/'+self.get_full_path()
    par = urlparse.parse_qs(urlparse.urlparse(url).query)
    totalDays = int(par['totalDays'][0])
    yearOnThatPlanet = int(par['yearOnThatPlanet'])
    angle = totalDays*360/yearOnThatPlanet
    dAngle['angle']= angle
    json_data = json.dumps(dAngle)
    return HttpResponse(json_data)


def getRotationEarth(self):
    getDate = {}
    url = 'http://localhost:8000/'+self.get_full_path()
    par = urlparse.parse_qs(urlparse.urlparse(url).query)
    hr = int(par['hr'][0])
    initialHr = 12
    hrDiff = initialHr - hr
    rotationAngle = 180*hrDiff/6
    getDate['rotationalAngle']=rotationAngle
    json_data = json.dumps(getDate)
    return HttpResponse(json_data)