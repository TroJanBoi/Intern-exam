"use client"; // enable client-side interactivity
import { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "@/service/api";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types/todo";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    getTodos().then(setTodos).catch(console.error);
  }, []);

  const handleAddTodo = async () => {
    if (input.trim() === "") return;

    try {
      if (editId !== null) {
        await updateTodo(editId, input);
        setEditId(null);
      } else {
        await addTodo(input);
      }
      setInput("");
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error adding/updating todo:", error);
    }
  }

  const handleEditTodo = (id: number) => {
    setInput(todos.find(todo => todo.id === id)?.text || "");
    setEditId(id);
  }

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
  }
  
  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-black">Todo App</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter a todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 border text-black rounded-md placeholder-gray-500 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>
        <TodoList todos={todos} onDelete={handleDeleteTodo} onEdit={handleEditTodo}/>
    </div>
  );
}
