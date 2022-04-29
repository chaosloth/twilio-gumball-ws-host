# Gumball Machine

This is a nodejs server app and React typescript application that creates a gumball machine. There is a companion application for ESP32 and ESP8266 microcontrollers that connects to the we application server via Web Sockets to receive dispense commands.

To get started configure your .env file using the .env.example file as the reference

```
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

SEGMENT_WRITEKEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SEGMENT_API_BASE_URL=https://api.segment.io/v1

BOOTH_ID=6
DISPENSE_DURATION=4000
```

Note that the dispense duration is in milliseconds.

## Deploying

### To Heroku

To deploy the application to Heroku, first have the project linked as a report repo, then run
`$ git push heroku main`

This will cause Heroku to run the build commands in the `package.json` and deploy to a live environment

## Example incoming messages

The app server can be triggered by one of the following inbound requests

### Manual trigger - LOCAL SERVER

Manual kick off of the Candy machine used in testing
curl -X 'POST' 'http://localhost:5001/start' -H 'content-type: application/json' -d $'{"name":"Test User","phone":"+61467XXXXXX","email":"your_email@example.com"}'

### Manual trigger - PRODUCTION

Manual kick off of the Candy machine used in testing
curl -X 'POST' 'https://<app domain>.herokuapp.com/start' -H 'content-type: application/json' -d $'{"name":"Test User","phone":"+61467XXXXXX","email":"your_email@example.com"}'

### Example event - Identify

Example message from Segement towards application server - identifying the user. The app server will store this in a dictionary for later lookup

```
curl -X 'POST' 'https://webhook.site/6715dcc5-6ede-4e99-9630-2a4e925dc492?' -H 'connection: close' -H 'content-length: 458' -H 'content-type: application/json' -H 'user-agent: Segment.io/1.0' -H 'accept-encoding: identity' -H 'host: webhook.site' -d $'{"channel":"server","context":{"library":{"name":"unknown","version":"unknown"}},"integrations":{},"messageId":"api-282oOwIb71IfbpvPmDb9cb1Trq9","projectId":"r3QPgvJBMpsc1XLzT17X8P","receivedAt":"2022-04-20T03:06:51.900Z","timestamp":"2022-04-20T03:06:51.900Z","traits":{"company":"Twilio","email":"test1@examlpe.com","name":"Test1 User","phone":"+61467XXXXXX","timeStamp":"2022-04-20T03:06:50.875Z","title":"SE"},"type":"identify","userId":"1","version":2}'
```

### Example event - Track

Example message from Segement towards application server for the Track event

```
curl -X 'POST' 'https://webhook.site/6715dcc5-6ede-4e99-9630-2a4e925dc492?' -H 'connection: close' -H 'content-length: 408' -H 'content-type: application/json' -H 'user-agent: Segment.io/1.0' -H 'accept-encoding: identity' -H 'host: webhook.site' -d $'{"channel":"server","context":{"library":{"name":"unknown","version":"unknown"}},"event":"checked-in","integrations":{},"messageId":"api-282oOu5HTp71trBMfpF4Y59Kkfk","projectId":"r3QPgvJBMpsc1XLzT17X8P","properties":{"booth":{"id":2,"name":"Robot"}},"receivedAt":"2022-04-20T03:06:52.476Z","timeStamp":"2022-04-20T03:06:51.754Z","timestamp":"2022-04-20T03:06:52.476Z","type":"track","userId":"1","version":2}'
```
