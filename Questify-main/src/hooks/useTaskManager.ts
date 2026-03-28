// Diese Datei verwaltet alle Quests und das Spielerprofil im Frontend.
// Hier passiert alles rund ums Erstellen, Laden und Abschließen von Aufgaben.
// Durch diese Datei muss sich App.tsx nicht mehr selbst um diese Logik kümmern – alles an einem Ort.

import { useEffect, useMemo, useState } from 'react';
import { buildQuestCompletionFeedback } from '../lib/rewards';
import { calculateProgress, calculateTotalXp, suggestXp } from '../lib/xp';
import {
  completeTask as completeTaskRequest,
  createTask as createTaskRequest,
  fetchProfile,
  fetchSuggestedXp,
  fetchTasks,
} from '../services/api';
import type { QuestCompletionFeedback, SuggestionCategory, Task, UserProfile } from '../types';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [xp, setXp] = useState(10);
  const [taskCategory, setTaskCategory] = useState<SuggestionCategory | ''>('');

  // UI state
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isSuggestingXp, setIsSuggestingXp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [motivationMessage, setMotivationMessage] = useState('Bereit für deine nächste Quest?');
  const [completionFeedback, setCompletionFeedback] = useState<QuestCompletionFeedback | null>(null);

  const totalXp = useMemo(() => calculateTotalXp(tasks), [tasks]);
  const progress = useMemo(() => calculateProgress(totalXp), [totalXp]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedTasks, loadedProfile] = await Promise.all([fetchTasks(), fetchProfile()]);
        setTasks(loadedTasks);
        setProfile(loadedProfile);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Die Aufgaben konnten nicht geladen werden.');
      } finally {
        setIsLoadingTasks(false);
      }
    };

    void loadData();
  }, []);

  useEffect(() => {
    if (!completionFeedback) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setCompletionFeedback(null), 4800);
    return () => window.clearTimeout(timeoutId);
  }, [completionFeedback]);

  const resetError = () => setErrorMessage('');

  const handleCreateTask = async () => {
    resetError();

    if (!title.trim()) {
      setErrorMessage('Bitte gib einen Aufgabentitel ein.');
      return;
    }

    const sanitizedXp = Number.isNaN(xp) ? suggestXp(title, description) : Math.min(50, Math.max(5, xp));

    try {
      const newTask = await createTaskRequest({
        title: title.trim(),
        description: description.trim(),
        xp: sanitizedXp,
        category: taskCategory || undefined,
      });

      setTasks((currentTasks) => [newTask, ...currentTasks]);
      setTitle('');
      setDescription('');
      setXp(10);
      setTaskCategory('');
      setMotivationMessage('Neue Quest hinzugefügt. Zeit für frische XP.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Die Quest konnte nicht erstellt werden.');
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    resetError();

    const taskToComplete = tasks.find((task) => task.id === taskId);

    if (!taskToComplete) {
      setErrorMessage('Diese Aufgabe wurde nicht gefunden.');
      return;
    }

    if (taskToComplete.completed) {
      setErrorMessage('Diese Aufgabe wurde bereits abgeschlossen.');
      return;
    }

    try {
      const response = await completeTaskRequest(taskId);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? response.task : task)),
      );
      setProfile(response.profile);
      setCompletionFeedback(buildQuestCompletionFeedback(taskToComplete.title, taskToComplete.xp, response.reward));
      const streakMsg = response.jokerUsed
        ? `Joker eingesetzt! Streak gerettet — ${response.profile.streak} Tage am Stück!`
        : response.motivationMessage;
      setMotivationMessage(streakMsg);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Die Aufgabe konnte nicht abgeschlossen werden.');
    }
  };

  const handleSuggestXp = async () => {
    resetError();
    setIsSuggestingXp(true);

    try {
      const aiSuggestedXp = await fetchSuggestedXp(title || description);
      setXp(aiSuggestedXp);
    } catch {
      setXp(suggestXp(title, description));
      setErrorMessage('Die XP-Empfehlung nutzt gerade den lokalen Fallback.');
    } finally {
      setIsSuggestingXp(false);
    }
  };

  return {
    tasks,
    profile,
    progress,
    title,
    description,
    xp,
    taskCategory,
    isLoadingTasks,
    isSuggestingXp,
    errorMessage,
    motivationMessage,
    completionFeedback,
    setTitle,
    setDescription,
    setXp,
    setTaskCategory,
    setCompletionFeedback,
    handleCreateTask,
    handleCompleteTask,
    handleSuggestXp,
    resetError,
  };
};
