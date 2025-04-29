import { Todo } from "@/types/todo";

interface TodoListProps {
    todos: Todo[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TodoList({ todos, onEdit, onDelete }: TodoListProps) {
    return (
        <ul className="w-full max-w-md space-y-4">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="flex justify-between items-center bg-white p-4 rounded-md shadow text-black"
                >
                    <span>{todo.text}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(todo.id)}
                            className="text-green-600 hover:underline"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(todo.id)}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
