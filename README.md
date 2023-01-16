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
        npm start

        ```
7. The server should now be running on http://localhost:3232

# Clone the Backene
    [Backedn](https://github.com/blcdevs/api) 
  
  8. Build the project's Docker image by running the following command in the project root folder:
      ```
      docker build -t currency-exchange-widget
      ```
 9. Start the back-end service by running the following command in the project root folder:
      ```
        docker run -p 3232:3232 currency-exchange-widget
      ``` 

  # Demo Link
    [YouTube Link](youtube.com/blcd/exchange_task) 
    [Site Link](youtube.com/blcd/exchange_task) 
    
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