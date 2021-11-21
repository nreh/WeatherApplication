# WeatherApplication
Weather application powered by [OpenWeatherMap](https://openweathermap.org/)

> Demo hosted on http://weather-application-naqreh.herokuapp.com/

*Note http instead of https*

## API Setup
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
 - `python server.py`
