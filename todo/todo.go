package todo

import (
	"errors"
	"sync"

	"github.com/rs/xid"
)

var (
	list []Todo
	mtx  sync.RWMutex
	once sync.Once
)

func init() {
	once.Do(initializeList)
}

func initializeList() {
	list = []Todo{}
}

// Todo holds a list of actions in memory
// this is just be a mockup of something that should
// live in a persistant database in production
type Todo struct {
	ID       string `json:"id"`
	Message  string `json:"message"`
	Complete bool   `json:"complete"`
}

// Get returns the current Todo list that is in memory
func Get() []Todo {
	return list
}

// Add creates a new Todo and adds it to the list
func Add(message string) string {
	t := newTodo(message)
	mtx.Lock()
	list = append(list, t)
	mtx.Unlock()
	return t.ID
}

// Delete removes a Todo from the current list
func Delete(id string) error {
	location, err := findTodoLocation(id)
	if err != nil {
		return err
	}
	removeElementByLocation(location)

	return nil
}

// Complete marks a Todo as completed
func Complete(id string) error {
	location, err := findTodoLocation(id)
	if err != nil {
		return err
	}
	setTodoCompleteByLocation(location)

	return nil
}

func newTodo(msg string) Todo {
	return Todo{
		ID:       xid.New().String(),
		Message:  msg,
		Complete: false,
	}
}

func findTodoLocation(id string) (int, error) {
	mtx.RLock()
	defer mtx.RUnlock()
	for i, t := range list {
		if isMatchingID(t.ID, id) {
			return i, nil
		}
	}
	return 0, errors.New("could not find todo based on id")
}

func removeElementByLocation(i int) {
	mtx.Lock()
	list = append(list[:i], list[i+1:]...)
	mtx.Unlock()
}

func setTodoCompleteByLocation(location int) {
	mtx.Lock()
	list[location].Complete = true
	mtx.Unlock()
}

func isMatchingID(a string, b string) bool {
	return a == b
}
