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
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-black">Enter Your City</h2>
    <form onSubmit={handleSubmit}>
      <div className="flex items-center">
        <input
          className="border border-gray-300 rounded-l-md p-2 flex-grow"
          placeholder="Enter city name"
          type="text"
          id="cityName"
          name="cityName"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default CityModal;
