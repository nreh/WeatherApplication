"""
WeatherApplication Server power by OpenWeatherMap
Naqeeb Rehman - 11/19/2021
"""
import os # for environment variables
import json # for parsing json (not the same as flask.jsonify)
from flask import Flask
from flask import jsonify # for converting dict to json strings
from flask import request
from flask.helpers import make_response, send_from_directory # for parsing GET requests
import requests

# try obtaining api key:
API_KEY = os.environ.get('OPENWEATHERMAP_APIKEY')

def get_counter_for(city):
    """Retrieves from database, number of times given city was searched"""
    #todo: implement this
    return 10

def get_weather_for(city):
    """
    Function for obtaining current weather of city using OpenWeatherMap
    """

    # make request to openweathermap.org
    params = {
        'q': city,
        'units': 'imperial',
        'appid': API_KEY
    }

    return requests.get('https://api.openweathermap.org/data/2.5/weather', params=params)

app = Flask(__name__, static_folder='./weatherapplicationclient/build')

# handle requests for the weather of a city
@app.route('/api/weather/city', methods=['GET', 'OPTIONS'])
def api_weather_city():
    """When user navigates to /api/weather/city, handle HTTP GET requests containing city name"""

    # CORS (Allows instances of client from other servers to use this server)
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response


    if API_KEY is None: # no API_KEY specified
        response = jsonify({'error': 'Server does not have an API key set up'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500

    data = request.args

    if 'city' not in data: # no city param in request
        response = jsonify({'error': 'No city specified'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 400
    else:
        if data['city'].strip() == '': # city param exists but is empty
            response = jsonify({'error': 'No city specified'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response, 400

        #* Client sent a valid request,
        # forward response from OpenWeatherMap and status to client
        result = get_weather_for(data['city'])

        if result.status_code == 401:
            result = jsonify({'error': 'Server has invalid API key set up'})
            result.headers.add('Access-Control-Allow-Origin', '*')
            return result, 401
        elif result.status_code == 404:
            result = jsonify({'error': 'City not found'})
            result.headers.add('Access-Control-Allow-Origin', '*')
            return result, 404
        else:
            # forward response, counter & status code to client

            # we want to add counter to JSON code but response from
            # OpenWeatherMap is in string format. Parse json string:
            parsed = json.loads(result.text)
            parsed['COUNTER'] = get_counter_for(data['city']) # add counter to json

            response = make_response()
            response.data = json.dumps(parsed)
            response.headers.add('Access-Control-Allow-Origin', '*') # CORS support

            return response, result.status_code

# for serving index.html
@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>/')
def index(path):
    """Main React landing page"""
    print("trying to get " + path)
    return send_from_directory('./weatherapplicationclient/build', path)

@app.errorhandler(404)
# pylint: disable=invalid-name,unused-argument
def page_not_found(e):
    """Handle 404 errors"""
    return '<h1>404</h1> <p>Requested file or resource was not found :(</p>', 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
