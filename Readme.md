# Railway Management System

## Project Description

This Project 'Railway management system' enables users to see train availabilities, book tickets, search trains using source and destination. There is an admin who can add trains.


## Key Features

- User Registration and Authentication
- Admin Train Management
- Real-time Seat Availability Tracking
- Multiple Ticket booking at same time handled using Transactions
- JWT and API Key Protection

## System Requirements

- Node.js (v22.11.0)
- PostgreSQL (15.8)
- npm (Node Package Manager)

## Technology Stack

- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**:JWT
- **Password Encryption**: bcrypt

## Setup Instructions

### 1. Repository Cloning

```bash
git clone <this-repository-url>
cd railway-management-system
```
### 2. Dependency Installation

```bash
npm install
```

### 3. PostgreSQL Installation

#### a. Install PostgreSQL

```bash
brew install postgresql@15
```

#### b. Create Database Role

```bash
psql postgres
CREATE ROLE <your_username> WITH LOGIN PASSWORD 'your_password';
ALTER ROLE <your_username> CREATEDB;
```

#### c. Create Database

```bash
createdb -U <your_username> railway_management
```

### 4. Environment Configuration

Create a .env file in the project root with the following configurations:

```bash
# Database Configuration
DB_NAME=railway_management
DB_USER=<your_username>
DB_PASSWORD=<your_password>
DB_HOST=127.0.0.1
JWT_SECRET=your_secret_key
ADMIN_API_KEY=your_secret_admin_key
PORT=3000
```

### 5. Initalize PostgreSQL ORM
```bash
npm install sequelize-cli
npx sequelize-cli init
```

### 6. Start Application

```bash
npm run dev
```