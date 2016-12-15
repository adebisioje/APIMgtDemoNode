var util = require('util');
var https = require('https');

// api-version query parameter - https://docs.microsoft.com/en-us/rest/api/apimanagement/apimanagementservices
var apiVersion = '2016-10-10';

// service name and base url - https://aka.ms/smapi#BaseURL
var serviceName = "adojetestapim";
var baseUrl = util.format("%s.management.azure-api.net", serviceName);

var SharedAccessSignature = "uid=582cc3f1e947bb0082030003&ex=2016-12-17T18:56:00.0000000Z&sn=Wg6p4nZlwi/EzqYSwX15PdserSSdZvRULhTaYa1odAuk3WkwZfKg6JJxiSISwDtd+vdgC/OcxQUlSbv7XTBhgA=="

//Get a list of 'Apis', 'Products', Groups etc 
function get(operation) {
    var options = {
        host: baseUrl,
        path: '/' + operation + '?api-version=' + apiVersion,
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

//Creates an API given the operation, id, name, description and serviceUrl
// https://docs.microsoft.com/en-us/rest/api/apimanagement/apis
function createAPI(operation, id, name, desciption,serviceUrl) {
    var options = {
        host: baseUrl,
        path: '/' + operation + '/' + id + '?api-version=' + apiVersion,
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

//getProducts()
get('apis')
//createAPI("apis", "adebisi_2", "Calculator_boos", "adds numbers", "http://calcapi.cloudapp.net/api");


