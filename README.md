# DBD381Project
**This is our DBD381 project which we were tasked to create a distributed database for a ecommerce platform. Our chosen DDMS is mongoDB atlas**
**Tech used: Node.js, Express.js, React.js, Mongoose, Docker**

## Getting started

# For Development purposes
### starting backend
Must set up env variables on first pull 
Create a .env file in root of ecommerce-backend
Add the following in it:
    PORT = 5000
    MONGODB_URI = YourMongoConnectionString(Provided once created a cluster on atlas)

    cd ecommerce-backend
    npm install
    npm start

### starting frontend(In a new terminal)
    cd ecommerce-dashboard
    npm install
    npm start


# For Viewing purposes
### starting docker
be in root directory eg: ***C:\Users\User\DBD381Project>*** (Wherever the location u cloned the repo to.)
### build container
    docker compose up
### Remove container
    docker compose down

Project overview

--> Consists of a backend which defines database schemas, API routes that allow CRUD opertation to the database, Testing that performs stress tests to see how our database copes under heavy load

--> Consists of a frontend which make life easier to see how our routes work so u dont have to demonstrate through REST Client, Allows users to sign-up/login, Manage orders/View orders, Manage products, Manage categories for products, Write up reviews, Process transactions

--> Uses Docker for containerization and ease of view

--> MongoDB atlas for our Distributed database

Team members and roles
1. Gabriella Petersen - Research and documentaion
2. Luqmaan Slarmie - Design and implementation + Testing
3. Trent Evans - Design and implementation + Testing
4. Xavier Barnard - Research 
