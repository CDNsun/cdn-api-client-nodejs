const Client = require('./cdn-api-client.js')

let username    = 'YOUR_API_USERNAME';
let password    = 'YOUR_API_PASSWORD';
let ID          = 'YOUR_CDN_SERVICE_ID';

let client = new Client({username: username, password: password});

client.get({
  url: 'cdns'
}).then((result) => {
  console.log(JSON.stringify(result, null, 4));
}).catch((err)=>{
  console.log(err);
});

client.get({
  url: 'cdns/'+ID+'/reports',
  data: {
    type: 'GB',
    period: '4h'
  }
}).then((result) => {
  console.log(JSON.stringify(result, null, 4));
}).catch((err)=>{
  console.log(err);
});

client.post({
  url: 'cdns/'+ID+'/purge',
  data: {
    purge_paths: [
      '/path1.img',
      '/path2.img'
    ]
  }
}).then((result) => {
  console.log(JSON.stringify(result, null, 4));
}).catch((err)=>{
  console.log(err);
});
