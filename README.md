# Poker
Poker web app made with Django, REST API and React.  

## About
This app is currently in development and cant be played yet.  
  
Api is made using Django with Django rest framework.  
Django channels for websocket handling.  
On frontend I used React, its functional components and React hooks.  

## How to run
App can be run in Docker or locally, but I suggest using Docker because running project locally might require changing a few settings for it to run. 

### Docker
**Requirements:**  
- Docker

**Run app in docker**
  
build, (re)create, start and attach containers
```
docker-compose --file docker-compose-dev.yaml up
```
start/stop containers
```
docker-compose --file docker-compose-dev.yaml start
docker-compose --file docker-compose-dev.yaml stop
```
live logging
```
docker-compose --file docker-compose-dev.yaml logs --tail=0 --follow
```

### Locally
**Requirements:**  
- python 3.6  
- pip3  
- nodejs  
- npm
  
**Python libraries**
```
pip install -r requirements.txt
```

**Frontend**
```
$ npm i
$ npm run dev
```
