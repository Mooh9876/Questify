// Diese Datei verwaltet alles, was mit der KI-Unterstützung zu tun hat.
// Sie kümmert sich um das Laden von Quest-Vorschlägen und das Umschreiben von Aufgabentiteln.
// So bleibt die KI-Logik an einem Ort und ist leicht zu finden und zu ändern.

import { useState } from 'react';
import { fetchTaskSuggestions, rewriteTask } from '../services/api';
import type { SuggestionCategory } from '../types';

export const useAiAssistant = () => {
  const [category, setCategory] = useState<SuggestionCategory>('Uni');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [rewriteInput, setRewriteInput] = useState('');
  const [rewrittenTask, setRewrittenTask] = useState('');
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const resetError = () => setErrorMessage('');

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

  const handleRewrite = async (onResult?: (result: string) => void) => {
    resetError();
    setIsRewriting(true);

    try {
      const improvedTask = await rewriteTask(rewriteInput);
      setRewrittenTask(improvedTask);
      onResult?.(improvedTask);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Die Aufgabe konnte nicht verbessert werden.');
    } finally {
      setIsRewriting(false);
    }
  };

  return {
    category,
    suggestions,
    rewriteInput,
    rewrittenTask,
    isLoadingSuggestions,
    isRewriting,
    errorMessage,
    setCategory,
    setRewriteInput,
    handleLoadSuggestions,
    handleRewrite,
  };
};
