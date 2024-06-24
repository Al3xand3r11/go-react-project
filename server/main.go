package main

import (
	"os"

	"github.com/Al3xan3r11/go-react-project/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())

	router.POST("/entry/create", routes.AddEntry)
	router.GET("/entries", routes.GetEntries)
	router.GET("/entries/:id/", routes.GetEntriesById)
	router.GET("/color/:color", routes.GetEntriesByColor)

	router.PUT("entry/update/:id", routes.UpdateEntry)
	router.PUT("/color/update/:id", routes.UpdateColor)
	router.DELETE("entry/delete/:id", routes.DeleteEntry)
	router.Run(":" + port)
}
