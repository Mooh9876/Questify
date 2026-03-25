import type { SuggestionCategory, Task } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

type ApiTask = {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  created_at: string;
};

const mapTask = (task: ApiTask): Task => ({
  id: task.id,
  title: task.title,
  description: task.description,
  xp: task.xp,
  completed: task.completed,
  createdAt: task.created_at,
});

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { detail?: string } | null;
    throw new Error(payload?.detail ?? 'Der Server konnte die Anfrage nicht verarbeiten.');
  }

  return (await response.json()) as T;
};

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await request<{ tasks: ApiTask[] }>('/api/tasks');
  return response.tasks.map(mapTask);
};

export const createTask = async (payload: { title: string; description: string; xp: number }): Promise<Task> => {
  const response = await request<ApiTask>('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return mapTask(response);
};

export const completeTask = async (taskId: string): Promise<{ task: Task; motivationMessage: string }> => {
  const response = await request<{ task: ApiTask; motivation_message: string }>(`/api/tasks/${taskId}/complete`, {
    method: 'PATCH',
  });
  return {
    task: mapTask(response.task),
    motivationMessage: response.motivation_message,
  };
};

export const fetchTaskSuggestions = async (category: SuggestionCategory): Promise<string[]> => {
  const response = await request<{ suggestions: string[] }>('/api/ai/suggest-tasks', {
    method: 'POST',
    body: JSON.stringify({ category }),
  });
  return response.suggestions;
};

export const rewriteTask = async (input: string): Promise<string> => {
  const response = await request<{ rewritten: string }>('/api/ai/rewrite-task', {
    method: 'POST',
    body: JSON.stringify({ input }),
  });
  return response.rewritten;
};

export const fetchSuggestedXp = async (title: string): Promise<number> => {
  const response = await request<{ xp: number }>('/api/ai/suggest-xp', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
  return response.xp;
};
