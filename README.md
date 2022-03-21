# fin-trx-api

A restful api for delivering fintech services

### The Challenge

Given a requirement to build a system where

-   A user can create an account
-   A user can fund their account
-   A user can transfer funds to another user’s acc
-   A user can withdraw funds from their account.

## API Documentation

The api is built on a nodeJs-express server and mySQL database, using knexJs as it's ORM

### System Architecture

The broad system architecture is mainly in 3 parts, the client, the api, and the db

-   The request comes in through the client side; the first point of contact. This can be a web front end, mobile app or postman client.

-   These requests are received asynchronously by the backend servers and request data is parsed into the api.

-   The backend servers establish a connection with the db servers which allows saving of information with secure source logic.

### db model

The db schema structure involves three basic tables in interelation with each other as shown below;

[Database schema design](db/db-schema.png)

### auth

The api's authentication uses bcryt and crypto-js hashing to replicate the functionality of jwt Tokens and authorization is done via the help of middlewares and utility functions.

> All request sent should pass a Bearer Token via headers as the enpoints are authenticated against this. Otherwise clients would be locked out from accessing the api.

### utilities and middleware

The api makes use of several utilities and middleware that function together with the authentication and endpoint routes that enables verification of data.

### env

The application runs on development environment by default when in a development server and production env when on the net. There are also custom environments set such as test and staging the could be used.

There are certain environmental variables to be set depending on what server is running the process. they are:

```
Dev and test servers:
process.env.DB_USER,
process.env.DB_PASSWORD,
process.env.DB_NAME,
process.env.TEST_DB_NAME,
process.env.secretKey
```

```
Staging and Production:
process.env.secretKey,
process.env.DATABASE_URL
```

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

---

#### Users:

Register: `POST: api/v1/users/register`

> This is the user registeration endpoint, you're instantly able to create an account and a wallet to get you started.

> URL Params: None

> Post Params:

```json
{
    "firstName": string,
    "lastName": string,
    "email": string,
    "password": string
}
```

Login: `POST: api/v1/users/login`

> URL Params: None

> Post Params:

```json
{
    "email": string,
    "password": string
}
```

Logout: `GET: api/v1/users/logout`

> URL Params: None

> Post Params: None

#### Transactions:

Deposit: `POST: api/v1/trx/deposit`

> URL Params: None

> Post Params:

```json
{
    "walletId": int,
    "ammount": float
}
```

Transfer: `POST: api/v1/trx/transfer`

> URL Params: None

> Post Params:

```json
{
    "userWalletId": int,
    "receipientWalletId": int,
    "ammount": float
}
```

Withdrawal: `POST: api/v1/trx/withdrawals`

> URL Params: None

> Post Params:

```json
{
    "walletId": int,
    "ammount": float
}
```

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
