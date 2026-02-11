import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import TaskStats from '@/Components/TaskStats';
import TaskItem from '@/Components/TaskItem';

export default function Welcome() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const addTask = () => {
        if (newTaskTitle.trim() === '') return;

        const newTask = {
            id: Date.now(), // Generate a unique ID based on timestamp
            title: newTaskTitle,
            is_completed: false,
        };

        setTasks([...tasks, newTask]);
        setNewTaskTitle('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, is_completed: !task.is_completed } : task
        ));
    };

    const updateTaskTitle = (id, newTitle) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        ));
    };

    const clearCompleted = () => {
        setTasks(tasks.filter(task => !task.is_completed));
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.is_completed).length;

    return (
        <>
            <Head title="Lista de Tareas" />
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                Lista de Tareas Pendientes
                            </h1>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                            Organiza tu trabajo de manera eficiente
                        </p>
                    </div>

                    {/* Stats */}
                    <TaskStats total={totalTasks} completed={completedTasks} />

                    {/* Input Area */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Añadir nueva tarea"
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border"
                            />
                            <button
                                onClick={addTask}
                                disabled={newTaskTitle.trim() === ''}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Añadir
                            </button>
                        </div>
                    </div>

                    {/* Task List */}
                    <div className="space-y-1 mb-8">
                        {tasks.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300 text-gray-500">
                                No hay tareas pendientes. ¡Añade una ahora!
                            </div>
                        ) : (
                            tasks.map(task => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={toggleTask}
                                    onUpdate={updateTaskTitle}
                                />
                            ))
                        )}
                    </div>

                    {/* Clear Button */}
                    {completedTasks > 0 && (
                        <div className="flex justify-end">
                            <button
                                onClick={clearCompleted}
                                className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors focus:outline-none underline"
                            >
                                Limpiar lista (borrar completadas)
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}