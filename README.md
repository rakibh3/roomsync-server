# Flat Share

## Installation

Step-by-step instructions on how to install the application.

- Clone the repository:

```
git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-rakibh3.git
```

- Navigate to the project directory:

```
cd l2-b2-fullstack-track-assignment-8-rakibh3
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

JWT_ACCESS_SECRET = b1ba4a343e1fdd7a85ef607855e2f3399de669bad

JWT_REFRESH_SECRET = 41b991b21dc0a439cb45fed544992ba3fafa3f912d3c4dedebec3592d7d55

JWT_ACCESS_EXPIRES_IN = 20d

JWT_REFRESH_EXPIRES_IN = 365d
```

## Usage

Instructions on how to use or run the application.

Start the application:

```
npm run start:dev
```
