"use client"
import AppFallbackSpinner from '@/components/base-components/AppFallbackSpinner';
import PageLayout from '@/components/layout/PageLayout';
import TaskDetails from '@/components/task-details/TaskDetails';
import { useTasks } from '@/hooks/useTasks';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const TaskDetailPage = () => {
    const { selectedTask, getTaskById, loading, setLoading, deleteTask, updateTask, setSelectedTask } = useTasks();

    const params = useParams();
    const id = params?.id as string | undefined;

    useEffect(() => {
        if (id) {
            getTaskById(id)
        }
    }, [id]);


    if (loading) return <AppFallbackSpinner />

    return (
        <PageLayout>
            <main className="w-full h-full px-6 pb-20 py-10">
                <div className="bg-white shadow-2xl h-full rounded-4xl p-15 mx-auto">
                    {!selectedTask ?
                        <div className='flex flex-col w-full gap-y-8 items-center'>
                            <img src={"/icons/no-task.svg"} />
                            <p className='text-2xl font-bold'>Task not found</p>
                        </div>
                        :
                        <TaskDetails deleteTask={deleteTask} task={selectedTask} updateTask={updateTask} setSelectedTask={setSelectedTask} />
                    }
                </div>
            </main>
        </PageLayout>
    )
}

export default TaskDetailPage
