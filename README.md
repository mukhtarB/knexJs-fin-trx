# fin-trx-api

A restful api for fintech services

### The Challenge

Given a requirement to build a system where

-   A user can create an account
-   A user can fund their account
-   A user can transfer funds to another user’s acc
-   A user can withdraw funds from their account.

## API Documentation

---

The api is built on a nodeJs-express server and mySQL database, using knexJs as it's ORM

### System Architecture

The broad system architecture is mainly in 3 parts, the client, the api, and the db

-   The request comes in through the client side; the first point of contact. This can be a web front end, mobile app or postman client.

-   These requests are received asynchronously by the backend servers and request data is parsed into the api.

-   The backend servers establish a connection with the db servers which allows saving of information with secure source logic.

### db model

The db schema structure involves three basic tables in interelation with each other as shown below;

![alt text](https://github.com/mukhtarB/knex-fin-trx/raw/main/db/db-schema.png "Database Schema design")

### auth

The api's authentication uses bcryt and crypto-js hashing to replicate the functionality of jwt Tokens and authorization is done via the help of middlewares and utility functions.

> All request sent should pass a Bearer Token via headers as the enpoints are authenticated against this. Otherwise clients would be locked out from accessing the api.

### utilities and middleware

The api makes use of several utilities and middleware that function together with the authentication and endpoint routes that enables verification of data.

### endpoints

The typical response structure for the routes are in json format of the form:

```
On success:
statusCode: 200, 401, 404 etc
payload => a success message & data
```

```
On error:
statusCode: 500
payload => an error message || error
```

`POST: api/v1/users/register`

> This is the user registeration endpoint, you're instantly able to create an account and a wallet to get you started.

URL Params: None

Post Params:

```json
{
	"firstName": [string],
	"lastName": [string],
	"email": [string],
	"password": [string]
}
```

---

---

To install api dependencies run:

`npm install`

To run migrations:
`knex migrate:latest --env (specify the name of environment)`

To start up aerver:
`npm start` or `npm run dev` for usage with nodemon.

**Tech Stack:**

-   NodeJS (LTS version)
-   KnexJS ORM
-   MySQL database

---

#### Author : Mukhtar B. Abdulrazaq
