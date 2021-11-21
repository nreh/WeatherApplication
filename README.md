# WeatherApplication
Weather application powered by [OpenWeatherMap](https://openweathermap.org/)

> Demo hosted on http://weather-application-naqreh.herokuapp.com/

*Note http instead of https*

## OpenWeatherMap API Key
In order to use OpenWeatherMap services you must sign up and create an API key,

> https://home.openweathermap.org/users/sign_up

That API key is specified in the environment variable: `OPENWEATHERMAP_APIKEY`

## Database
This application stores how many times cities were searched. For this feature, a database URL must be specified in the `DATABASE_URL` environment variable.

## Dependencies

 - NodeJS
 - Python 3

## Setup
The client and server are both hosted on Flask. Here are the following commands to run:
(in root folder)

 - `npm install`
 - `npm run-script build`
 - `pip install -r requirements.txt`
 - `python server.py`

## Docker
Alternatively, you can pull & run a docker image:
```
docker run \
  -e OPENWEATHERMAP_APIKEY=YOUR_API_KEY \
  -e DATABASE_URL=YOUR_DATABASE_URL \
  -p YOUR_PORT:5000 \
  nreh/weatherapplication
```

## Files/Folders
 - `./server.py`: Flask server that serves the webpage and handles weather api requests
 - `./weatherapplicationclient/`: Directory containing react source code and node_modules
 - `./weatherapplicationclient/src/App.js`: Contains code for main page and logic
 - `./weatherapplicationclient/src/weather_card.js`: Contains code for rending cards containing temperature/forecast
 - `./weatherapplicationclient/src/hourly_forecast.js`: Contains code for rendering forecast for a specific date/hour
