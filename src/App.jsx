import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import "./styles.css"

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {    
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
        return currentTodos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed }
        }

        return todo
      
      })
    })
  }

  function deleteTodo(id){
      setTodos(currentTodos => {
          return currentTodos.filter(todo => todo.id !== id )
      })
  }
  return <>
    <h2>My Todo App</h2>
    <NewTodoForm onSubmit={addTodo}/>
    <h2 className="header">Todo List ({todos.length})</h2>
    <TodoList todos={ todos } toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
  </>
}