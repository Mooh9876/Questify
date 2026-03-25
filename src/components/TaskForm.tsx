import { FormEvent } from 'react';

type TaskFormProps = {
  title: string;
  description: string;
  xp: number;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onXpChange: (value: number) => void;
  onSubmit: () => void;
  onSuggestXp: () => void;
  isSuggestingXp: boolean;
};

export const TaskForm = ({
  title,
  description,
  xp,
  onTitleChange,
  onDescriptionChange,
  onXpChange,
  onSubmit,
  onSuggestXp,
  isSuggestingXp,
}: TaskFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <section className="panel form-panel focus-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Neue Quest</span>
          <h2>Was willst du heute erledigen?</h2>
          <p className="section-copy">Erstelle eine neue Aufgabe in wenigen Sekunden und sammle direkt XP.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <label>
          Titel
          <input
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="z. B. 30 Minuten lernen"
          />
        </label>

        <label>
          Beschreibung
          <textarea
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Optional: kurze Notiz zur Quest"
            rows={3}
          />
        </label>

        <div className="form-row">
          <label>
            XP
            <input
              type="number"
              min={5}
              max={50}
              step={5}
              value={xp}
              onChange={(event) => onXpChange(Number(event.target.value))}
            />
          </label>

          <button type="button" className="secondary-button" onClick={onSuggestXp} disabled={isSuggestingXp}>
            {isSuggestingXp ? 'XP werden berechnet…' : 'XP vorschlagen'}
          </button>
        </div>

        <button type="submit" className="primary-button">
          Quest erstellen
        </button>
      </form>
    </section>
  );
};