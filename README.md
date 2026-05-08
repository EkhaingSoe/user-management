# CodeingTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository
2. Install dependencies: `npm install`

### Running the Application

#### 1. Start the JSON Server (Mock API)
```bash
npm run json-server
```
This will start the JSON Server on `http://localhost:3000` with the following endpoints:
- `GET/POST/PUT/DELETE /users` - User management
- `GET/POST/PUT/DELETE /companies` - Company management
- `GET/POST/PUT/DELETE /departments` - Department management
- `GET/POST/PUT/DELETE /designations` - Designation management

#### 2. Start the Angular Development Server
```bash
npm start
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## API Endpoints

The application uses a local JSON Server for mock data. All CRUD operations are supported:

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Companies
- `GET /companies` - Get all companies
- `GET /companies/:id` - Get company by ID
- `POST /companies` - Create new company
- `PUT /companies/:id` - Update company
- `DELETE /companies/:id` - Delete company

### Departments
- `GET /departments` - Get all departments
- `GET /departments/:id` - Get department by ID
- `POST /departments` - Create new department
- `PUT /departments/:id` - Update department
- `DELETE /departments/:id` - Delete department

### Designations
- `GET /designations` - Get all designations
- `GET /designations/:id` - Get designation by ID
- `POST /designations` - Create new designation
- `PUT /designations/:id` - Update designation
- `DELETE /designations/:id` - Delete designation

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
