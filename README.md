# UniShut - University Shuttle Management System

## Project Description

UniShut is a full-stack University Shuttle Management System designed to provide an efficient, secure, and smart transportation solution for university students, drivers, and administrators.

The system manages university shuttle operations including bus management, route scheduling, trip monitoring, student reservations, QR-based boarding verification, GPS-based live bus tracking, and notification management.

UniShut improves campus transportation by connecting students, drivers, and administrators through a centralized digital platform.

---

# Project Objectives

The main objectives of UniShut are:

- Provide a digital shuttle reservation system for students
- Enable real-time bus location tracking using GPS simulation
- Manage buses, routes, and trips efficiently
- Provide secure role-based access control
- Reduce manual transportation management complexity
- Improve communication between students, drivers, and administrators

---

# User Roles

## 1. Administrator

Administrators manage the complete shuttle system.

Responsibilities:

- Manage users
- Manage buses
- Assign drivers to buses
- Create and manage routes
- Create and manage trips
- Update bus status
- Monitor reservations
- Manage system notifications
- Track live bus locations

---

## 2. Driver

Drivers operate assigned shuttle buses.

Responsibilities:

- View assigned bus information
- View trip details
- Update GPS location
- Send live bus location data
- Monitor trip status
- Receive system notifications

---

## 3. Student

Students use UniShut for shuttle transportation.

Responsibilities:

- Register and login
- View available trips
- View bus and route information
- Reserve seats
- Manage reservations
- Receive boarding QR code
- Track live shuttle location
- Receive notifications

---

# Main Features

## Authentication and Authorization

- Secure JWT-based authentication
- Role-based access control
- Separate permissions for Admin, Driver, and Student
- Protected API endpoints

---

## Bus Management

- Create and manage buses
- Assign drivers
- Update bus status
- Store GPS coordinates
- View bus information

---

## Route Management

- Create shuttle routes
- Manage origins and destinations
- Connect routes with trips

---

## Trip Management

- Create shuttle schedules
- Manage trip status
- View active trips
- Track trip information

Trip statuses include:

- SCHEDULED
- BOARDING
- IN_PROGRESS
- COMPLETED
- CANCELLED

---

## Reservation System

- Student seat reservation
- Automatic seat allocation
- Duplicate reservation prevention
- Reservation cancellation
- Waitlist management
- Reservation status tracking

Reservation statuses:

- CONFIRMED
- WAITLISTED
- BOARDED
- CANCELLED

---

## QR Boarding System

- Generate unique boarding QR values
- Validate QR during boarding
- Driver-controlled boarding confirmation
- Prevent invalid boarding attempts

---

## GPS Live Tracking

- TCP-based GPS communication system
- Real-time bus location updates
- GPS simulator for testing
- Store latitude and longitude information
- Live location retrieval

---

## Notification System

- User-specific notifications
- Bus status notifications
- Read/unread notification management
- Notification deletion

---

# Technology Stack

## Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router
- Fetch API

---

## Backend

- Java 17
- Spring Boot 3
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- REST API
- TCP Socket Programming

---

## Database

- MySQL 8.0

---

## Development Tools

- Visual Studio Code
- IntelliJ IDEA
- Maven
- Git & GitHub
- Postman

---

# Project Structure
UniShut
├── Frontend
│
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   └── services
│
│
└── Backend
    │
    ├── src/main/java/com/unishut
    │
    │   ├── controller
    │   ├── service
    │   ├── repository
    │   ├── model
    │   ├── dto
    │   ├── security
    │   └── threading
    │
    └── pom.xml


---

# Environment Setup

## Requirements

Before running the project, install:

- Node.js (18+ recommended)
- Java JDK 17
- Maven
- MySQL Server 8.0
- Git

---

# Backend Setup

## 1. Navigate to Backend Folder

```bash
cd UniShut-Backend

2. Configure Database
Create MySQL database:
CREATE DATABASE unishut;

Update database configuration:
src/main/resources/application.properties

Example:
spring.datasource.url=jdbc:mysql://localhost:3306/unishut
spring.datasource.username=root
spring.datasource.password=1234

3. Install Dependencies
mvn clean install

4. Run Backend Server
mvn spring-boot:run

Backend will run:
http://localhost:8080

API Base URL:
http://localhost:8080/api

Frontend Setup
1. Navigate to Frontend Folder
cd Frontend

2. Install Dependencies
npm install

3. Configure Backend URL
Update:
src/services/api.js

Example:
const BASE_URL =
"http://localhost:8080/api";

4. Run Frontend
npm run dev

Frontend will run:
http://localhost:5173

GPS Simulator Testing
UniShut includes a GPS simulator for testing live tracking.
Run:
mvn exec:java "-Dexec.mainClass=com.unishut.threading.GpsMovementSimulator"

The simulator sends location data through TCP socket communication.
GPS Server:
Port: 9090

API Communication
Frontend communicates with backend through REST APIs.
Example:
Authentication:
POST /api/auth/login

Trips:
GET /api/trips
GET /api/trips/active

Buses:
GET /api/buses
GET /api/buses/{id}

Reservations:
POST /api/reservations
GET /api/reservations/user/{id}

GPS:
TCP Port: 9090

Security Features
- JWT token authentication
- Password encryption
- Role-based endpoint protection
- Protected user data
- Secure API communication
Future Improvements
Possible future improvements:
- Real GPS device integration
- Mobile application support
- Push notifications
- Online payment integration
- Advanced route optimization
- AI-based transport prediction
Author
Md. Faruk Ahmed
Full Stack Developer
Project: UniShut - University Shuttle Management System