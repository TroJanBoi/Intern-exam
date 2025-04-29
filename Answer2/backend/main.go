package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	_ "github.com/TroJanBoi/Answer2/backend/docs"
)

type Todo struct {
	ID   int    `json:"id" example:"1"`
	Text string `json:"text" example:"Buy milk"`
}

var todos []Todo
var nextID = 1

// @title Todo API
// @version 1.0
// @description This is a simple Todo API written in Go with Gin and Swagger
// @host localhost:3001
// @BasePath /

// @Summary Get all todos
// @Tags todos
// @Produce json
// @Success 200 {array} Todo
// @Router /todos [get]
func getTodos(c *gin.Context) {
	c.JSON(http.StatusOK, todos)
}

// @Summary Create a new todo
// @Tags todos
// @Accept json
// @Produce json
// @Param todo body Todo true "Todo text"
// @Success 200 {object} Todo
// @Router /todos [post]
func createTodo(c *gin.Context) {
	var todo Todo
	if err := c.BindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	todo.ID = nextID
	nextID++
	todos = append(todos, todo)
	c.JSON(http.StatusOK, todo)
}

// @Summary Update a todo
// @Tags todos
// @Accept json
// @Produce json
// @Param id path int true "Todo ID"
// @Param todo body Todo true "Updated todo text"
// @Success 200 {object} Todo
// @Router /todos/{id} [put]
func updateTodo(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var input Todo
	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	for i, t := range todos {
		if t.ID == id {
			todos[i].Text = input.Text
			c.JSON(http.StatusOK, todos[i])
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
}

// @Summary Delete a todo
// @Tags todos
// @Produce json
// @Param id path int true "Todo ID"
// @Success 204
// @Router /todos/{id} [delete]
func deleteTodo(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	for i, t := range todos {
		if t.ID == id {
			todos = append(todos[:i], todos[i+1:]...)
			c.Status(http.StatusNoContent)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
}

func main() {
	router := gin.Default()


	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	router.GET("/todos", getTodos)
	router.POST("/todos", createTodo)
	router.PUT("/todos/:id", updateTodo)
	router.DELETE("/todos/:id", deleteTodo)

	router.Run(":3001")
}
