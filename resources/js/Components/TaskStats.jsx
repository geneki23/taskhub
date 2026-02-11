import React from 'react';

export default function TaskStats({ total, completed }) {
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Tareas</span>
                <span className="text-3xl font-bold text-gray-800 mt-1">{total}</span>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Completadas</span>
                <span className="text-3xl font-bold text-green-600 mt-1">{completed}</span>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Progreso</span>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl font-bold text-blue-600">{percentage}%</span>
                </div>
            </div>
        </div>
    );
}
