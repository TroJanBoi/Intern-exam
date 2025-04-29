"use client"; // enable client-side interactivity

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (input.trim() === "") return;
    if (editId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), text: input },
      ]);
    }
    setInput("");
  };

  const handleEditTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setInput(todo.text);
      setEditId(id);
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

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

      <ul className="w-full max-w-md space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white p-4 rounded-md shadow text-black"
          >
            <span>{todo.text}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditTodo(todo.id)}
                className="text-green-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
