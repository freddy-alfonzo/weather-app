import React from "react";
import { useState } from "react";

export default function TodayForecast({
  today,
  location,
  tempType,
  getLocation,
  setLocation,
  setCoordinates,
}) {
  const [overlay, setOverlay] = useState(false);
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
        e.target.city.value
    )
      .then((response) => response.json())
      .then((data) => {
        data.results
          ? setResults(data.results)
          : setResults([
              { name: "City not found. Try again", admin1: "", country: "" },
            ]);
      });
  };
  const handleClick = async (city) => {
    setCoordinates({ lat: city.latitude, long: city.longitude });
    setLocation(city.name + ", " + city.country);
    setOverlay(false);
    document.body.style.overflow = "auto";
  };
  return (
    <section className="minor">
      <div className="minor-buttons sm:flex sm:justify-center">
        <button
          className="minor-button sm:w-[270px]  w-[100%] mr-3"
          onClick={() => {
            setOverlay(true);
            document.body.style.overflow = "hidden";
          }}
        >
          Search for places
        </button>
        <button className="minor-button exact" onClick={() => getLocation()}>
          <span className="material-icons flex align-middle justify-center">
            my_location
          </span>
        </button>
      </div>
      <div className="weather-icon">
        <img
          className="m-auto"
          src={
            today.condition
              ? require("../images/" + today.condition + ".png")
              : require("../images/Shower.png")
          }
          alt=""
        />
      </div>
      {tempType === "C" ? (
        <h1 className="low">
          <span className="temperature">{parseInt(today.temperature)}</span>
          &deg;C
        </h1>
      ) : (
        <h1 className="low">
          <span className="temperature">
            {parseInt(today.temperature * 1.8) + 32}
          </span>
          &deg;F
        </h1>
      )}
      <h2 className="low">{today.condition}</h2>
      <div>
        <p className="low mt-2">Today &bull; {today.date}</p>
        <p className="low flex align-middle justify-center mb-4 mt-2">
          <span className="material-icons flex align-middle justify-center">
            location_on
          </span>
          {location}
        </p>
      </div>
      <div className={overlay ? "overlay active" : "overlay"}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "1em",
          }}
        >
          <span
            className="material-icons "
            onClick={() => {
              setOverlay(false);
              document.body.style.overflow = "auto";
            }}
          >
            close
          </span>
        </div>
        <form
          className="search-location flex justify-center align-middle"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <input
              type="text"
              placeholder="Search location"
              name="city"
            ></input>
          </div>
          <button type="submit">Search</button>
        </form>
        <div>
          {results.map((city, key) => {
            return (
              <button
                key={key}
                className="city-button"
                onClick={() => handleClick(city)}
              >
                {city.name}, {city.admin1}, {city.country}.
                <span className="material-icons">navigate_next</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
