# What is Roastie?

*Roastie* is a small browser based application to monitor data collecting while roasting coffee.

## Prerequisites

- Docker (https://www.docker.com/)
- NodeJS (https://nodejs.org/en/download/)

In order to run this application, a small service providing sensor data on mqtt topics (one topic per sensor) must be present.
In this repository the docker-compose file provides a mqtt broker and starts a container containing a python script, 
which collects sensor data on a modbus server and transfer this data to the mqtt topics.
Start infrastructure (mqtt broker and service providing sensor data)
### `docker compose up --build`

## Access the app
The application is deployed using *github-pages* and can be reached under:
https://timwue.github.io/roastie

## How to start locally?

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

After startup configure the url of the mqtt broker in the settings page.

## How to provide data, which can be used by this application?
In order to provide own data, a mqtt broker must be available. 
The url of the broker needs to be set in the app's settings. 
In addition, each sensor's data should be provided on a designated mqtt topic.
Each message should be a json Object containing the field *value* like
`{"value": 2}`. Each topic name needs to be set in the app's settings as well.