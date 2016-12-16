# Azure API Management Demo in Node.js

This is demo, using Node.js, demonstrates how to get started with Azure's Api Management's REST API
In this demo, you will be able to create an api, a product, a policy and attach that api to a policy 

#Functions Defined 

    get('apis') -> List all APIs you have created 
//var policy = '<policies>  <inbound> <base/> </inbound> <outbound > <xml-to-json kind="direct" apply="content-type-xml" consider-accept-header="false"/> <base/> </outbound > </policies >';
//createAPI("apis", "calcapi_id", "TheBestCalculator", "This api calculates", "http://calcapi.cloudapp.net/api");
//attachPolicy("apis", "calcapi_id", policy);
//createOperation("apis", "calcapi_id", "Addition", "AdditionOperation", "adds two number toger", "add?a={a}&b={b}");
//createProduct("products", "thebestproduct_id", "TheBestProduct");
//addApitoProduct("calcapi_id", "thebestproduct_id");


