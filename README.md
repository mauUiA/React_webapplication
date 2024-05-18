# Sensor Data Visualization Application

This repository contains a React application for visualizing sensor data. The app fetches temperature, humidity, and battery level data from a server and displays the latest measurement as well as historical data.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Components](#components)
   - [App.js](#appjs)
   - [LastMeasurement.js](#lastmeasurementjs)
   - [AllMeasurements.js](#allmeasurementsjs)
4. [Styling](#styling)
5. [Dependencies](#dependencies)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

This will launch the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

The application will automatically fetch sensor data from the server at regular intervals and display it in two main views:

1. **Last Measurement:** Shows the most recent sensor readings, along with a time-series chart.
2. **All Measurements:** Displays all the sensor data in a tabular format.

### Available Routes

- `/` - Displays the Last Measurement view.
- `/all-measurements` - Displays all historical sensor data.

## Components

### App.js

The main component that sets up routing and fetches sensor data at regular intervals.

#### Key Features:
- Fetches data from the server every 5 seconds.
- Uses `react-router-dom` for client-side routing.
- Passes fetched data to `LastMeasurement` and `AllMeasurements` components.

### LastMeasurement.js

Displays the latest sensor data along with a time-series chart of temperature and humidity.

#### Key Features:
- Uses `CanvasJS` to render the chart.
- Displays the most recent sensor reading.
- Provides a link to view all measurements.

### AllMeasurements.js

Displays all the sensor data in a table format.

#### Key Features:
- Iterates over the sensor data and displays each entry in a table row.
- Provides a link to return to the Last Measurement view.

## Styling

Custom CSS is used to style the components, ensuring a responsive and user-friendly interface.

### Key Styles:
- `.sensor-stats` - Styles for the latest sensor data display.
- `.graph-container` - Styles for the chart container.
- `.view-all-measurements-btn` and `.back-to-home-btn` - Styles for navigation buttons.

## Dependencies

- React: ^18.0.0
- Axios: ^1.2.0
- React Router DOM: ^6.4.0
- CanvasJS: ^1.0.0

Ensure you have these dependencies installed before running the application.
