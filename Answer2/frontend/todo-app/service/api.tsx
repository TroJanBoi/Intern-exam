const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
console.log('API URL:', API);

export interface Todo {
    id: number;
    text: string;
}

export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(`${API}/todos`);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
}

export const addTodo = async (text: string): Promise<Todo> => {
    const response = await fetch(`${API}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
    if (!response.ok) {
        throw new Error('Failed to add todo');
    }
    return response.json();
}

export const updateTodo = async (id: number, text: string): Promise<Todo> => {
    const response = await fetch(`${API}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
    return response.json();
}

export const deleteTodo = async (id: number): Promise<void> => {
    const response = await fetch(`${API}/todos/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
}
