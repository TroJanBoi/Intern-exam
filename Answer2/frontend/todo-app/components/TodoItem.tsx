import React, { useState } from "react";

interface TodoItemProps {
    todo: any;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedTodo: any) => void;
}

function TodoItems({todo, onDelete, onUpdate}: TodoItemProps) {

    return (
        <div>
        </div>
    );
}

export default TodoItems;