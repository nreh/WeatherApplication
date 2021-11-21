import './App.css';
import { useEffect, useRef, useState } from 'react';
import WeatherCard from './weather_card';

// set this to true when debugging on nodejs server
const DEBUG_MODE = true;

function App() {
  // reference output text
  const cardListContainer = useRef(null);
  // list of cards
  const [cards, setCards] = useState([]);
  
  // When set to true, searchbox is disabled
  const [searchDisabled, setSearchDisabled] = useState(false);
  
  // reference to search textbox
  const searchBox = useRef(null);
  
  // Refocus search box after result loads and searchbox is re-enabled
  useEffect(()=>{
    if (!searchDisabled) {
      searchBox.current.focus();
    }
  },[searchDisabled]);
  

  return (
    <div className="App">
      {/* Title */}
      <h1>
        Weather Application
          {DEBUG_MODE &&
            " DEBUG"
          }
      </h1>

      {/* Search box */}
      <input ref={searchBox} onKeyPress={(e)=>searchCity(e)} disabled={searchDisabled} />
      <p style={{marginTop: '2px', color: 'gray'}}>Enter a city and press ENTER</p>
      <p>Hover over card elements for information on what they do</p>


      <button onClick={()=>{
          setCards([])
        }}>Clear</button>

      <br/><br/>
     
      {/* Card list container */}
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
              />
            );
          }
        })}
      </div>
    </div>
  );

  /** Run when user presses a key while typing in the searchbox */
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

        console.log(e);

        // update first card
        setCards([j,...cards]);

        setSearchDisabled(false);
      });

      
    }
  }

  /** create loading card while client waits for response from server */
  function createCard() {
    setCards([null,...cards]);
  }

}

export default App;
