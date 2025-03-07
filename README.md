MongoDB
-------
database used to store and manage data

SQL
---
Relatonal/SQL RDBMS
Store data in table with rows and columns
uses fixed schema
otimization for complex join and transactions
support rich set of data types
ACID(Automicity, consistency, isolaton, durability)
uses traditional business app

MongoDB
-------
Document oriented/ NoSQL DB
store data as collection of JSON documents
uses dynamic schema
otimization for scalability and optimization
limited set of data types
CAP(Consistancy, Durability, Partion tolerance)
used in bigdata and real time applications

CRUD operations
---------------
-show databases
-use ProjectfairDB
-show collections
-db.users.find()=>to read all documents from a collection
-db.users.findOne({email:"david@gmail.com"}) =>to get single document from a collection
-db.users.insertOne({"username":"john","email":"john@gmail.com"})  =>to insert single document to a collection
-db.users.insertMany([{"username":"john","email":"john@gmail.com"},{}]) =>to insert multiple documents to a collection=>inside array
-db.users.countDocuments() =>count of documents in a collection
-db.users.find().limit(3) =>to limit count of document read from collection
-db.users.find().sort({username:1}) =>sort ascending order(-1 for descending)
-db.users.find().sort({username:1}).skip(1) =>skip

-db.users.find({age:25})
-db.users.find({age:{$gte:25}})=>greater than or equal to
-db.users.find({age:{$lte:25}})=>less than or equal to
-db.users.find({age:{$gt:25}})=>greater than
-db.users.find({age:{$lt:25}})=>less than
-db.users.find({age:{$ne:25}})=>not equal to
-db.users.find({age:{$e:25}})=>equal to
-db.users.find({age:{$gt:24,$lt:30}})

-db.users.find({username:{$in:['david','john']}})=>check document included
-db.users.find({username:{$nin:['david','john']}})=check document not included

db.users.find({$expr:{$gt:["$debit","$balance"]}})=>to find document with debit value>balance
-$expr:used to compare

-db.users.updateMany({age:25},{$set:{age:23}})
-db.users.updateOne({uname:"sum"},{$inc:{age:4}})
-db.users.updateOne({uname:"sam"},{$push:{hobbies:'reading'}})

-db.users.deleteOne({uname:'sam'})=>to delete document use deleteOne/deleteMany
-db.users.deleteMany({uname:{$exists:true}})

Aggregation:used to join multiple collection to get common result
 syntax: 
 collection_name.aggregate(*syntax)
 {
    $lookup:{
        from:<.collection to join (eg-projects)>,
        localField:<field from the input document (eg-email)>,
        foreignField:<eg-email>,
        as:<output array field (eg-projects)>        
    }
 }

-db.users.aggregate({$lookup:{from:"projects",localField:"email",foreignField:"email",as:"userProjects"}})
 -------------------------------------------------------------------------------------------------------------------
NODE JS - SERVER/BACKEND
------------------------
js run time environment + js library
Features:
 - extremely fast
 - Asynchronous
 - Single threaded with event loop
 - Highly scalable
 - Open source

Node js global objects:
 - It can be accessed anywhere from your node app without exporting/importing
   eg:-console.log(), setTimeOut()

Node module system:
 - a file is considered as module in node, 
   To access data from one file it has export from there, and before using it in another file it should be import there
     To import file: require('module name/path' )
     To export file: module.exports=functionName(export single function)
                     exports.functionName=>while creating a function itself(export multiple function)


Built-in modules in node
 - file system module(fs):handling file related event
 - http: used to create web server
 - https: used to create web server
 - crypto: providing tools like hashing, encryption etc
 - events: works with eventEmitter
 - process: used to provide info about currently running process in node app 
            - environmental variable :used to hold configuration/confidential information of the project. to access ev through out the app use 'process.env.variable_name'

node js packages: used to resolve common problem
 - install packages via npm
 - it adds package.jason, package-lock.json and node_modules in your application

Back-end concepts:
 - client-server architecture
 - REST API 
 - CRUD operation(create:POST, read:GET, update:PUT, delete:DELETE)
 - CORS (Cross Origin Resource Sharing) must be enabled in the server
 -----------------------------------------------------------------------------------------------------
EXPRESS -Node js framework
--------------------------
- Used in client-server architecture as web server
- steps to create server using express
   -create a folder for backend 
   -create package.json file using the command 'npm init -y'
   -update package.json "script" value as "start":"node index.js" instead of test
   -install packages for creating express server
     -npm i express
     -cors: npm i cors
     -dotenv: npm i dotenv 
   -create .env file
   -create .gitignore file
   -create index.js file to define express server
   -import dotenv cos express at index.js
   -create server using express
   -use cors in express server
   -use json parser in express server
   -create port for server app
   -run server


   CREATE ROUTES
--------------

    1) create folder--Routes-->routes.js
    2) import express library
    3) create object of Router class of express-->define path
    4) export router and import it in index.js and use router in pfserver


CREATE CONTROLLER
-----------------

    create folder and file to define logic to solve client request




mongoose
------------
- object data model(DOM) for node js
- data parsing
- can maintain/define structure
- install ------------  npm i mongoose




JSON WEBTOKEN-JWT
--------------------
-library used for authentication in client server request
-used to securely transfer information over the web
-generate token if login success
    -token creation using jwt: use sign(payload,password)
         -payload: this is the data that we want to store in token
         -password: can be any data that has to define in .env file

MIDDLEWARE-node js
-------------------
-used to control request response cycle in server before resolving a request server can perform any task (authorization, data format changing etc) using middleware
-middleware are function with 3 arguments
   -request: will give you client request
   -response: object will give you response from server
   -next: method used to control request

middleware can be of 2 types
  -application specific middleware: active for all client request
  -router specific middleware: active for selected client request

verify token using jsonwebtoken:
  -using verify (token, password)method, if token verify return response, else error

MULTER-middleware for handling multiport/formdata in node js
-------------------------------------------------------------
-install multer using npm i multer
-multer add body and file key to the request object
-multer can used to define storage space for uploaded file

-to handle multipart/formdata request using multer
          -create js file 
          -import multer
          -create a upload folder inside server folder for storing upload files
          -define multer storage object in js file
          
          
CONTEXT API-Data sharing technique in react
---------------------------------------------
-Use context to share data between components
-Avoid props drilling
-providing a centralized way to manage state across components
-share specific info(like state or function) with multiple components without props drilling
 Steps:
-Creating a context: using createContext() hook
-Provide the context: use provider of context, so that it helps to provide data to component
-Consuming the context: to access or use shared data using context API, use useContext() hook
-