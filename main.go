package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	initializeTemplates()
	godotenv.Load(".env")

	PORT := os.Getenv("PORT")

	serveMux := http.NewServeMux()

	fileServer := http.FileServer(http.Dir("static"))
	serveMux.Handle("GET /static/", http.StripPrefix("/static/", fileServer))

	serveMux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		w.Write([]byte("OK"))
	})
	serveMux.HandleFunc("GET /", handleGetIndex)
	serveMux.HandleFunc("GET /write/blog", validateToken(handleWriteBlog))
	serveMux.HandleFunc("GET /authenticate", alreadyAuthed(handleAuth))
	serveMux.HandleFunc("POST /authenticate", handlePostAuth)

	server := http.Server{
		Addr:    fmt.Sprintf(":%v", PORT),
		Handler: serveMux,
	}

	fmt.Printf("[SERVER]: listening on %v\n", PORT)
	err := server.ListenAndServe()

	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
}
