# 📘 AdminApp

**AdminApp** is a lightweight administrative tool for managing data that is only accessible to the admin user.

> ✅ **Currently, the only fully functional feature is the Notification module**, which allows the admin to:
>
> - View notifications
> - Add new notifications
> - Edit existing notifications
> - Delete notifications

## Architecture/ Approach of the Project

> - Approach used is making an app with every big feature bundled and lazy loaded as a module (for now done only for the notifications ) to easily scale the project without affecting performance.
>
> - shared components between different modules are standalone components to be used anywhere across the project
>  - shared folder is introduced that includes all shared services ,interfaces , components , interceptors and enums
>  - mimic day to day data handelling by using json server for APIs used in CRUD operations

## 📦 Dependencies

### 🖥️ Frontend

- Angular 19
- RxJS
- Angular Material
- ngx-color-picker

### 🗄️ Backend

- json-server

---

## 🛠️ Prerequisites

- Node.js (e.g., v18.x)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

---

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/mayarelgarf/admin-app.git
```
### 2. go to project directory
```bash
cd admin-app
```
### ▶️ Running the Frontend

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start Angular development server
ng serve
```

### ▶️ Running the Backend
```bash
json-server --watch db.json --port 3000
```
