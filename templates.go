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
	templates["authed"] = template.Must(template.ParseGlob("./views/already_authed.html"))
	templates["writeblog"] = template.Must(template.ParseGlob("./views/write_blog.html"))
}

func initializeTemplates() {
	loadTemplates()
}
