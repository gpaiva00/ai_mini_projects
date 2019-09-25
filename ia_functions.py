import requests
import numpy as np
import matplotlib.pyplot as plt
from IPython.display import Image
import json
import os
# %matplotlib inline

def colorizePicture(url):
  image_url = url
  api_key = '2a161432-9a75-4ac4-8246-5916788eef70'
  # files={'image': open(image_url, 'rb')}

  r = requests.post("https://api.deepai.org/api/colorizer", data={'image': image_url}, headers={'api-key': api_key})

  result = r.json()

  return json.dumps({'type': 'img', 'result': result['output_url']})

def detectObjects(url):
  image_url = url
  api_key = '2a161432-9a75-4ac4-8246-5916788eef70'

  r = requests.post("https://api.deepai.org/api/densecap", data={'image': image_url}, headers={'api-key': api_key})

  return json.dumps({'type': 'text', 'result': r.json()})

def faceDetection():
  os.system('python3 webcam_cv3.py haarcascade_frontalface_default.xml')
