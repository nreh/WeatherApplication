import './weather_card.css';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

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
                <ReactTooltip />
                <div className='temp'>
                    <span data-tip='Temperature displayed in Fahrenheit' style={{marginTop: '-20px', marginLeft: '-70px'}} >°F</span>
                    <h1>{Number.parseInt(Number.parseFloat(props.json['main']['temp']))}</h1>
                    <h3 data-tip="Low/High">{Number.parseInt(Number.parseFloat(props.json['main']['temp_min']))}/{Number.parseInt(Number.parseFloat(props.json['main']['temp_max']))}</h3>
                </div>
                <div className='details'>
                    <div>
                        <h2 style={{display:'inline-block', marginRight: '10px'}}>{props.json['name']}</h2>
                        <span data-tip="Country code">{props.json['sys']['country']}</span>

                        {/* Counter */}
                        {props.json['COUNTER'] !== '' &&
                        
                            <span data-tip="How many times this city was searched" className='counter'>
                                {props.json['COUNTER']}
                            </span>
                            
                        }
                        
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