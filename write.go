package main

import (
	"net/http"
)

func handleWriteBlog(w http.ResponseWriter, r *http.Request) {
	templates["writeblog"].ExecuteTemplate(w, "writeblog", "")

}
