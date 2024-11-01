package main

import (
	"net/http"
	"webapp/handlers"
	"webapp/middleware"

	"github.com/labstack/echo/v4"
)

func main() {

	e := echo.New()

	e.Static("/static", "static")
	e.Static("/files", "public")
	e.GET("/", func(c echo.Context) error {
		return c.Redirect(http.StatusFound, "/ka/")
	})
	app := e.Group("/:lang")
	app.Use(middleware.I18nMiddleware)

	handlers.SetupRoutes(app)
	// Start Server
	e.Logger.Fatal(e.Start(":8082"))

}