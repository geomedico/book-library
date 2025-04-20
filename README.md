# **📚 Book Management API + Hyperbee + Swagger**

## **Requirements**
- **Node.js** version **20** or higher.
- **pnpm** package manager installed globally.

---
## **Project Launch:**

- **Rename `.env.example` to `.env` before starting the project:**
  ```bash
  mv .env.example .env
  ```

## **Available Scripts**

In the project directory, you can run the following scripts:

### **`pnpm install`**

Installs all dependencies required for the project.

---

### **`pnpm run dev`**

Starts the Book Management API server in development mode using `tsx`. This enables hot-reloading for the Fastify server.

---

### **`pnpm start`**

Starts the Book Management API server in production mode. This script launches the Hyperbee-powered REST API with all configured routes and plugins.

---

### **`pnpm test:sequential`**

Runs all unit and integration tests using `vitest`. Ensures the correctness of endpoints and data logic across services and database.

---

### **`pnpm run lint`**

Checks the codebase for issues using `eslint`. Helps enforce code quality and formatting consistency.

---

### **`pnpm run lint:fix`**

Automatically fixes linting issues detected by `eslint`.

---

### **`docker-compose up`**

Builds and starts the application in isolated containers using Docker Compose. Use this to run the production setup inside Docker.

---

## **API References**

The project provides HTTP API endpoints for managing books via a modular TypeScript-based Fastify server.

---

### **1. Create a Book**

- **Endpoint**: `POST /books`
- **Description**: Creates a new book with required fields (`title`, `author`, `year`, `status`).
- **Example Request**:

  ```bash
  curl -X POST http://localhost:3000/books \
    -H "Content-Type: application/json" \
    -d '{"title":"Dune","author":"Frank Herbert","year":2000,"status":"AVAILABLE"}'
  ```

---

### **2. List Books**

- **Endpoint**: `GET /books`
- **Description**: Lists all stored books with pagination, filtering, and sorting.
- **Example Request**:

  ```bash
  curl "http://localhost:3000/books?page=1&limit=5&status=AVAILABLE"
  ```

---

### **3. Update Book Status**

- **Endpoint**: `PUT /books/{id}/status`
- **Description**: Updates the reading status of a book.
- **Example Request**:

  ```bash
  curl -X PUT http://localhost:3000/books/abc123/status \
    -H "Content-Type: application/json" \
    -d '{"status": "FINISHED"}'
  ```

---

### **4. Delete a Book**

- **Endpoint**: `DELETE /books/{id}`
- **Description**: Deletes a book from the database.
- **Example Request**:

  ```bash
  curl -X DELETE http://localhost:3000/books/abc123
  ```

---

## **Swagger Documentation**

- **Route**: `GET /docs`
- **Description**: Opens Swagger UI based on a YAML file. Defines all API endpoints, query parameters, and expected schemas.

---

## **Technology Highlights**

- **Fastify** framework with modular route and plugin structure
- **TypeScript** with strict typing for request/response bodies
- **Hyperbee** for in-memory key-value DB storage via `random-access-memory`
- **@sinclair/typebox** for validation schemas
- **Swagger + YAML** integration via `@fastify/swagger` and `@fastify/swagger-ui`
- **Vitest** for testing
- **PnPM** workspace friendly
- **Docker + docker-compose** for containerized development and deployment

---

