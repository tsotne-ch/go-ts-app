package middleware

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

func I18nMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
    return func(c echo.Context) error {
        path := c.Request().RequestURI
		if path == "/ka" {
            return c.Redirect(http.StatusFound, "/ka/")
        }
        if path == "/en" {
            return c.Redirect(http.StatusFound, "/en/")
        }
        lang := c.Param("lang")
		fmt.Printf("%s %s\n", path, lang)
        if lang != "ka" && lang != "en" {
            return c.Redirect(http.StatusFound, "/ka"+path)
        }
        
        c.Set("localizer", lang)

        return next(c)
    }
}