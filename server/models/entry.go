package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Entry struct {
	ID     primitive.ObjectID `bson:"id"`
	Car    *string            `json:"car"`
	Prices *float64           `json:"prices"`
	Color  *string            `json:"color"`
	Year   *string            `json:"year"`
	Style  *string            `json:"style"`
}
