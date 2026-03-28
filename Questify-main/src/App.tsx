// Das ist die Hauptdatei der App – sie baut die gesamte Seite zusammen.
// Sie kombiniert alle Bausteine (Komponenten) wie Dashboard, Quest-Liste und KI-Bereich.
// Die eigentliche Logik steckt in den Hooks (useTaskManager, useAiAssistant) – hier wird nur angezeigt.

import { AiSuggestionPanel } from './components/AiSuggestionPanel';
import { CategoryProgress } from './components/CategoryProgress';
import { Dashboard } from './components/Dashboard';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { LoadingIndicator } from './components/LoadingIndicator';
import { MotivationMessage } from './components/MotivationMessage';
import { RewardToast } from './components/RewardToast';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useAiAssistant } from './hooks/useAiAssistant';
import { useTaskManager } from './hooks/useTaskManager';

const App = () => {
  const tasks = useTaskManager();
  const ai = useAiAssistant();

  const errorMessage = tasks.errorMessage || ai.errorMessage;

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <Header subtitle="Füge schnell eine Quest hinzu, erledige sie und sieh sofort deinen Fortschritt." />

        <section className="flex flex-col gap-4 mb-4">
          <Dashboard
            level={tasks.progress.level}
            totalXp={tasks.progress.totalXp}
            currentLevelXp={tasks.progress.currentLevelXp}
            xpToNextLevel={tasks.progress.xpToNextLevel}
            progressPercentage={tasks.progress.progressPercentage}
            coins={tasks.profile?.coins ?? 0}
            streak={tasks.profile?.streak ?? 0}
            jokers={tasks.profile?.jokers ?? 0}
          />
          <CategoryProgress tasks={tasks.tasks} />
          <RewardToast feedback={tasks.completionFeedback} onDismiss={() => tasks.setCompletionFeedback(null)} />
        </section>

        <section className="flex flex-col gap-4 mb-4">
          <TaskForm
            title={tasks.title}
            description={tasks.description}
            xp={tasks.xp}
            taskCategory={tasks.taskCategory}
            onTitleChange={tasks.setTitle}
            onDescriptionChange={tasks.setDescription}
            onXpChange={tasks.setXp}
            onTaskCategoryChange={tasks.setTaskCategory}
            onSubmit={tasks.handleCreateTask}
            onSuggestXp={tasks.handleSuggestXp}
            isSuggestingXp={tasks.isSuggestingXp}
          />
        </section>

        <section className="flex flex-col gap-4 mb-4">
          <MotivationMessage message={tasks.motivationMessage} />
          <ErrorMessage message={errorMessage} />
          {tasks.isLoadingTasks ? <LoadingIndicator label="Quests werden vom Server geladen…" /> : null}
          <TaskList tasks={tasks.tasks} onComplete={tasks.handleCompleteTask} />
        </section>

        <section className="flex flex-col gap-4 mb-4">
          {ai.isLoadingSuggestions ? <LoadingIndicator label="KI durchsucht passende Quest-Ideen…" /> : null}
          <AiSuggestionPanel
            category={ai.category}
            suggestions={ai.suggestions}
            rewriteInput={ai.rewriteInput}
            rewrittenTask={ai.rewrittenTask}
            onCategoryChange={ai.setCategory}
            onLoadSuggestions={ai.handleLoadSuggestions}
            onRewriteInputChange={ai.setRewriteInput}
            onRewrite={() => ai.handleRewrite((result) => { if (!tasks.title.trim()) tasks.setTitle(result); })}
            isLoadingSuggestions={ai.isLoadingSuggestions}
            isRewriting={ai.isRewriting}
          />
        </section>
      </div>
    </div>
  );
};

export default App;