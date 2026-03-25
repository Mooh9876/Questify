import { useEffect, useMemo, useState } from 'react';
import { AiSuggestionPanel } from './components/AiSuggestionPanel';
import { Dashboard } from './components/Dashboard';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { LoadingIndicator } from './components/LoadingIndicator';
import { MotivationMessage } from './components/MotivationMessage';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { calculateProgress, calculateTotalXp, suggestXp } from './lib/xp';
import {
  completeTask as completeTaskRequest,
  createTask as createTaskRequest,
  fetchSuggestedXp,
  fetchTaskSuggestions,
  fetchTasks,
  rewriteTask,
} from './services/api';
import type { SuggestionCategory, Task } from './types';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [xp, setXp] = useState(10);
  const [category, setCategory] = useState<SuggestionCategory>('Uni');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [rewriteInput, setRewriteInput] = useState('');
  const [rewrittenTask, setRewrittenTask] = useState('');
  const [motivationMessage, setMotivationMessage] = useState('Bereit für deine nächste Quest?');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [isSuggestingXp, setIsSuggestingXp] = useState(false);

  const totalXp = useMemo(() => calculateTotalXp(tasks), [tasks]);
  const progress = useMemo(() => calculateProgress(totalXp), [totalXp]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const loadedTasks = await fetchTasks();
        setTasks(loadedTasks);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Die Aufgaben konnten nicht geladen werden.');
      } finally {
        setIsLoadingTasks(false);
      }
    };

    void loadTasks();
  }, []);

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
      });

      setTasks((currentTasks) => [newTask, ...currentTasks]);
      setTitle('');
      setDescription('');
      setXp(10);
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
      setMotivationMessage(response.motivationMessage);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Die Aufgabe konnte nicht abgeschlossen werden.');
    }
  };

  const handleLoadSuggestions = async () => {
    resetError();
    setIsLoadingSuggestions(true);

    try {
      const nextSuggestions = await fetchTaskSuggestions(category);
      setSuggestions(nextSuggestions);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Die KI-Vorschläge konnten gerade nicht geladen werden.');
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleRewrite = async () => {
    resetError();
    setIsRewriting(true);

    try {
      const improvedTask = await rewriteTask(rewriteInput);
      setRewrittenTask(improvedTask);
      if (!title.trim()) {
        setTitle(improvedTask);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Die Aufgabe konnte nicht verbessert werden.');
    } finally {
      setIsRewriting(false);
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

  return (
    <div className="app-shell">
      <div className="app-container">
        <Header subtitle="Füge schnell eine Quest hinzu, erledige sie und sieh sofort deinen Fortschritt." />

        <section className="stack-section">
          <Dashboard
            level={progress.level}
            totalXp={progress.totalXp}
            currentLevelXp={progress.currentLevelXp}
            xpToNextLevel={progress.xpToNextLevel}
            progressPercentage={progress.progressPercentage}
          />
        </section>

        <section className="stack-section primary-focus-section">
          <TaskForm
            title={title}
            description={description}
            xp={xp}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onXpChange={setXp}
            onSubmit={handleCreateTask}
            onSuggestXp={handleSuggestXp}
            isSuggestingXp={isSuggestingXp}
          />
        </section>

        <section className="stack-section">
          <MotivationMessage message={motivationMessage} />
          <ErrorMessage message={errorMessage} />
          {isLoadingTasks ? <LoadingIndicator label="Quests werden vom Server geladen…" /> : null}
          <TaskList tasks={tasks} onComplete={handleCompleteTask} />
        </section>

        <section className="stack-section secondary-section">
          {isLoadingSuggestions ? <LoadingIndicator label="KI durchsucht passende Quest-Ideen…" /> : null}
          <AiSuggestionPanel
            category={category}
            suggestions={suggestions}
            rewriteInput={rewriteInput}
            rewrittenTask={rewrittenTask}
            onCategoryChange={setCategory}
            onLoadSuggestions={handleLoadSuggestions}
            onRewriteInputChange={setRewriteInput}
            onRewrite={handleRewrite}
            isLoadingSuggestions={isLoadingSuggestions}
            isRewriting={isRewriting}
          />
        </section>
      </div>
    </div>
  );
};

export default App;