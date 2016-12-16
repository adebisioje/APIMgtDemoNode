# Azure API Management Demo in Node.js

This is demo, using Node.js, demonstrates how to get started with Azure's Api Management's REST API
In this demo, you will be able to create an api, a product, a policy and attach that api to a policy 

#Functions Defined 

## GET - allows you to list apis, groups and products 
    get('apis') -> List all APIs you have created 
## Create API - allows you to create an api
    createAPI("apis", "calcapi_id", "TheBestCalculator", "This api calculates", "http://calcapi.cloudapp.net/api");
## Attach a Policy -> allows you to attached a defined policy 
    attachPolicy("apis", "calcapi_id", policy);
## Create an operation in your api - allows you create an operation that developers can execute in an api 
    createOperation("apis", "calcapi_id", "Addition", "AdditionOperation", "adds two number toger", "add?a={a}&b={b}");
## Create a product - create product to possibly sell to your developers 
    createProduct("products", "thebestproduct_id", "TheBestProduct");
## Add an api to a product - add apis to a product for developers to access 
    addApitoProduct("calcapi_id", "thebestproduct_id");


