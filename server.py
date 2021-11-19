from flask import Flask
from flask import jsonify # for converting dict to json strings
from flask import request # for parsing GET requests
import os # for environment variables

# try obtaining api key:
API_KEY = os.environ.get('OPENWEATHERMAP_APIKEY')

app = Flask(__name__)

# REST API SERVER:
# when user navigates to /api/weather/city handle HTTP GET requests containing city name
@app.route('/api/weather/city', methods=['GET'])
def api_weather_city():
    if API_KEY == None: # no API_KEY specified
        return jsonify({'error': 'Server does not have an API key set up'}), 500

    data = request.args
    
    if 'city' not in data: # no city param in request
        return jsonify({'error': 'No city specified'}), 400
    else:
        if data['city'].strip() == '': # city param exists but is empty
            return jsonify({'error': 'No city specified'}), 400

        return "Weather for " + data['city'] + "..."

@app.route('/')
def index():
    return 'Index.html'

@app.errorhandler(404)
def page_not_found(e):
    return '<h1>404</h1> <p>Requested file or resource was not found :(</p>', 404

if __name__ == '__main__':
    app.run(debug=True)
