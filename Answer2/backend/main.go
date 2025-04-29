package main

import (
	"backend/db"
	_ "backend/docs"
	"backend/handler"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"log"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Todo API
// @version 1.0
// @description Todo App with PostgreSQL
// @host localhost:3001
// @BasePath /

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    db.Connect()

    r := gin.Default()
	r.Use(cors.Default())

    r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to the Todo API",
		})
	})
    r.GET("/todos", handler.GetTodos)
    r.POST("/todos", handler.CreateTodo)
    r.PUT("/todos/:id", handler.UpdateTodo)
    r.DELETE("/todos/:id", handler.DeleteTodo)
    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
    r.Run(":3001")
}