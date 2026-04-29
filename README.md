

🛠️ IT Helpdesk Ticketing System

A full-stack IT Helpdesk Management System built using Spring Boot + React that enables employees to raise tickets, support agents to resolve issues, and managers/admins to oversee operations.

🚀 Features
👤 Authentication & Roles
JWT-based authentication
Role-based access control:
ADMIN
EMPLOYEE
IT_SUPPORT_AGENT
IT_MANAGER

🎫 Ticket Management
Employees can:
Raise tickets
View status
Reopen/close tickets
Agents can:
View assigned tickets
Update status (IN_PROGRESS, RESOLVED)
Managers can:
View escalated tickets
Reassign tickets
Admin can:
Assign tickets to agents

💻 Asset Management
Admin can:
Add assets
View all assets
Manager/Admin can:
View available assets
Asset allocation to employees
Return & track asset usage

📊 Reports & Analytics
Total users
Open / Resolved / Escalated tickets
Asset availability
Agent workload (UI-ready)
🧑‍💼 User Management
Admin can:
Create users
Manage roles
Filter by department / role

🧱 Tech Stack
Backend
Java 17
Spring Boot
Spring Security (JWT)
Spring Data JPA (Hibernate)
MySQL
Frontend
React.js
Tailwind CSS
Axios

📁 Project Structure
backend/
 ├── controller/
 ├── service/
 ├── repository/
 ├── entity/
 ├── security/
 └── enums/

frontend/
 ├── pages/
 ├── layout/
 ├── components/
 ├── api/
 └── App.jsx
⚙️ Setup Instructions
🔧 Backend
Clone repository
Configure MySQL in application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/helpdesk
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

Run Spring Boot app

💻 Frontend
npm install
npm run dev
🔐 Default Roles

Make sure roles in DB are:

ADMIN
EMPLOYEE
IT_SUPPORT_AGENT
IT_MANAGER
🔄 API Endpoints (Sample)
Auth
POST /api/auth/login
POST /api/auth/register
Tickets
GET    /api/tickets
PUT    /api/tickets/{id}/assign/{agentId}
PUT    /api/tickets/{id}/status
PUT    /api/tickets/{id}/resolve
PUT    /api/tickets/{id}/escalate
Users
GET /api/users
POST /api/users
Assets
GET  /api/assets
POST /api/assets
GET  /api/assets/available
Allocations
GET  /api/allocations
POST /api/allocations/allocate
PUT  /api/allocations/return/{id}
🔁 Workflow
Employee → Raise Ticket
Admin → Assign to Agent
Agent → Resolve OR Escalate
Manager → Reassign / Resolve
Employee → Close Ticket
🧪 Testing Checklist
 Login & Register
 Role-based routing
 Ticket lifecycle
 Asset creation & allocation
 Agent workflow
 Manager escalation flow

👩‍💻 Author

Kalyani

