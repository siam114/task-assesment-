// hooks/useTasks.js
import { useState, useCallback } from 'react';
import { apiCall } from '../lib/fetchService';
import { Task } from '@/types/tasks';
import { toast } from 'react-toastify';

const API_BASE = '/tasks';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getTasks = useCallback(async (query = {}) => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams(query).toString();
            const url = `${API_BASE}?${params}`;
            const data = await apiCall(url, 'GET',);
            setTasks(data?.tasks);
        } catch (err: any) {
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const getTaskById = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiCall(`${API_BASE}/${id}`, 'GET');
            setSelectedTask(data);
            return data;
        } catch (err: any) {
            setError(err?.message);
            // throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createTask = useCallback(async (taskData: any) => {
        try {
            const newTask = await apiCall(API_BASE, 'POST', taskData);
            setTasks(prev => [newTask, ...prev]);
            toast("Task created successfully")
            return newTask;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    }, []);

    const updateTask = useCallback(async (id: string, taskData: any) => {
        try {
            const updated = await apiCall(`${API_BASE}/${id}`, 'PUT', taskData);
            setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
            toast("Task updated successfully")
            return updated;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    }, []);

    const deleteTask = useCallback(async (id: string) => {
        try {
            await apiCall(`${API_BASE}/${id}`, 'DELETE', null);
            setTasks(prev => prev.filter(t => t.id !== id));
            toast("Task deleted successfully")
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    }, []);

    return {
        tasks,
        loading,
        error,
        getTasks,
        createTask,
        updateTask,
        getTaskById,
        deleteTask,
        selectedTask,
        setSelectedTask,
        setLoading,
    };
};
