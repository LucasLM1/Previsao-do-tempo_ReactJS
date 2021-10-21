import React, { useState } from "react";
import './App.css';


function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleSearch = () => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}current.json?key=${process.env.REACT_APP_KEY}&q=${city}&lang=pt`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherForecast(data);
      });
  };

  return (
    <div className="body">
      <div>
        <nav className="navbar navbar-expand-md navbar-dark mb-4 justify-content-center bcdNav">
          <a className="navbar-brand text-align-center txtPrev" href="#search">
            Previsão do tempo
          </a>
        </nav>
      </div>

      <main className="container" id="search">
        <div className="jumbotron">
          <h1>Verique agora a previsão do tempo!</h1>
          <p className="lead">
            Digite uma cidade, estado ou país. <br></br> Após isto clique em pesquisar para visualizar os resultados
          </p>
          <div className="row mb-4 justify-content-center">
            <div class="col-md-6">
              <input type="text" class="form-control" value={city} onChange={(e) => setCity(e.target.value)}/>
            </div>
          </div>
          <button className="btn btn-lg btnBcd" onClick={handleSearch}>
            Pesquisar
          </button>

          {weatherForecast ? (
            <>
              <div className="mt-4 d-flex align-items-center">
                <div className="col-sm-1"> {/* Foto do céu */}
                  <img
                    src={`${weatherForecast.current.condition.icon}`}
                    alt="Weather Icon"
                  />
                </div>
                <div className="mr-2">
                <h3>
                  {weatherForecast.location.name}{/* Cidade */}
                </h3>
                </div>
                <div className="mr-2">
                  <h5>|</h5>
                </div>
                <div>
                  <h3>
                    {weatherForecast.current.condition.text} {/* Condição climática */}
                  </h3>
                </div>
                <div className="d-flex row mt-3 ml-3">
                <h5 className="mr-2">|</h5>
                <p className="mr-2">
                    Temperatura em Celcius: {weatherForecast.current.temp_c}ºC
                </p>
                <h5 className="mr-2">|</h5>
                <p>
                  Temperatura em Farenheit: {weatherForecast.current.temp_f}ºF
                </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </main>
      <footer>
        <p className="d-flex justify-content-center txtFooter">
          Desenvolvido por: Lucas Souza
        </p>
      </footer>
    </div>
  );
}

export default App;
