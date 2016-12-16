var util = require('util');
var https = require('https');

// api-version query parameter - https://docs.microsoft.com/en-us/rest/api/apimanagement/apimanagementservices
var apiVersion = '2016-10-10';

// service name and base url - https://aka.ms/smapi#BaseURL
var serviceName = "adojetestapim";
var baseUrl = util.format("%s.management.azure-api.net", serviceName);

var SharedAccessSignature = "<SharedAccessSignature>"

//This function allows you to get a list of operationCollections. You can get a list of 'Apis', 'Products', Groups etc 
//See the list of OperationCollections here -> https://docs.microsoft.com/en-us/rest/api/apimanagement/
//Usage: get('apis'); 
function get(operationCollection) {
    var options = {
        host: baseUrl,
        path: '/' + operationCollection + '?api-version=' + apiVersion,
        method: 'GET',
        headers: {
            "Authorization": "SharedAccessSignature  " + SharedAccessSignature
        }
    }
    
    //making the https get call
    var getReq = https.request(options, function (res) {
        console.log("\nstatus code: ", res.statusCode);
        res.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    });

    //end the request
    getReq.end();
    getReq.on('error', function (err) {
        console.log("Error: ", err);
    });
}

//This function allows you to create an API. This function will create an API given the operation, id, name, description and serviceUrl
//Documentation can be found here -> https://docs.microsoft.com/en-us/rest/api/apimanagement/apis
//Usage: createAPI("apis", "calcapi_id", "TheBestCalculator", "This api calculates", "http://calcapi.cloudapp.net/api");
function createAPI(operationCollection, id, name, desciption,serviceUrl) {
    var options = {
        host: baseUrl,
        path: '/' + operationCollection + '/' + id + '?api-version=' + apiVersion,
        method: 'PUT',
        headers: {
            "Authorization": "SharedAccessSignature  " + SharedAccessSignature,
            "Content-Type": "application/json"
        }
    }
    var body = {
        "serviceUrl": serviceUrl,
        "path": id,
        "protocols": ["https"],
        "name": name,
        "description": desciption
    }
    
    //making the https put call
    var getReq = https.request(options, function (res) {
        console.log("\nstatus code: ", res.statusCode);
        res.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    });

    //write
    getReq.write(JSON.stringify(body));

    //end the request
    getReq.end();
    getReq.on('error', function (err) {
        console.log("Error: ", err);
    });
}

//This funtion allows you to attach a policy on an api.
//Decription link here -> https://docs.microsoft.com/en-us/rest/api/apimanagement/policysnippets
//Usage: attachPolicy("apis", "calcapi_id", "policy in xml")
function attachPolicy(operationCollection, api_id, policy) {
    var options = {
        host: baseUrl,
        path: '/' + operationCollection + '/' + api_id + '/' + 'policy' + '?api-version=' + apiVersion,
        method: 'PUT',
        headers: {
            "Authorization": "SharedAccessSignature  " + SharedAccessSignature,
            "Content-Type": "application/vnd.ms-azure-apim.policy+xml"
        }
    }

    //set the policy 
    //this policy allows you to change xml to json 
  

    //making the https put call
    var getReq = https.request(options, function (res) {
        console.log("\nstatus code: ", res.statusCode);
        res.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    });

    //write
    getReq.write(policy);

    //end the requestcreateOperation("apis", "calc_id", "Addition", "AdditionOperation", "adds two number toger", "add?a={a}&b={b}");
    getReq.end();
    getReq.on('error', function (err) {
        console.log("Error: ", err);
    });
}

//This function creates an operation for your api e.g a sum operation in the calc api 
//Usage: createOperation("apis", "calcapi_id", "Addition", "AdditionOperation", "adds two number toger", "add?a={a}&b={b}");
function createOperation(operationCollection, api_id, operationName, name, description, urlTemplate){
    var options = {
        host: baseUrl,
        path: '/' + operationCollection + '/' + api_id +'/' + 'operations' + '/' + operationName + '?api-version=' + apiVersion,
        method: 'PUT',
        headers: {

            "Authorization": "SharedAccessSignature  " + SharedAccessSignature,
            "Content-Type": "application/json"
        }
    }

    // body of the json 
    var body = {
        "name": name,
        "description": description,
        "method": "GET",
        "urlTemplate": urlTemplate,
        "templateParameters": [
            {
            "name": "a",
            "description": "First number to be added",
            "required": true,
            "type": "integer",
            "defaultValue": 51,
            "values": [49]
            },
            {
                "name": "b",
                "description": "Second number to be added",
                "required": true,
                "type": "integer",
                "defaultValue": 5,
                "values": [4]
            }
        ]
    };

    //making the https put call
    var getReq = https.request(options, function (res) {
        console.log("\nstatus code: ", res.statusCode);
        res.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    });

    //write
    getReq.write(JSON.stringify(body));

    //end the request
    getReq.end();
    getReq.on('error', function (err) {
        console.log("Error: ", err);
    });
} 

//This function creates a Product that you eventually add an api to 
//Usage: createProduct("products", "thebestproduct_id", "TheBestProduct");
function createProduct(operationCollection, product_id, name) {
    var options = {
        host: baseUrl,
        path: '/' + operationCollection + '/' + product_id + '?api-version=' + apiVersion,
        method: 'PUT',
        headers: {
            "Authorization": "SharedAccessSignature  " + SharedAccessSignature,
            "Content-Type": "application/json"
        }
    }
    var body = {
        "name": name,
        "terms": "Best product on earth", 
        "approvalRequired": false,
        "description": "This is a special Product"
    }

    //making the https put call
    var getReq = https.request(options, function (res) {
        console.log("\nstatus code: ", res.statusCode);
        res.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    });

    //write
    getReq.write(JSON.stringify(body));

    //end the request
    getReq.end();
    getReq.on('error', function (err) {
        console.log("Error: ", err);
    });
}


//This function adds an api to a product
//Usage: addApitoProduct("calcapi_id", "thebestproduct_id");
function addApitoProduct(api_id,product_id) {
    var options = {
        host: baseUrl,
        path: '/' + 'products' + '/' + product_id + '/' + 'apis' + '/'  + api_id + '?api-version=' + apiVersion,
        method: 'PUT',
        headers: {
            "Authorization": "SharedAccessSignature  " + SharedAccessSignature,
            "Content-Type": "application/json"
        }
    }

    //making the https put call
    var getReq = https.request(options, function (res) {
        console.log("\nstatus code: ", res.statusCode);
        res.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    });

    //end the request
    getReq.end();
    getReq.on('error', function (err) {
        console.log("Error: ", err);
    });


}




//get('apis');
//var policy = '<policies>  <inbound> <base/> </inbound> <outbound > <xml-to-json kind="direct" apply="content-type-xml" consider-accept-header="false"/> <base/> </outbound > </policies >';
//createAPI("apis", "calcapi_id", "TheBestCalculator", "This api calculates", "http://calcapi.cloudapp.net/api");
//attachPolicy("apis", "calcapi_id", policy);
//createOperation("apis", "calcapi_id", "Addition", "AdditionOperation", "adds two number toger", "add?a={a}&b={b}");
//createProduct("products", "thebestproduct_id", "TheBestProduct");
//addApitoProduct("calcapi_id", "thebestproduct_id");




