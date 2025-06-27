# 📰 Tech Blog Backend

A RESTful API backend for a modern blogging platform built with **Spring Boot**, **Spring Data JPA**, and **MySQL**. This backend enables users to manage posts, categories, comments, and users efficiently through a clean and scalable API design.

---

## 🚀 Features

- 🧑‍💻 User Registration & Management
- 📝 Create, Read, Update, Delete (CRUD) for Blog Posts
- 🗂️ Categories for organizing posts
- 💬 Comment support on blog posts
- 📦 Layered architecture (Controller → Service → Repository)
- 🔐 Secure and scalable setup (easy to integrate with JWT or OAuth)
- 📄 Configurable via `application.properties`

---

## 🛠️ Tech Stack

- **Java 17+**
- **Spring Boot**
- **Spring Data JPA**
- **MySQL**
- **Lombok**
- **Maven**

---

## 📂 Project Structure

```

techblog-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/blogsite/blogapi/
│   │   │       ├── controllers/
│   │   │       ├── services/
│   │   │       ├── repositories/
│   │   │       ├── models/
│   │   │       └── BlogapiApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── ...
├── .gitignore
├── pom.xml
└── README.md

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ManjeetAulakh/techblog-backend.git
cd techblog-backend
````

### 2. Configure MySQL

In `src/main/resources/application.properties`, set:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_mysql_user
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
```

Create the database in MySQL:

```sql
CREATE DATABASE your_db_name;
```

### 3. Run the Application

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

The server will start at:
**`http://localhost:8080/`**

---

## 📬 API Endpoints (Sample)

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/api/posts`      | Get all blog posts    |
| POST   | `/api/posts`      | Create a new post     |
| GET    | `/api/categories` | Get all categories    |
| POST   | `/api/comments`   | Add comment to a post |
| GET    | `/api/users`      | List all users        |

> *These are sample routes — update with your actual routes and controllers.*

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Manjeet Singh**
🔗 [GitHub](https://github.com/ManjeetAulakh)

````

---

Once you've saved this:
```bash
git add README.md
git commit -m "Add project README"
git push
````

Let me know if you want badges (build passing, license, etc.) or Swagger/OpenAPI setup added too!
