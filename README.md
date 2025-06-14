<h1 align="center">User Microservice Startup API</h1>

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
</div>

## 📋 Description

This is a RESTful API microservice for user management built with Node.js, Express, TypeScript, and MySQL. It provides endpoints for creating, reading, updating, and deleting user records with features like pagination, sorting, and more.

## 🚀 Features

- CRUD operations for users
- Data validation using Joi
- Rate limiting
- Pagination and sorting
- Soft and hard delete options 
- Error handling
- MySQL database integration
- TypeScript support
- Environment configuration
- API documentation

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Express.js
- MySQL
- Joi (Validation)
- Other key dependencies:
  - helmet (Security)
  - cors
  - compression
  - express-rate-limit

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Oscar-Raygoza/user-microservice.git
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Set up your database:
```sql
-- Run the database.sql script in your MySQL server
source db/database.sql
```

5. Start development server:
```bash
npm run dev
```

## 🚀 API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/users` | Get all users (with pagination) |
| GET | `/v1/users/:id` | Get user by ID |
| POST | `/v1/users` | Create new user |
| PUT | `/v1/users/:id` | Update user |
| DELETE | `/v1/users/:id` | Delete user |

### Query Parameters

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Field to sort by (default: created_at)
- `sortOrder`: Sort direction (ASC/DESC)
- `showDeleted`: Include soft-deleted records (true/false)

## 📝 API Documentation

Access the complete Postman collection documentation here:
[Postman Documentation](https://lively-crescent-634359.postman.co/workspace/Payments~f737f433-2a28-47ee-8d5c-c070507c6827/collection/6194288-58004915-7c09-4627-ba95-284a6db1edd4)

## 🔧 Scripts

- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build for production
- `npm start`: Start production server

## 📄 Environment Variables

```env

# .env.example

  ,-.       _,---._ __  / \
 /  )    .-'       `./ /   \      ~~~  Env Init Startup ~~~
(  (   ,'            `/    /|
 \  `-"             \'\   / |     
  `.              ,  \ \ /  |     
   /`*          ,'-`----Y   |     
  (            ; .envs  |   '     
  |  ,-.    ,-'         |  /
  |  | (   |            | /
  )  |  \  `.___________|/
  `--'   `--'


DATABASE_NAME = "your_database"
HOST_DB = "localhost"
PORT_DB = "3306"
USER_DB = "your_username"
PASSWORD_DB = "your_password"
```

## 👤 Author

**Oscar Eduardo Miramontes Raygoza**
- Email: oscar.eduardo.raygoza@gmail.com
- GitHub: [@Oscar-Raygoza](https://github.com/Oscar-Raygoza)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
