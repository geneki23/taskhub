import React, { useState, useRef, useEffect } from 'react';

export default function TaskItem({ task, onToggle, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    };

    const saveEdit = () => {
        if (editedTitle.trim() === '') {
            setEditedTitle(task.title); // Revert if empty
        } else {
            onUpdate(task.id, editedTitle.trim());
        }
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setEditedTitle(task.title);
        setIsEditing(false);
    };

    return (
        <div className={`group flex items-center p-3 mb-2 bg-white rounded-lg border transition-all duration-200 hover:shadow-md ${task.is_completed ? 'border-gray-200 bg-gray-50' : 'border-gray-200'}`}>
            <div className="flex items-center h-5">
                <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => onToggle(task.id)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 cursor-pointer"
                />
            </div>

            <div className="ml-3 flex-1">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={handleKeyDown}
                        className="w-full px-2 py-1 text-sm text-gray-900 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                ) : (
                    <span
                        onClick={() => setIsEditing(true)}
                        className={`block text-sm cursor-text select-none transition-colors duration-200 ${task.is_completed
                                ? 'text-gray-400 line-through'
                                : 'text-gray-800 hover:text-blue-600'
                            }`}
                    >
                        {task.title}
                    </span>
                )}
            </div>
        </div>
    );
}
