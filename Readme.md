# ✅ Answer1 - Algorithm Test (Internship Exam)

This folder contains solutions to Part 1 of the internship exam:

## 🐢 1.1 Turtle Walking

**File:** `turtleWalking.c`

### 🔹 Problem
A turtle walks through an N x N matrix in a zig-zag column order:
- From top to bottom on even columns (0-indexed)
- From bottom to top on odd columns

### 🔸 Sample Output
```bash
$ ./turtleWalking
7,8,7,4,6,8,1,5,7,8,4,2,0,8,8,2,7,8,5,8,7,8,6,1,4,0,0,9,9,0,5,7,0,0,3,2
7,8,7,8,4,2,0,8,8
7,8,4,2,0,8
```

## 🧱 1.2 Brick on the Wall

**File:** `brickOnTheWall.c`

### 🔹 Problem
Imagine you are walking along a wall, carrying a bag of bricks.
At each step:
- Look at the current wall height.
- If the wall is higher than your last placed brick, you must add bricks to reach
the new height.
- If the wall is equal or lower, no bricks are needed, and you can continue
walking.
### 🔸 Sample Output
```bash
$ ./brickOnTheWall
6
7
```
### 📦 Compilation Guide
```bash

gcc turtleWalking.c -o turtleWalking
gcc brickOnTheWall.c -o brickOnTheWall

./turtleWalking
./brickOnTheWall
```
or

```bash
cc turtleWalking.c -o turtleWalking
cc brickOnTheWall.c -o brickOnTheWall

./turtleWalking
./brickOnTheWall
```

# 🧩 Answer2 - Fullstack Todo App (Internship Exam)

## 📝 Todo App - Fullstack with Go + Next.js + PostgreSQL

This is a fullstack Todo application that uses:

- 🌐 **Frontend**: Next.js with Tailwind CSS
- 🧠 **Backend**: Go (Gin framework) with PostgreSQL
- 🔗 **API**: RESTful with Swagger Documentation
- 🗃️ **Database**: PostgreSQL (via Docker or local)

---

## 📁 Project Structure

```
Answer2/
├── backend/                # Go Backend (API)
│   ├── handler/            # Route Handlers
│   ├── model/              # GORM Models
│   ├── db/                 # DB connection logic
│   ├── docs/               # Swagger docs (auto-generated)
│   └── main.go             # Entry point
├── frontend/               # Next.js Frontend (App Router)
│   ├── app/                # Pages (App Router)
│   ├── components/         # UI Components
│   ├── services/           # API logic
│   └── types/              # Interface definitions
```

---

## 🚀 How to Run

### Start PostgreSQL with Docker Compose

```bash
cd Answer2
docker-compose up -d 
```

### 🖥️ Backend (Go API)

1. Create `.env` in `Answer2/backend/`:

```env
# .env.example
DATABASE_URL=host=localhost user=youruser password=yourpass dbname=yourdb port=5432 sslmode=disable
```

2. Install & run:

```bash
cd Answer2/backend
go mod tidy
swag init         # If using Swagger
go run main.go
```

Swagger: [http://localhost:3001/swagger/index.html](http://localhost:3001/swagger/index.html)

---

### 💻 Frontend (Next.js)

1. Create `.env.local` in `Answer2/frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

2. Install & run:

```bash
cd Answer2/frontend
npm install
npm run dev
```

App: [http://localhost:3000](http://localhost:3000)

---

## ✅ API Endpoints

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| GET    | `/todos`         | Get all todos          |
| POST   | `/todos`         | Create new todo        |
| PUT    | `/todos/:id`     | Update a todo          |
| DELETE | `/todos/:id`     | Delete a todo          |

---

## 🧼 Code Documentation

All route handlers in Go are documented using Swagger annotations:
```go
// @Summary Get all todos
// @Tags todos
// @Produce json
// @Success 200 {array} model.Todo
// @Router /todos [get]
```

Frontend functions use TypeScript and are organized as:

- `services/api.ts`: handles HTTP logic
- `components/TodoList.tsx`: presentational component
- `app/page.tsx`: calls hooks and renders

---

## 📦 Credits
Developed under UNIT Co., Ltd. for the Internship Exam Assignment 2025.
