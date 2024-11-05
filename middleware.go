package main

import (
	"fmt"
	"net/http"
)

func validateToken(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		client_token, err := r.Cookie("auth-token")

		if err != nil {
			fmt.Println(err)
			newAuthError(w, "Invalid Or Expired Token", 401)
			return
		}

		if client_token.Value != session.GetToken() || !session.isValid() {

			newAuthError(w, "Invalid Or Expired Token", 401)
			return
		}

		next(w, r)
	}
}
