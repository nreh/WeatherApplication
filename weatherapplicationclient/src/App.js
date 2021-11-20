import './App.css';
import { useRef } from 'react';


function App() {
  // reference output text
  const outputText = useRef(null);

  return (
    <div className="App">
      <h1>
        Weather Application
      </h1>
      <input onKeyPress={(e)=>searchCity(e)} />
      <p style={{marginTop: '2px', color: 'gray'}}>Enter a city and press ENTER</p>
      <span ref={outputText}/>
    </div>
  );

  function searchCity(e) {
    if (e.key === 'Enter') {
      let city = e.target.value;
  
      // clear textbox
      e.target.value = '';
  
      // make a request to server:
      var req = new XMLHttpRequest();
      req.open('GET', `/api/weather/city?city=${city}`, false);
      req.send(null);
      console.log(req.responseText);
  
      outputText.current.innerText = req.responseText;
    }
  }
}

export default App;
