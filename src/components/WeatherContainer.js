import axios from "axios";
import { useState } from "react";

import { TiWeatherPartlySunny } from "react-icons/ti";
import PuffLoader from "react-spinners/PuffLoader";

const TOMORROW_IO_URL = process.env.REACT_APP_TOMORROW_IO_URL;
const APIKEY = process.env.REACT_APP_TOMORROW_IO_APIKEY;

export const WeatherContainer = () => {
  const [temperature, setTemperature] = useState(32);
  const [location, setLocation] = useState("Ananthapur");
  const [inputLocation, setInputLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const gotLocation = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const location = `${lat},${lon}`;
    const {
      data: {
        values: { temperature: temp },
      },
    } = await getTemperature(location);

    setTemperature(temp);
    setLocation("My Location");
  };

  const failedToGet = () => {
    console.log("There was an issue in fetching location.");
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
  };

  const getTemperature = async (location) => {
    try {
      setLoading(true);
      const { data } = await axios.get(TOMORROW_IO_URL + location + APIKEY);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="bg-blue-700 p-4 sm:w-[600px] rounded-xl">
      <div className="flex justify-between mt-4">
        <input
          type="text"
          placeholder="search..."
          className="sm:w-[70%] px-4 py-2 rounded-3xl"
          value={inputLocation}
          onChange={(e) => {
            setInputLocation(e.target.value);
          }}
        />
        <button
          className="bg-blue-400 px-4 py-1 rounded-xl"
          onClick={async () => {
            const {
              data: { values },
            } = await getTemperature(inputLocation);
            setTemperature(values.temperature);
            setLocation(inputLocation);
            setInputLocation("");
          }}
        >
          Get Temperature
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-400 px-4 py-2 rounded-xl"
          onClick={getLocation}
        >
          Current Location
        </button>
      </div>

      <div className="flex justify-center mt-4">
        {loading ? (
          <PuffLoader size={150} color="white" />
        ) : (
          <TiWeatherPartlySunny size={"150px"} color="white" />
        )}
      </div>

      <div className="text-center text-[80px] text-white">{temperature}°C</div>
      <div className="text-center text-xl text-white">{location}</div>
    </div>
  );
};
