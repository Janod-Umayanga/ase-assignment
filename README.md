# ase-assignment
# User Management System
## Description
A User Management System built with React for the frontend and Node.js for the backend. This application allows for user registration, login, and management (viewing, updating, and deleting user profiles). It uses MySQL as the database to store user information.

## Technologies Used
- Frontend: React, Axios, Redux
- Backend: Node.js, Express
- Database: MySQL

## Features
- User registration and login
- User profile management
- Error handling and authorization

# Installation

## Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm (version 6 or higher)

## Setup
- Clone the Repository

```bash
git clone https://github.com/Janod-Umayanga/ase-assignment.git
cd ase-assignment
```
## Install Dependencies

- Frontend

```bash
cd react-app
npm install
```

- Backend

```bash
cd backend-api
npm install
```
## Set Up Environment Variables

Create a .env file in the backend-api directory with the following content:

```bash
JWT_SECRET=your_jwt_secret
PORT=8080
```
## Run Database Migrations

Ensure MySQL is running and create the necessary database schema. Create the database and the users table.

```bash
CREATE DATABASE ase_assignment;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

## Start the Application

- Backend

```bash
cd backend-api
npm start
```

- Frontend

```bash
cd react-app
npm start
```
# API Endpoints

- POST /api/register: Register a new user
- POST /api/login: Authenticate a user
- GET /api/users: Retrieve all users (authorized)
- PUT /api/users/:id: Update user details (authorized)
- DELETE /api/users/:id: Delete a user (authorized)