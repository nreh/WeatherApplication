import './App.css';
import { useEffect, useRef, useState } from 'react';
import WeatherCard from './weather_card';

const DEBUG_MODE = true;

function App() {
  // reference output text
  const cardListContainer = useRef(null);
  const [cards, setCards] = useState([]);
  const [searchDisabled, setSearchDisabled] = useState(false);
  
  const searchBox = useRef(null);
  
  // Refocus search box after result loads
  useEffect(()=>{
    if (!searchDisabled) {
      searchBox.current.focus();
    }
  },[searchDisabled]);

  return (
    <div className="App">
      <h1>
        Weather Application
          {DEBUG_MODE &&
            " DEBUG"
          }
      </h1>
      <input ref={searchBox} onKeyPress={(e)=>searchCity(e)} disabled={searchDisabled} />
      <p style={{marginTop: '2px', color: 'gray'}}>Enter a city and press ENTER</p>

      <button onClick={()=>{
          setCards([])
        }}>Clear</button>
      <br/><br/>
     
      {/* card list container */}
      <div className='CardListContainer' ref={cardListContainer}>
        
        
        {cards.map((v,i) => {
          if (v == null) {
            return <WeatherCard mode='loading' />
          } else if (v['CARD_TYPE'] === 'error') {
            return <WeatherCard mode='error' errMsg={v['error']} />
          } else {
            console.log(v);
            return (
              <WeatherCard mode='result'
                json={v}
                // cityName={v['name']}
                // temperature={Number.parseInt(Number.parseFloat(v['main']['temp']))}
                // low={Number.parseInt(Number.parseFloat(v['main']['temp_min']))}
                // high={Number.parseInt(Number.parseFloat(v['main']['temp_max']))}
              />
            );
          }
        })}
      </div>
    </div>
  );

  function searchCity(e) {
    if (e.key === 'Enter') {
      var city = e.target.value;
  
      // clear textbox
      e.target.value = '';

      // disable textbox until response received...
      setSearchDisabled(true);

      // create loading card
      createCard();
  
      // make a request to server:
      var req = new XMLHttpRequest();
      if (DEBUG_MODE) {
        // debugging so client is being hosted on nodejs rather than Flask
        req.open('GET', `http://localhost:5000/api/weather/city?city=${city}`, true);
        req.setRequestHeader('Access-Control-Allow-Origin', '*');
      } else {
        req.open('GET', `/api/weather/city?city=${city}`, true);
      }

      req.send({mode: 'cors'});

      // HANDLE RESPONSE
      req.addEventListener('loadend', (e) => {
        console.log(req.responseText);  
        if (req.responseText === '') return;
        
        var j = JSON.parse(req.responseText);
        if (req.status >= 300) {
          j['CARD_TYPE'] = 'error';
        }

        // update first card
        setCards([j,...cards]);

        setSearchDisabled(false);
      });

      // HANDLE CONNECTION ERROR
      req.addEventListener('error', (e)=>{
        var j = {};
        j['CARD_TYPE'] = 'error';
        j['error'] = 'Error communicating with server';

        // update first card
        setCards([j,...cards]);

        setSearchDisabled(false);
      });

      
    }
  }
  function createCard() {
    setCards([null,...cards]);
  }

}

export default App;
