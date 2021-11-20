import './weather_card.css';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

function WeatherCard(props) {

    if (props.mode === 'loading') {
        return (
            <div className='WeatherCardLoading'>
                <img src='/loading-buffering.gif' alt='loading circle'/>
            </div>
        );
    } else if (props.mode === 'error') {
        return (
            <div className='WeatherCardError'>
                {props.errMsg}
            </div>
        );
    } else if (props.mode === 'result') {
        return (
            <div className='WeatherCard'>
                <div className='temp'>
                    <span style={{marginTop: '-20px', marginLeft: '-70px'}} >°F</span>
                    <h1>{Number.parseInt(Number.parseFloat(props.json['main']['temp']))}</h1>
                    <h3>{Number.parseInt(Number.parseFloat(props.json['main']['temp_min']))}/{Number.parseInt(Number.parseFloat(props.json['main']['temp_max']))}</h3>
                </div>
                <div className='details'>
                    <div>
                        <h2 style={{display:'inline-block', marginRight: '10px'}}>{props.json['name']}</h2>
                        <span>{props.json['sys']['country']}</span>

                        {/* Counter */}
                        <span className='counter'>0</span>
                    </div>
                </div>
            </div>
        );
    }
    
    
}


WeatherCard.propTypes = {
    mode: PropTypes.oneOf(['loading', 'error', 'result']),

    /** JSON object containing weather data */
    json: PropTypes.any,

    errMsg: PropTypes.string
};

WeatherCard.defaultProps = {
    mode: 'loading',
    cityName: 'undefined',
    
};

export default WeatherCard;