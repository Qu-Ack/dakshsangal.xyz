package main

import (
	"net/http"
)

func handleWriteBlog(w http.ResponseWriter, r *http.Request) {

	w.Write([]byte("authed"))
}
