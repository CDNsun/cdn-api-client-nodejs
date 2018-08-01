# Client for CDNsun CDN API

SYSTEM REQUIREMENTS

* Node >= 6.0

CDN API DOCUMENTATION

https://cdnsun.com/knowledgebase/api

CLIENT USAGE

* Initialize the client
```
const Client = require('./cdn-api-client.js')

let client = new Client({
    username: 'YOUR_API_USERNAME', 
    password: 'YOUR_API_PASSWORD'
});

```

* Get CDN service reports (https://cdnsun.com/knowledgebase/api/documentation/res/cdn/act/reports)
```
client.get({
  url: 'cdns/ID/reports',
  data: {
    type: 'GB',
    period: '4h'
  }
}).then((result) => {
  console.log(result);
}).catch((err)=>{
  console.log(err);
});

```
* Purge CDN service content (https://cdnsun.com/knowledgebase/api/documentation/res/cdn/act/purge)

```
client.post({
  url: 'cdns/ID/purge',
  data: {
    purge_paths: [
      '/path1.img',
      '/path2.img'
    ]
  }
}).then((result) => {
  console.log(result);
}).catch((err)=>{
  console.log(err);
});

```

NOTES

* The ID stands for a CDN service ID, it is an integer number, eg. 123, to find your CDN service ID please visit the Services/How-To (https://cdnsun.com/cdn/how-to) page in the CDNsun CDN dashboard.

CONTACT

* W: https://cdnsun.com
* E: info@cdnsun.com  