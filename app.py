from flask import Flask, render_template, request
import ia_functions

app = Flask(__name__)

# main route
@app.route('/')
def main():
  return render_template('index.html')

#setImage
@app.route('/setoption', methods=['GET'])
def set_option():
  url = request.args.get('url')
  option = request.args.get('option')
  if option == 'colorize':
    return ia_functions.colorizePicture(url)
  elif option == 'detect':
    return ia_functions.detectObjects(url)

@app.route('/live', methods=['GET'])
def enable_live():
  return ia_functions.faceDetection()
  

if __name__ == '__main__':
  app.run()