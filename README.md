# Poker
Poker web app made with Django, REST API and React.  

## How to run
App can be run in Docker or locally. 

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
