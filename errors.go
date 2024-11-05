package main

import (
	"fmt"
	"net/http"
)

type AppError struct {
	StatusCode int
	Error      string
}

func newAppError(code int, message string) AppError {
	return AppError{
		StatusCode: code,
		Error:      message,
	}
}

func newAuthError(w http.ResponseWriter, message string, code int) {
	app_err := newAppError(code, message)
	w.Header().Set("HX-Redirect", fmt.Sprintf("%v/error", APP_URL))
	w.WriteHeader(code)
	templates["error"].ExecuteTemplate(w, "error", app_err)
}
