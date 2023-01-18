# Currency Exchange Widget - Frontend

## Description

<p>
  This is the frontend component of a widget for displaying currency exchange rates and allowing users to exchange USD for Crypto. It is built with React and communicates with the back-end service built with NestJS via WebSockets.
</p>

## Getting Started
  <p>
    These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
  </p>

  ### Prerequisites
    
   - Node.js and npm
   - TypeScript
   - JavaScript
   - Reactjs
   - CSS / React-boostrap
   - Websocket.io
   - MongoDB
   - Docker

## Installation

  <p>NOTE: You need to make sure your backend server is running on port 3232 else, you'd get error: TypeError: Failed to fetch. That's because it failed to fetch from the base URL.
</p>

  1. Clone the repository to your local machine
      ```
      git clone https://github.com/blcdevs/Frontend-assement

      ```
  2. Install the project dependencies by running the following command in the project root folder:
      ```
        $ npm install
      ```    
  3. Change the base URL from /api/index to your base URL
        const BASE_URL = 'http://localhost:3232';

 6. Start the front-end service by running the following command in the project root folder:
        ```
        npm run dev
        ```
7. The frontend should now be running on http://localhost:3000

## Using the docker image for the backend server
  8. Build the project's Docker image by running the following command in the project root folder:
      ```
      docker build -t exchange-widget-prod
      ```
 9. Start the back-end service by running the following command in the project root folder:
      ```
        docker run -p 3232:3232 exchange-widget-prod
      ``` 
      ### Enter the link below for the api
      ```
      http://localhost:3232/exchanges
      ```
    <p>NOTE: you may get this error: TypeError: Cannot read properties of undefined (reading 'BTC'). That's because my api call to coinlayer.com has exceeded limit of 100 request. You can replace your api in the .env file</p>

  # Demo Link
  <a href="http://www.youtube.com/watch?feature=player_embedded&v=hNILMSGcNxs" target="_blank">
 <img src="http://img.youtube.com/vi/hNILMSGcNxs/mqdefault.jpg" alt="Watch the video" width="400" height="200" border="10" />
  </a>
    
# Built With
   - Node.js and npm
   - TypeScript
   - JavaScript
   - Reactjs
   - CSS / React-boostrap
   - Websocket.io
   - MongoDB
   - Docker

# License
  <p>
    This project is licensed under the MIT License - see the LICENSE.md file for details.
</p>
