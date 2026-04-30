# TeamTasker

## Setup Instructions

### Environment Variables
Create a `.env` file in the root directory and add the following:
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Install Dependencies
Run the following commands to install dependencies:
```bash
npm install --prefix apps/backend
npm install --prefix apps/frontend
```

### Run the Application
Use the following commands to start the application:
```bash
npm start --prefix apps/backend
npm start --prefix apps/frontend
```