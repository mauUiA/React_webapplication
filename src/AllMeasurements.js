/*Code is made by ChatGPT
 * and edited by Maurizio Barrella*/

import React from 'react';
// Importing React

import { Link } from 'react-router-dom';
// Importing Link component for navigation

const AllMeasurements = ({ sensorData }) => (
  // AllMeasurements component receiving sensorData as a prop
  <div>
    <h1>All Measurements</h1>
    <Link to="/" className="back-to-home-btn">Back to Home</Link>
    {/* Link to navigate back to the home page */}
    <table>
      {/* Table to display all measurements */}
      <thead>
        <tr>
          <th>ID</th>
          <th>Temp</th>
          <th>Hum</th>
          <th>Batt</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {/* Iterating over sensorData to display each measurement in a table row */}
        {sensorData.map((data, index) => {
          return (
            <tr key={index}>
              <td>{data.SensorID}</td>
              <td>{data.Temperature}</td>
              <td>{data.Humidity}</td>
              <td>{data.Battery_Level}</td>
              <td>
                {new Date(data.Timestamp).toLocaleString('default', {
                  year: 'numeric', month: '2-digit', day: '2-digit',
                  hour: '2-digit', minute: '2-digit'  // Custom format to exclude seconds
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default AllMeasurements;
// Exporting the AllMeasurements component as default export
