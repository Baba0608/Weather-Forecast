require("dotenv").config();
import ReactDOM from "react-dom/client";
import { WeatherContainer } from "./components/WeatherContainer";

const App = () => {
  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-gray-300">
      <WeatherContainer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
