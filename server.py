"""
WeatherApplication Server power by OpenWeatherMap
Naqeeb Rehman - 11/19/2021
"""
import os # for environment variables
from flask import Flask
from flask import jsonify # for converting dict to json strings
from flask import request # for parsing GET requests
import requests

# try obtaining api key:
API_KEY = os.environ.get('OPENWEATHERMAP_APIKEY')


def get_weather_for(city):
    """
    Function for obtaining current temperature of city
    """

    # make request to openweathermap.org
    params = {
        'q': city,
        'appid': API_KEY
    }
    return requests.get('https://api.openweathermap.org/data/2.5/weather', params=params)


app = Flask(__name__)

# REST API:
@app.route('/api/weather/city', methods=['GET'])
def api_weather_city():
    """when user navigates to /api/weather/city handle HTTP GET requests containing city name"""

    if API_KEY is None: # no API_KEY specified
        return jsonify({'error': 'Server does not have an API key set up'}), 500

    data = request.args

    if 'city' not in data: # no city param in request
        return jsonify({'error': 'No city specified'}), 400
    else:
        if data['city'].strip() == '': # city param exists but is empty
            return jsonify({'error': 'No city specified'}), 400

        # forward response and status to client
        response = get_weather_for(data['city'])

        if response.status_code == 401:
            return jsonify({'error': 'Server has invalid API key set up'}), 500
        else:
            # forward response & status code to client
            return response.text, response.status_code

@app.route('/')
def index():
    """Main React landing page"""

    return 'Index.html'

@app.errorhandler(404)
# pylint: disable=invalid-name,unused-argument
def page_not_found(e):
    """Handle 404 errors"""

    return '<h1>404</h1> <p>Requested file or resource was not found :(</p>', 404

if __name__ == '__main__':
    app.run(debug=True)
