import { useEffect, useState } from "react";
import { NavBar } from "./Components/NavBar"
import { TodoForm } from "./Components/ToDoForm";
import TodoList from "./Components/TodoList";
import { ITodo } from "./Models";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || "[]") as ITodo[]
    setTodos(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addHandler = (title: string) => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false
    }
    setTodos(prev => [newTodo, ...prev])
  }
  const toggleHandler = (id: number) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }
  const removeHandler = (id: number) => {
    const shoudRemove = window.confirm(`Delete task?`)
    if (shoudRemove) {
      setTodos(prev => prev.filter(todo => todo.id !== id))
    }
  }
  return (
    <>
      <NavBar
        onTodos={setTodos}
        todos={todos}
      />
      <main>
        <TodoForm onAdd={addHandler} />
        <section className="Todo-content">
          <TodoList
            todos={todos}
            onToggle={toggleHandler}
            onRemove={removeHandler}
          />
        </section>
      </main>
    </>
  )
}

export default App;