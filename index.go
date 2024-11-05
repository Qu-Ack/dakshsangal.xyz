package main

import (
	"net/http"
)

func handleGetIndex(w http.ResponseWriter, r *http.Request) {
	templates["index"].ExecuteTemplate(w, "index", "")
}
