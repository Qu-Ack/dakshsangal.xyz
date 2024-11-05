package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/joho/godotenv"
)

func handleAuth(w http.ResponseWriter, r *http.Request) {
	templates["auth"].ExecuteTemplate(w, "auth", "")
}

type TokenBody struct {
	Token string `json:"token"`
}

func handlePostAuth(w http.ResponseWriter, r *http.Request) {
	err := godotenv.Load()

	if err != nil {
		app_err := newAppError(500, "Internal Server Error")
		w.WriteHeader(500)
		templates["error"].ExecuteTemplate(w, "error", app_err)
	}

	TRUTH := os.Getenv("SECRET")

	secret := r.FormValue("secret")

	if secret != TRUTH {
		app_err := newAppError(401, "Forbidden")
		w.WriteHeader(401)
		templates["error"].ExecuteTemplate(w, "error", app_err)
	}

	token := generateToken()

	var mutex sync.Mutex

	mutex.Lock()
	session.token = token
	session.createtAt = time.Now()
	session.ttl = time.Hour * 24
	mutex.Unlock()

	cookie := &http.Cookie{
		Name:     "auth-token",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteStrictMode,
		MaxAge:   3600 * 24,
	}

	http.SetCookie(w, cookie)

	w.Header().Set("HX-Redirect", fmt.Sprintf("%v/write/blog", APP_URL))
	w.Write([]byte("OK"))

}

func generateToken() string {
	token := ""
	dataset := "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	for i := 0; i < 15; i++ {
		index := rand.Intn(len(dataset))
		token += string(dataset[index])
	}
	return token
}
