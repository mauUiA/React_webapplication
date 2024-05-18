/*Code is made by ChatGPT
 * and edited by Maurizio Barrella*/

import React, { useEffect, useRef } from 'react';
// Importing necessary hooks from React

import { Link } from 'react-router-dom';
// Importing Link component for navigation

const LastMeasurement = ({ sensorData }) => {
  // LastMeasurement component receiving sensorData as a prop

  const chartContainerRef = useRef(null);
  // Creating a ref to attach to the chart container

  useEffect(() => {
    // useEffect to run side effects

    // Map sensor data to format suitable for the chart
    const tempDataPoints = sensorData.map(data => ({
      x: new Date(data.Timestamp), // Use the Timestamp from the server
      y: parseFloat(data.Temperature) // Parsing Temperature to float
    }));

    console.log("Temperature Data Points:", tempDataPoints);
    // Logging temperature data points for debugging

    const humidityDataPoints = sensorData.map(data => ({
      x: new Date(data.Timestamp), // Use the Timestamp from the server
      y: parseFloat(data.Humidity) // Parsing Humidity to float
    }));

    console.log("Humidity Data Points:", humidityDataPoints);
    // Logging humidity data points for debugging

    // Initialize the chart with the logged data
    var chart = new window.CanvasJS.Chart(chartContainerRef.current, {
      title: {
        text: "Sensor Data Over Time"
        // Chart title
      },
      axisX: {
        title: "Time of Day",
        valueFormatString: "HH:mm", // Format for the X-axis labels
        labelAngle: -45 // Angle for X-axis labels
      },
      axisY: {
        title: "Temperature (°C)",
        titleFontColor: "#C24642", // Red color for temperature axis
        minimum: 10, // Minimum value for Y-axis
        maximum: 40 // Maximum value for Y-axis
      },
      axisY2: {
        title: "Humidity (%)",
        titleFontColor: "#369EAD", // Blue color for humidity axis
        minimum: 10, // Minimum value for secondary Y-axis
        maximum: 90 // Maximum value for secondary Y-axis
      },
      toolTip: {
        shared: true, // Shared tooltip for both data series
        contentFormatter: function (e) {
          var content = "Time of Measurement: " + CanvasJS.formatDate(e.entries[0].dataPoint.x, "DD MMM YYYY HH:mm");
          // Formatting tooltip content with date

          for (var i = 0; i < e.entries.length; i++) {
            content += "<br/>" + e.entries[i].dataSeries.name + ": " + e.entries[i].dataPoint.y + 
                       (e.entries[i].dataSeries.name === "Temperature" ? "°C" : "%");
            // Adding temperature or humidity values to the tooltip content
          }
          return content;
        }
      },
      data: [{
        type: "line",
        color: "#C24642", // Red for temperature line and tooltip
        name: "Temperature",
        showInLegend: true, // Show temperature in legend
        axisYType: "primary", // Associate with primary Y-axis
        yValueFormatString: "#0.##°C", // Format for temperature values
        dataPoints: tempDataPoints // Data points for temperature
      }, {
        type: "line",
        color: "#369EAD", // Blue for humidity line and tooltip
        name: "Humidity",
        showInLegend: true, // Show humidity in legend
        axisYType: "secondary", // Associate with secondary Y-axis
        yValueFormatString: "#0.##'%'", // Format for humidity values
        dataPoints: humidityDataPoints // Data points for humidity
      }]
    });
    chart.render();
    // Rendering the chart

    // Cleanup function to destroy chart to prevent memory leaks
    return () => {
      if (chart) {
        chart.destroy();
        console.log("Chart destroyed on cleanup.");
        // Logging chart destruction
      }
    };
  }, [sensorData]); // Dependency array to ensure effect reruns on data update

  const lastData = sensorData.length > 0 ? sensorData[0] : null;
  // Get the latest data from sensorData

  return (
    <div>
      <h1>Last Measurement</h1>
      {sensorData.length > 0 && (
        <div className="sensor-stats">
          <p>Temperature: {lastData.Temperature}°C</p>
          <p>Humidity: {lastData.Humidity}%</p>
          <p>Battery: {lastData.Battery_Level}</p>
          <p>Time: {new Date(lastData.Timestamp).toLocaleString('default', {
              year: 'numeric', month: '2-digit', day: '2-digit',
              hour: '2-digit', minute: '2-digit'  // Format date without seconds
          })}</p>
        </div>
      )}
      <div className="graph-container">
        <div ref={chartContainerRef} style={{ height: 370, width: '100%' }} />
        {/* Container for the chart with dynamic reference */}
      </div>
      <Link to="/all-measurements" className="view-all-measurements-btn">View All Measurements</Link>
      {/* Link to navigate to all measurements page */}
      <style>
        {`
          .sensor-stats {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap; // Allows the stats to wrap on smaller screens
          }
          .sensor-stats p {
            margin: 10px; // Adds some spacing and allows wrapping
          }
          .graph-container {
            width: 100%; // Makes the graph container responsive
            max-width: 1146px; // Limits the maximum width
            min-width: 300px; // Ensures a minimum width
            height: 370px; // Fixed height
            margin: auto; // Centers the container
          }
        `}
      </style>
    </div>
  );
};

export default LastMeasurement;
// Exporting the LastMeasurement component as default export



