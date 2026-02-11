import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react'; // Import router
import TaskStats from '@/Components/TaskStats';
import TaskItem from '@/Components/TaskItem';

export default function Welcome({ tasks }) { // Receive tasks from props
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [processing, setProcessing] = useState(false);

    const addTask = () => {
        if (newTaskTitle.trim() === '' || processing) return;

        setProcessing(true);
        router.post('/tasks', {
            title: newTaskTitle
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setNewTaskTitle('');
                setProcessing(false);
            },
            onError: () => setProcessing(false),
            onFinish: () => setProcessing(false) // Safety
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    const toggleTask = (id) => {
        const task = tasks.find(t => t.id === id);
        router.patch(route('tasks.update', id), {
            is_completed: !task.is_completed
        }, {
            preserveScroll: true
        });
    };

    const updateTaskTitle = (id, newTitle) => {
        router.patch(route('tasks.update', id), {
            title: newTitle
        }, {
            preserveScroll: true
        });
    };

    const clearCompleted = () => {
        if (confirm('¿Estás seguro de querer borrar todas las tareas completadas?')) {
            router.delete(route('tasks.clear'), {
                preserveScroll: true
            });
        }
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
                            Organiza tu trabajo de manera eficiente (Con persistencia en BD)
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
                                disabled={processing}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border disabled:bg-gray-50"
                            />
                            <button
                                onClick={addTask}
                                disabled={newTaskTitle.trim() === '' || processing}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {processing ? 'Añadiendo...' : 'Añadir'}
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