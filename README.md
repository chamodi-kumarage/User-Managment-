# 🚀 User Management System  
A secure and scalable full-stack User Management System built using **React JS**, **Spring Boot**, and **MySQL**.  
This system supports **role-based login**, **protected routes**, **persistent sessions**, and **OTP-based password reset**.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- User **Login & Signup**
- **Role-based access control** (Admin / User / Custom Roles)
- JWT-based authentication with **auto session handling**

### 👥 User Sessions
- Token-based persistent login  
- Users stay logged in without re-entering credentials  
- Auto logout when token expires

### 📌 User Dashboards
- Each user role gets **its own dashboard**
- Role-specific pages & features

### 🔄 Password Reset Flow
- Forgot password with **email OTP** verification  
- Secure password reset workflow

### 💾 Backend & Database
- Spring Boot REST API  
- MySQL relational database  
- JPA/Hibernate for ORM  
- Layered architecture (Controller → Service → Repository)

### 🖥 Frontend
- React JS with protected routes  
- Clean UI/UX with component-based structure  

---

## 🛠 Tech Stack
### Frontend  
- React JS  

### Backend  
- Spring Boot  
- Spring Security  
- JWT  
- MySQL  

---

## ⚙️ Installation & Run Guide

### 🔹 Backend Setup
```bash
cd backend
mvn clean package -U
java -jar target/backend-0.0.1-SNAPSHOT.jar

### 🔹 Frontend setup and start
npm install
npm start

