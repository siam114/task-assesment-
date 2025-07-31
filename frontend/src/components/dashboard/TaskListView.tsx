import React, { useEffect } from 'react'
import PageLayout from '../layout/PageLayout';
import TaskSection from './TaskCard';
import { ChevronDown, Plus } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import TaskCard from './TaskCard';

const TaskListView = () => {
    const { tasks = [], getTasks, loading: taskLoading, deleteTask, error, setSelectedTask, getTaskById, createTask } = useTasks();
    useEffect(() => {
        getTasks();
    }, [getTasks]);

    const handleAdd = async () => {
        await createTask({
            category: 'Art and Craft',
            description: 'Select the role that you want to candidates for and upload your job description. Select the role that you want to candidates for and upload your job description. Select the role that you want to candidates for and upload your job description. Select the role that you want to candidates for and upload your job description.',
            endDate: new Date('2025-08-01'),
            status: 'PENDING'
        });
    };


    return (
        <PageLayout>
            <main className="w-full h-full px-6 pb-20 py-10">
                <div className="bg-white shadow-2xl h-full rounded-4xl p-15 mx-auto">
                    <div className="px-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                            <h2 className="text-2xl font-semibold text-gray-800">All Task List</h2>

                            <div className="flex flex-wrap items-center gap-4">
                                <button className="flex items-center px-4 py-2 border rounded-lg text-gray-600 text-sm bg-white shadow-sm hover:border-gray-400">
                                    Select Task Category <ChevronDown className="w-4 h-4 ml-2" />
                                </button>

                                <button className="flex items-center px-4 py-2 border rounded-lg text-gray-600 text-sm bg-white shadow-sm hover:border-gray-400">
                                    All Task <ChevronDown className="w-4 h-4 ml-2" />
                                </button>

                                <button onClick={handleAdd} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm shadow">
                                    <Plus className="w-4 h-4" />
                                    Add New Task
                                </button>
                            </div>
                        </div>

                        {/* Task Cards Grid */}
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                            {tasks.map(item => {
                                return (
                                    <TaskCard
                                        key={item.id}
                                        setSelectedTask={setSelectedTask}
                                        deleteTask={deleteTask}
                                        {...item}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </PageLayout>
    )
}

export default TaskListView
