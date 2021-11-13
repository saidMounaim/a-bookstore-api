# bookstore-api

An API for online store book

## Features:

- Authentication
- Books listing
- Catagories listing
- Order placements

## Technology Stack:

- Node js
- Express Js
- MongoDB
- JWT

## Default urls:

- Login User : <br/>
  localhost:5000/api/v1/auth/login
- Register User : <br/>
  localhost:5000/api/v1/user/register
- Get Logged in User : <br/>
  localhost:5000/api/v1/auth/me/
- Update User Details : <br/>
  localhost:5000/api/v1/auth/updateprofile
- Update Password : <br/>
  localhost:5000/api/v1/auth/updatepassword

- Get All Books : <br/>
  localhost:5000/api/v1/books
- Get Single Books : <br/>
  localhost:5000/api/v1/books/:id
- Create Books : <br/>
  localhost:5000/api/v1/books
- Update Books : <br/>
  localhost:5000/api/v1/books/:id
- Delete Books : <br/>
  localhost:5000/api/v1/books/:id

- Get All Categories : <br/>
  localhost:5000/api/v1/categories
- Create Categories : <br/>
  localhost:5000/api/v1/categories
- Update Categories : <br/>
  localhost:5000/api/v1/categories/:id
- Delete Categories : <br/>
  localhost:5000/api/v1/categories/:id

- Get All Users :<br/>
  localhost:5000/api/v1/users
- Create User :<br/>
  localhost:5000/api/v1/users
- Update User :<br/>
  localhost:5000/api/v1/users/:id
- Delete User :<br/>
  localhost:5000/api/v1/users/:id

- Get All Orders :<br/>
  localhost:5000/api/v1/orders
- Add Order :<br/>
  localhost:5000/api/v1/orders/book/:BookID
- Update Order :<br/>
  localhost:5000/api/v1/orders/:id
- Delete Order :<br/>
  localhost:5000/api/v1/orders/:id

## Usage

"/.env" update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run server

```

- Version: 1.0.0
- License: MIT
- Author: Said Mounaim
