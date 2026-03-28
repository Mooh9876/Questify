import type { LootReward, SuggestionCategory, Task, UserProfile } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api').replace(/\/$/, '');

type ApiTask = {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  created_at: string;
};

type ApiReward = {
  type: 'coins';
  title: string;
  description: string;
  coins: number;
};

type ApiProfile = {
  id: string;
  coins: number;
};

const mapTask = (task: ApiTask): Task => ({
  id: task.id,
  title: task.title,
  description: task.description,
  xp: task.xp,
  completed: task.completed,
  createdAt: task.created_at,
});

const mapReward = (reward: ApiReward): LootReward => ({
  type: reward.type,
  title: reward.title,
  description: reward.description,
  coins: reward.coins,
});

const mapProfile = (profile: ApiProfile): UserProfile => ({
  id: profile.id,
  coins: profile.coins,
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
  const response = await request<{ tasks: ApiTask[] }>('/tasks');
  return response.tasks.map(mapTask);
};

export const fetchProfile = async (): Promise<UserProfile> => {
  const response = await request<{ profile: ApiProfile }>('/tasks/profile');
  return mapProfile(response.profile);
};

export const createTask = async (payload: { title: string; description: string; xp: number }): Promise<Task> => {
  const response = await request<ApiTask>('/tasks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return mapTask(response);
};

export const completeTask = async (
  taskId: string,
): Promise<{ task: Task; motivationMessage: string; reward: LootReward; profile: UserProfile }> => {
  const response = await request<{ task: ApiTask; motivation_message: string; reward: ApiReward; profile: ApiProfile }>(`/tasks/${taskId}/complete`, {
    method: 'PATCH',
  });
  return {
    task: mapTask(response.task),
    motivationMessage: response.motivation_message,
    reward: mapReward(response.reward),
    profile: mapProfile(response.profile),
  };
};

export const fetchTaskSuggestions = async (category: SuggestionCategory): Promise<string[]> => {
  const response = await request<{ suggestions: string[] }>('/ai/suggest-tasks', {
    method: 'POST',
    body: JSON.stringify({ category }),
  });
  return response.suggestions;
};

export const rewriteTask = async (input: string): Promise<string> => {
  const response = await request<{ rewritten: string }>('/ai/rewrite-task', {
    method: 'POST',
    body: JSON.stringify({ input }),
  });
  return response.rewritten;
};

export const fetchSuggestedXp = async (title: string): Promise<number> => {
  const response = await request<{ xp: number }>('/ai/suggest-xp', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
  return response.xp;
};
