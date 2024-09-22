# 📋 Simple Angular Project

![Angular](https://img.shields.io/badge/Angular-v12-red) ![TypeScript](https://img.shields.io/badge/TypeScript-v4-blue) ![API](https://img.shields.io/badge/API-Integrated-green) ![Authentication](https://img.shields.io/badge/Authentication-JWT-yellow)

This is a **sample Angular project** that demonstrates core functionalities like user authentication, CRUD operations for boards, lists, and cards, reusable components, and API integration. It is a simple yet powerful template to build from.

## 🌟 Features

- 🔐 **User Authentication**:
  - Registration and login using JWT (JSON Web Token).

- 📊 **CRUD Operations**:
  - Boards: Create, read, update, and delete boards.
  - Lists: Add, edit, and remove lists within boards.
  - Cards: Manage cards (tasks) in each list.

- 🧩 **Reusable Components**: Modular and reusable components for UI consistency, including modals and forms.

- 🔗 **API Integration**: Connected to an API for backend CRUD operations.

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine:

### Prerequisites

Make sure you have Node.js and Angular CLI installed.

- [Node.js](https://nodejs.org/) (v12 or higher)
- [Angular CLI](https://angular.io/cli)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hariantorais/task_manager_angular.git

2. **Navigate to the project directory:**
   ```bash
   cd task_manager_angular
   
3. **Install dependencies:**
   ```bash
   npm install
   
4. **Start the server:**
   ```bash
   ng serve
   
5. **Open the app in your browser:**
   Navigate to http://localhost:4200 to see the application running.

## 🛠️ Project Structure

The project structure is as follows:

```bash
src/
├── app/
│   ├── core/               # Core services, guards, and utilities
│   ├── features/           # Main features (auth, boards, lists, cards)
│   ├── shared/             # Reusable components (modals, forms, etc.)
│   └── services/           # Services to interact with API
└── README.md
etc.
```

## 📚 Technologies Used

- Angular v18 (https://angular.dev/). Frontend framework for building web applications.
- TypeScript (https://www.typescriptlang.org/). TypeScript is a superset of JavaScript that compiles to plain JavaScript.
- Laravel 11 (https://laravel.com/). PHP framework for building REST APIs.
- TailwindCSS (https://tailwindcss.com/). Utility-first CSS framework for building responsive web designs.
