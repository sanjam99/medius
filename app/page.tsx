"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import CityModal from "./CityModal";


function getCurrentDate() {
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" }); // Specify format directly as a string
  const date = new Date().getDate() + ", " + monthName;
  return date;
}


const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const date = getCurrentDate();
  const [weatherData, setWeatherData] = useState<{ weather: { description: string }[], main: { temp: number }, name: String  } | null>(null);

  const [city, setCity] = useState("delhi");

  async function fetchData(cityName: string) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName
      );
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchDataByCoordinates(latitude: number, longitude: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`
      );
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchDataByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  return (
    <main className={styles.main}>
      <article className={styles.widget}>
      <button
  className="bg-gradient-to-r from-blue-400 to-blue-700 hover:from-green-500 hover:to-green-800 text-white font-bold py-2 px-4 rounded"
  onClick={() => setShowModal(true)}
>
  Change City
</button>

<CityModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSubmit={(cityName) => {
    fetchData(cityName);
    setShowModal(false);
  }}
/>
        {weatherData ? (
          <>
            <div className={styles.icon_and_weatherInfo}>
              <div className={styles.weatherIcon}>
                {weatherData?.weather[0]?.description === "rain" ||
                weatherData?.weather[0]?.description === "fog" ? (
                  <i
                    className={`wi wi-day-${weatherData?.weather[0]?.description}`}
                  ></i>
                ) : (
                  <i className="wi wi-day-cloudy"></i>
                )}
              </div>
              <div className={styles.weatherInfo}>
                <div className={styles.temperature}>
                  <span>
                    {(weatherData?.main?.temp - 273.5).toFixed(2) +
                      String.fromCharCode(176)}
                  </span>
                </div>
                <div className={styles.weatherCondition}>
                  {weatherData?.weather[0]?.description?.toUpperCase()}
                </div>
              </div>
            </div>
            <div className={styles.place}>{weatherData?.name}</div>
            <div className={styles.date}>{date}</div>
          </>
        ) : (
          <div className={styles.place}>Loading...</div>
        )}
      </article>
    </main>
  );
};

export default Home;