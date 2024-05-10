import React, { useState } from "react";
import styles from "./page.module.css";

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (city: string) => void;
}

const CityModal: React.FC<CityModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(city);
    setCity("");
    onClose();
  };
  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div className={styles.weatherCondition}>
        <h2>Enter Your City</h2>
        <form
          className={styles.weatherLocation}
          onSubmit={handleSubmit}
        >
          <input
            className={styles.input_field}
            placeholder="Enter city name"
            type="text"
            id="cityName"
            name="cityName"
            onChange={(e) => setCity(e.target.value)}
          />
          <button className={styles.search_button} type="submit">
            Seach
          </button>
        </form>
      </div>
    </div>
  );
};

export default CityModal;
