import type { Task } from '../types';
import { TaskCard } from './TaskCard';

type TaskListProps = {
  tasks: Task[];
  onComplete: (id: string) => void;
};

export const TaskList = ({ tasks, onComplete }: TaskListProps) => (
  <section className="panel task-list-panel">
    <div className="panel-heading">
      <div>
        <span className="eyebrow">Quests</span>
        <h2>Deine Aufgabenliste</h2>
      </div>
    </div>

    {tasks.length === 0 ? (
      <div className="empty-state">
        <strong>Noch keine Quests vorhanden.</strong>
        <p>Lege deine erste Aufgabe an und sammle direkt die ersten XP.</p>
      </div>
    ) : (
      <>
        <div className="task-section">
          <div className="task-section-header">
            <h3>Offene Aufgaben</h3>
            <span>{tasks.filter((task) => !task.completed).length}</span>
          </div>
          <div className="task-list">
            {tasks.filter((task) => !task.completed).length === 0 ? (
              <div className="empty-substate">Alle offenen Quests sind erledigt.</div>
            ) : (
              tasks
                .filter((task) => !task.completed)
                .map((task) => <TaskCard key={task.id} task={task} onComplete={onComplete} />)
            )}
          </div>
        </div>

        <div className="task-section completed-section">
          <div className="task-section-header">
            <h3>Erledigte Aufgaben</h3>
            <span>{tasks.filter((task) => task.completed).length}</span>
          </div>
          <div className="task-list subdued-list">
            {tasks.filter((task) => task.completed).length === 0 ? (
              <div className="empty-substate">Hier erscheinen abgeschlossene Quests.</div>
            ) : (
              tasks
                .filter((task) => task.completed)
                .map((task) => <TaskCard key={task.id} task={task} onComplete={onComplete} />)
            )}
          </div>
        </div>
      </>
    )}
  </section>
);