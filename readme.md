## CelestialSatLocation || SatelliteLocationTracker || TLELocationTracker-Backend

## Description
This project is a backend application designed to retrieve Two-Line Element (TLE) data from CelesTrak, a source of satellite tracking information. It utilizes the tle3.js library to process TLE data and extract longitude and latitude information. The processed data is then formatted into JSON and served via an API implemented using Express.js. Additionally, MongoDB is used to store satellite locations, and CelesTrak data is fetched and updated every two hours.

## Features
- Retrieves TLE data from CelesTrak.
- Processes TLE data to extract longitude and latitude information.
- Formats processed data into JSON.
- Implements an API using Express.js to serve the JSON data.
- Integrates MongoDB to store satellite locations.
- Updates CelesTrak data every two hours.

## Installation
To install and run this project locally, follow these steps:

1. Clone this repository.
2. Install dependencies by running `npm install`.
3. Start the server by running `npm start`.
4. Access the API endpoints to retrieve satellite location data.

## Usage
This project provides a simple and straightforward way to access satellite location data through a RESTful API. Simply make requests to the appropriate endpoints to retrieve the desired data.

## License
This project is licensed under the [MIT License](LICENSE).
