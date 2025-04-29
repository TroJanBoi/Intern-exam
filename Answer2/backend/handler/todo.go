package handler

import (
	"backend/db"
	"backend/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetTodos godoc
// @Summary List all todos
// @Description get all todos
// @Tags todos
// @Accept json
// @Produce json
// @Success 200 {array} model.Todo
// @Router /todos [get]
func GetTodos(c *gin.Context) {
    var todos []model.Todo
    db.DB.Find(&todos)
    c.JSON(http.StatusOK, todos)
}

// CreateTodo godoc
// @Summary Create a todo
// @Description create a new todo
// @Tags todos
// @Accept json
// @Produce json
// @Param todo body model.Todo true "Todo to create"
// @Success 201 {object} model.Todo
// @Router /todos [post]
func CreateTodo(c *gin.Context) {
    var todo model.Todo
    if err := c.ShouldBindJSON(&todo); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    db.DB.Create(&todo)
    c.JSON(http.StatusCreated, todo)
}

// UpdateTodo godoc
// @Summary Update a todo
// @Description update an existing todo by ID
// @Tags todos
// @Accept json
// @Produce json
// @Param id path int true "Todo ID"
// @Param todo body model.Todo true "Todo data"
// @Success 200 {object} model.Todo
// @Router /todos/{id} [put]
func UpdateTodo(c *gin.Context) {
    id := c.Param("id")
    var todo model.Todo
    if err := db.DB.First(&todo, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
        return
    }

    if err := c.ShouldBindJSON(&todo); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db.DB.Save(&todo)
    c.JSON(http.StatusOK, todo)
}

// DeleteTodo godoc
// @Summary Delete a todo
// @Description delete a todo by ID
// @Tags todos
// @Accept json
// @Produce json
// @Param id path int true "Todo ID"
// @Success 204
// @Router /todos/{id} [delete]
func DeleteTodo(c *gin.Context) {
    id := c.Param("id")
    if err := db.DB.Delete(&model.Todo{}, id).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete todo"})
        return
    }
    c.Status(http.StatusNoContent)
}

// rootTodo handles the root endpoint
func rootTodo(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
        "message": "Welcome to the Todo API",
    })
}