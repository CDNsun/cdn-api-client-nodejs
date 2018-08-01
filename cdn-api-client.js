const querystring = require('querystring');
const https = require('https');

module.exports = class CDNsunCdnApiClient {

  constructor(options = null) {
		if(!options) {
			throw new Error('options empty');
		}               
		if(!options.username) {
			throw new Error('options.username empty');
		}
		if(!options.password) {
			throw new Error('options.password empty');
		}  
			
		this.username = options.username;
		this.password = options.password;
  }

  get(options = null) {
		if(!options) {
			throw new Error('options empty');
		}               
		options.method = 'GET';
		return this.request(options);                
	}

	post(options = null) {
		if(!options) {
			throw new Error('options empty');
		}               
		options.method = 'POST';
		return this.request(options);                
	}

	put(options = null) {
		if(!options) {
			throw new Error('options empty');
		}               
		options.method = 'PUT';
		return this.request(options);                
	}

	purge(options = null) {
		if(!options) {
			throw new Error('options empty');
		}               
		options.method = 'DELETE';
		return this.request(options);                
	} 

	request(options = null) {
    if(!options) {
      throw new Error('options empty');
    }
    if(!options.url) {
      throw new Error('options.url empty');
    }
    if(!options.method) {
      throw new Error('options.method empty');
    }
    
    return new Promise((resolve, reject) => {

	    let params = {
	    	host: 'cdnsun.com',
	    	path: '/api/' + options.url,
	    	method: options.method.toUpperCase(),
	    	headers: {
		    	'Accept': 'application/json',
	        'Content-Type': 'application/json',
	      },
	      auth: this.username + ':' + this.password,
	      timeout: 60000
	    };

	    let data = null;

	    switch(params.method) {                        
	      case 'POST':
	      case 'PUT':
	     	case 'DELETE':
		      if(options.data)
		      {
		        data = JSON.stringify(options.data);
		        params.headers['Content-Length'] = Buffer.byteLength(data);
		      }
		      break;
	      case 'GET':
	      	if(options.data) {
	      		params.path = params.path + "?" + querystring.stringify(options.data);
	      	}
	        break;
	      default: 
	       	reject('Unsupported method: ' + options.method); 
	    }

	    let request = https.request(params, (res) => {
	    	let data = '';
	 
			  res.on('data', (chunk) => {
			    data += chunk;
			  });
			  
			  res.on('end', () => {
			  	resolve(JSON.parse(data));
	  		});
	  	});

	  	request.on('error', (err) => {
	      reject(err);
	    });

		  if (data) {
		  	request.write(data);
		  }
		  request.end();
		});
  }            
};