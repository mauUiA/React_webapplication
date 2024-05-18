/*Code is made by ChatGPT
 * and edited by Maurizio Barrella*/

import React, { useEffect, useState } from 'react';
// Importing necessary hooks and modules from React

import axios from 'axios';
// Importing axios for making HTTP requests

import './App.css';
// Importing CSS for styling the app

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Importing components from react-router-dom for routing

import LastMeasurement from './LastMeasurement';
// Importing LastMeasurement component

import AllMeasurements from './AllMeasurements';
// Importing AllMeasurements component

function App() {
  // Main App component

  const [sensorData, setSensorData] = useState([]);
  // Declaring state variable sensorData to store sensor readings

  const fetchSensorData = async () => {
    // Function to fetch sensor data from the server

    try {
      const response = await axios.get('http://10.225.148.229:3000/getData');
      // Making a GET request to fetch data

      console.log("Fetched data:", response.data);
      // Logging the received data for debugging

      setSensorData(response.data.map(item => ({
        // Updating the sensorData state with the transformed data

        ...item,
        // Spreading existing item properties

        x: new Date(item.Timestamp),
        // Converting Timestamp to Date object

        y: parseFloat(item.Temperature),
        // Parsing Temperature to float

        y2: parseFloat(item.Humidity)
        // Parsing Humidity to float
      })));
    } catch (error) {
      // Handling errors during the fetch

      console.error('There was an error fetching the data:', error);
      // Logging the error
    }
  };

  useEffect(() => {
    // useEffect to run side effects

    fetchSensorData();
    // Initial fetch of sensor data

    const intervalId = setInterval(fetchSensorData, 5000);
    // Setting up an interval to fetch data every 5 seconds

    return () => clearInterval(intervalId);
    // Cleanup function to clear the interval on component unmount
  }, []);
  // Empty dependency array to run effect only once on mount

  return (
    <Router>
      // Router component to enable routing

      <div className="App">
        // Main div container with class App

        <header className="App-header">
          // Header section with class App-header

          <Routes>
            // Routes component to define routes

            <Route path="/" element={<LastMeasurement sensorData={sensorData} />} />
            // Route for the home path, rendering LastMeasurement component

            <Route path="/all-measurements" element={<AllMeasurements sensorData={sensorData} />} />
            // Route for the /all-measurements path, rendering AllMeasurements component
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
// Exporting the App component as default export










