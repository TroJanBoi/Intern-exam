package model

type Todo struct {
	// ID represents the unique identifier for a Todo item.
	// It is the primary key in the database and is auto-incremented.
	// Example: 1
	ID uint `json:"id" gorm:"primaryKey" autoIncrement" example:1`
	Text string `json:"text" gorm:"not null type:varchar(100)" example:"Learn Go"`
}