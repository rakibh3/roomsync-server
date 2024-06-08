# Giftery

## Installation

Step-by-step instructions on how to install the application.

- Clone the repository:

```
git clone https://github.com/rakibh3/roomsync-server
```

- Navigate to the project directory:

```
cd roomsync-server
```

- Install dependencies:

```
npm install
```

### Set up environment variables

Create a .env file in the root directory and add necessary environment variables like database connection strings, DATABASE_URL and PORT

```
DATABASE_URL = your_database_connection_string
PORT = 5000
BCRYPT_SALT_ROUNDS = 12
JWT_ACCESS_SECRET = your_jwt_access_secret
JWT_REFRESH_SECRET = your_jwt_refresh_secret
JWT_ACCESS_EXPIRES_IN = 1d
JWT_REFRESH_EXPIRES_IN = 365d
```

## Usage

Instructions on how to use or run the application.

Start the application:

```
npm run start:dev
```

## Link Server Deploy Link

```
https://roomsync-c44e35797ee9.herokuapp.com
```
