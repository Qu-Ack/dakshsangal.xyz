package main

import (
	"html/template"
)

var templates map[string]*template.Template

func loadTemplates() {
	templates = make(map[string]*template.Template)
	templates["index"] = template.Must(template.ParseGlob("./views/index.html"))
	templates["auth"] = template.Must(template.ParseGlob("./views/auth.html"))
	templates["error"] = template.Must(template.ParseGlob("./views/error.html"))
}

func initializeTemplates() {
	loadTemplates()
}
