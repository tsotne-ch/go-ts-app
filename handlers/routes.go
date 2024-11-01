package handlers

import (
	"net/http"
	"webapp/resources/views"

	"github.com/labstack/echo/v4"
)

func SetupRoutes(e *echo.Group) {

	e.GET("/", func(c echo.Context) error {
		localizer := c.Get("localizer").(string)
		return Render(c, http.StatusOK, views.Home("guten", localizer))
	})

}