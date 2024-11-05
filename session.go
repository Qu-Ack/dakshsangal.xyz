package main

import (
	"sync"
	"time"
)

type Session struct {
	token     string
	ttl       time.Duration
	createtAt time.Time
	mutex     sync.RWMutex
}

var session = Session{
	token: "",
}

func (sess Session) isValid() bool {
	sess.mutex.RLock()
	defer sess.mutex.Unlock()

	if sess.token == "" {
		return false
	}

	return time.Since(sess.createtAt) < sess.ttl

}

func (sess Session) GetToken() string {
	sess.mutex.RLock()
	result := sess.token
	sess.mutex.RUnlock()
	return result
}
