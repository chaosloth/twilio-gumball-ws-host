## Deploying

### To Heroku

git push heroku main

## Example incoming messages

### Example event - Identify

curl -X 'POST' 'https://webhook.site/6715dcc5-6ede-4e99-9630-2a4e925dc492?' -H 'connection: close' -H 'content-length: 458' -H 'content-type: application/json' -H 'user-agent: Segment.io/1.0' -H 'accept-encoding: identity' -H 'host: webhook.site' -d $'{"channel":"server","context":{"library":{"name":"unknown","version":"unknown"}},"integrations":{},"messageId":"api-282oOwIb71IfbpvPmDb9cb1Trq9","projectId":"r3QPgvJBMpsc1XLzT17X8P","receivedAt":"2022-04-20T03:06:51.900Z","timestamp":"2022-04-20T03:06:51.900Z","traits":{"company":"Twilio","email":"test1@email.com.au","name":"Test1 User","phone":"+61467601932","timeStamp":"2022-04-20T03:06:50.875Z","title":"SE"},"type":"identify","userId":"1","version":2}'

### Example event - Track

curl -X 'POST' 'https://webhook.site/6715dcc5-6ede-4e99-9630-2a4e925dc492?' -H 'connection: close' -H 'content-length: 408' -H 'content-type: application/json' -H 'user-agent: Segment.io/1.0' -H 'accept-encoding: identity' -H 'host: webhook.site' -d $'{"channel":"server","context":{"library":{"name":"unknown","version":"unknown"}},"event":"checked-in","integrations":{},"messageId":"api-282oOu5HTp71trBMfpF4Y59Kkfk","projectId":"r3QPgvJBMpsc1XLzT17X8P","properties":{"booth":{"id":2,"name":"Robot"}},"receivedAt":"2022-04-20T03:06:52.476Z","timeStamp":"2022-04-20T03:06:51.754Z","timestamp":"2022-04-20T03:06:52.476Z","type":"track","userId":"1","version":2}'
