import React from 'react';
import PropTypes from 'prop-types';
import './hourly_forecast.css';

function HourlyForecast(props) {
    // extract relevant information:
    var dt = props.json['dt'];
    var temp = props.json['temp'];

    // convert unix time to day and hour:
    var date = new Date(dt * 1000);

    var hour = date.getHours().toString();
    var day = date.getDate().toString();
    var month = date.getMonth();
    const M = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    return (
        <div className='HourlyForecast'>
            <span className='date'>{day + " " + M[month]}</span>
            <div className='hftemp'><h2>{Number.parseInt(Number.parseFloat(temp))} °F</h2></div>
            <span className='time'>{milto12hr(hour)}</span>
        </div>
    );

}

/** Converts 24hr time to 12hr time w/ PM or AM at end */
function milto12hr(hour) {

    hour = Number.parseInt(hour);

    if (hour === 0) {
        return '12 AM';
    }

    var suffix = ' AM';
    if (hour >= 12) {
        suffix = ' PM';
    }

    if (hour > 12) {
        return '' + (hour - 12) + suffix;
    } else {
        return '' + hour + suffix;
    }
}

HourlyForecast.propTypes = {
    /** Dictionary/JSON containing information for a specific date/time */
    json: PropTypes.any
}

export default HourlyForecast;